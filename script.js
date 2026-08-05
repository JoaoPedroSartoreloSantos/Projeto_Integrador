// --- FUNCIONALIDADE 1: Aumentar e Diminuir Fonte (Zoom de Leitura) ---
let fontSizePercent = 100;
const body = document.body;

document.getElementById('btn-increase').addEventListener('click', () => {
    if (fontSizePercent < 150) { // Limite máximo de 150%
        fontSizePercent += 10;
        body.style.fontSize = fontSizePercent + '%';
    }
});

document.getElementById('btn-decrease').addEventListener('click', () => {
    if (fontSizePercent > 80) { // Limite mínimo de 80%
        fontSizePercent -= 10;
        body.style.fontSize = fontSizePercent + '%';
    }
});

// --- FUNCIONALIDADE 2: Leitor de Voz para o Conteúdo do Site ---
let reading = false;
const btnSpeak = document.getElementById('btn-speak');

btnSpeak.addEventListener('click', () => {
    if ('speechSynthesis' in window) {
        if (reading) {
            window.speechSynthesis.cancel();
            reading = false;
            btnSpeak.innerText = '🔊 Ouvir Página';
        } else {
            // Pega todo o texto principal da página
            const textToRead = document.querySelector('main').innerText;
            const utterance = new SpeechSynthesisUtterance(textToRead);
            utterance.lang = 'pt-BR';
            utterance.rate = 1.0;

            utterance.onend = () => {
                reading = false;
                btnSpeak.innerText = '🔊 Ouvir Página';
            };

            window.speechSynthesis.speak(utterance);
            reading = true;
            btnSpeak.innerText = '⏹️ Parar Leitura';
        }
    } else {
        alert('Seu navegador não possui suporte para leitura por áudio.');
    }
});