// --- FUNCIONALIDADE 1: Sistema de Troca de Abas ---
function openTab(evt, tabName) {
    // Esconde todas as seções de abas
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Remove a classe "active" de todos os botões de abas
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
    });

    // Mostra a aba atual e marca o botão clicado como ativo
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');

    // Se o leitor de voz estiver lendo, cancela ao trocar de aba
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        reading = false;
        document.getElementById('btn-speak').innerText = '🔊 Ouvir Aba Atual';
    }
}

// --- FUNCIONALIDADE 2: Aumentar e Diminuir Fonte (Zoom) ---
let fontSizePercent = 100;
const body = document.body;

document.getElementById('btn-increase').addEventListener('click', () => {
    if (fontSizePercent < 150) {
        fontSizePercent += 10;
        body.style.fontSize = fontSizePercent + '%';
    }
});

document.getElementById('btn-decrease').addEventListener('click', () => {
    if (fontSizePercent > 80) {
        fontSizePercent -= 10;
        body.style.fontSize = fontSizePercent + '%';
    }
});

// --- FUNCIONALIDADE 3: Leitor de Voz para a Aba Ativa ---
let reading = false;
const btnSpeak = document.getElementById('btn-speak');

btnSpeak.addEventListener('click', () => {
    if ('speechSynthesis' in window) {
        if (reading) {
            window.speechSynthesis.cancel();
            reading = false;
            btnSpeak.innerText = '🔊 Ouvir Aba Atual';
        } else {
            // Pega apenas o texto da aba que está visível no momento (.tab-content.active)
            const activeTab = document.querySelector('.tab-content.active');
            const textToRead = activeTab ? activeTab.innerText : '';

            if (textToRead.trim() === '') return;

            const utterance = new SpeechSynthesisUtterance(textToRead);
            utterance.lang = 'pt-BR';
            utterance.rate = 1.0;

            utterance.onend = () => {
                reading = false;
                btnSpeak.innerText = '🔊 Ouvir Aba Atual';
            };

            window.speechSynthesis.speak(utterance);
            reading = true;
            btnSpeak.innerText = '⏹️ Parar Leitura';
        }
    } else {
        alert('Seu navegador não possui suporte para leitura por áudio.');
    }
});