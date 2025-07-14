# StrixBot Lite v1.0

**Status:** Versão estável submetida como projeto final da disciplina de Inteligência Artificial.
**Demonstração ao Vivo:** **[https://strixbot.onrender.com](https://strixbot.onrender.com)**

---

## Visão Geral

O StrixBot Lite é a primeira implementação completa do assistente de IA StrixBot. Esta aplicação web funcional foi construída utilizando Python com Flask para o backend e tecnologias web padrão (HTML, CSS, JavaScript) para o frontend. O "cérebro" do chatbot é alimentado pelo modelo `gemini-1.5-flash-latest` da API do Google, permitindo uma análise multimodal sofisticada.

## Funcionalidades Implementadas

* **Backend Robusto:** Servidor web construído com Flask e Gunicorn, pronto para produção.
* **API Multimodal:** Integração com a API do Google Gemini, permitindo o processamento de prompts com texto e imagens (gráficos, tabelas, etc.).
* **Personalidade Definida:** Uma instrução de sistema (`system_instruction`) garante que o bot mantenha sua persona de especialista em dados, melhorando a previsibilidade e utilidade.
* **Interface de Usuário Completa:**
    * Layout de chat moderno e responsivo.
    * Prévia da imagem antes do envio, com opção de remoção.
    * Campo de texto que se ajusta dinamicamente ao conteúdo.
    * Botão para alternar entre tema claro e escuro, com a preferência salva no navegador.
* **Histórico de Sessão:** O chatbot mantém o contexto da conversa textual durante a sessão do usuário.
* **Deploy na Nuvem:** A aplicação foi configurada para integração contínua e deploy na plataforma Render.

## Tecnologias Utilizadas

* **Backend:** Python 3, Flask, Gunicorn
* **IA:** Google Generative AI API (Gemini 1.5 Flash)
* **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
* **Hospedagem:** Render

## Como Executar o Projeto Localmente

Para rodar o StrixBot Lite na sua máquina local, siga estes passos:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/PietroDev-01/StrixBot.git](https://github.com/PietroDev-01/StrixBot.git)
    ```
2.  **Navegue até a pasta do projeto:**
    ```bash
    cd StrixBot/"StrixBot Lite"
    ```
3.  **Crie e ative um ambiente virtual:**
    ```bash
    python -m venv venv
    .\venv\Scripts\activate
    ```
4.  **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```
5.  **Configure a chave da API:**
    * Crie uma variável de ambiente chamada `GEMINI_API_KEY` com a sua chave da API do Google.
    * Exemplo no PowerShell: `$env:GEMINI_API_KEY="SUA_CHAVE_AQUI"`
6.  **Execute a aplicação:**
    ```bash
    python app.py
    ```
7.  Abra seu navegador e acesse `http://127.0.0.1:5000`.