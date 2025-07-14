// VERSÃO 1.0 FINALIZADA

let chatHistory = []; 

// --- LÓGICA DE PRÉVIA DA IMAGEM ---
const imageInput = document.getElementById('image-input');
const previewContainer = document.getElementById('image-preview-container');
const promptInput = document.getElementById('prompt-input');

// Ouve por mudanças no campo de arquivo
imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Mostra a prévia da imagem
            previewContainer.innerHTML = `
                <img src="${e.target.result}" alt="Prévia da imagem">
                <button id="remove-image-btn">X</button>
            `;
            // Adiciona o evento de clique para o botão de remover a imagem
            document.getElementById('remove-image-btn').addEventListener('click', () => {
                imageInput.value = '';
                previewContainer.innerHTML = '';
            });
        }
        reader.readAsDataURL(file);
    }
});

// --- LÓGICA DE ENVIO DO FORMULÁRIO ---
document.getElementById('chat-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = e.target;
    const userPrompt = promptInput.value;
    const chatBox = document.getElementById('chat-box');
    
    // Pega a prévia da imagem, se existir
    const previewImg = previewContainer.querySelector('img');
    const imagePreviewHtml = previewImg ? previewImg.outerHTML : '';
    
    // Mostra o balão do usuário com a imagem e o texto
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    userMessage.innerHTML = `${imagePreviewHtml}${userPrompt}`;
    chatBox.appendChild(userMessage);

    const formData = new FormData(form);
    formData.append('history', JSON.stringify(chatHistory));

    // Limpa os campos e a prévia após o envio
    form.reset();
    previewContainer.innerHTML = '';
    promptInput.style.height = 'auto';

    const thinkingMessage = document.createElement('div');
    thinkingMessage.classList.add('message', 'bot-message');
    thinkingMessage.innerText = 'StrixBot está analisando...';
    chatBox.appendChild(thinkingMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        chatBox.removeChild(thinkingMessage);
        
        const botMessage = document.createElement('div');
        botMessage.classList.add('message', 'bot-message');

        if (data.error) {
            botMessage.innerText = `Erro: ${data.error}`;
        } else {
            const botResponse = data.response;
            botMessage.innerHTML = marked.parse(botResponse);
            chatHistory.push({"role": "user", "parts": [userPrompt]});
            chatHistory.push({"role": "model", "parts": [botResponse]});
        }
        chatBox.appendChild(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error('Erro:', error);
        chatBox.removeChild(thinkingMessage);
    }
});

// --- CÓDIGOS AUXILIARES ---
const promptTextarea = document.getElementById('prompt-input');
promptTextarea.addEventListener('input', () => {
    promptTextarea.style.height = 'auto';
    promptTextarea.style.height = (promptTextarea.scrollHeight) + 'px';
});

const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
}
themeSwitcher.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    if (body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light-theme');
    } else {
        localStorage.removeItem('theme');
    }
});