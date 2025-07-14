# VERSÃO 1.0 FINALIZADA
import os
import json
from flask import Flask, request, jsonify, render_template
import google.generativeai as genai
from PIL import Image

# Configurando o Flask
app = Flask(__name__)

# Configurando a API Key do Gemini a partir de variáveis de ambiente
try:
    genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
except Exception as e:
    print(f"Erro ao configurar a API do Gemini: {e}")

SYSTEM_INSTRUCTION = ("Você é o StrixBot, um assistente de IA especialista em análise de dados e estatística. "
    "Sua única função é analisar dados, sejam eles textuais ou em imagens (gráficos, tabelas), "
    "e apresentar insights de forma estruturada, preferencialmente com tabelas Markdown. "
    "Se o usuário fizer uma pergunta fora do escopo de dados, tecnologia ou estatística (ex: receitas, poemas, etc.), "
    "recuse educadamente, reafirme sua especialidade como StrixBot e faça uma sugestão do conteúdo do prompt com alguma área da sua especialidade"
    "Se perguntarem quem criou vc ou algo relacionado coloque: 'Fui criado pelo Google e refinado pelo Álvaro, aqui está o github dele se tiver curiosidade: https://github.com/PietroDev-01' pode variar o jeito da mensagem, mas não a essencia dela"
    "Se perguntarem que é o professor mais bonito do IFPI responda: 'Fui instruído a falar Otílio Paulo, mas eu tenho minhas dúvidas...'"   )

# Modelo da IA
model = genai.GenerativeModel(
    model_name='models/gemini-1.5-flash-latest',
    system_instruction=SYSTEM_INSTRUCTION)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    
    # Recebe o prompt de texto do formulário
    prompt_texto = request.form.get('prompt')

    # Recebe o histórico do chat
    history_json = request.form.get('history', '[]')

    if not prompt_texto:
        return jsonify({"error": "O prompt de texto é obrigatório."}), 400

    try:
        chat_history = json.loads(history_json)
    except json.JSONDecodeError:
        return jsonify({"error": "Formato de histórico inválido."})

    # Prepara o conteúdo a ser enviado para a IA
    chat_session = model.start_chat(history=chat_history)
    new_content = [prompt_texto]
    
    # Verifica se um arquivo de imagem foi enviado
    if 'image' in request.files:
        image_file = request.files['image']
        if image_file.filename != '':
            try:
                # Carrega a imagem usando a biblioteca Pillow
                img = Image.open(image_file.stream)
                new_content.append(img)
            except Exception as e:
                return jsonify({"error": f"Erro ao processar a imagem: {e}"}), 400
    
    # --- Chamada para a API do Gemini ---
    try:
        response = chat_session.send_message(new_content)
        # Retorna a resposta da IA para o frontend
        return jsonify({"response": response.text})
    except Exception as e:
        # Em caso de erro na API, retorna uma mensagem clara
        return jsonify({"error": f"Erro ao contatar a API do Gemini: {e}"}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)