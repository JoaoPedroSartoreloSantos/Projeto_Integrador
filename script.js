// --- FUNCIONALIDADE 1: Alternar Menu Hambúrguer em Telas Menores ---
const hamburgerBtn = document.getElementById('hamburger-btn');
const tabsNav = document.getElementById('tabs-nav');

hamburgerBtn.addEventListener('click', () => {
    tabsNav.classList.toggle('show');
});

// --- FUNCIONALIDADE 2: Sistema de Troca de Abas ---
function openTab(evt, tabName) {
    // Esconde todas as seções
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Desmarca todos os botões de aba
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
    });

    // Exibe a aba clicada e marca o botão como ativo
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');

    // Fecha o menu hambúrguer automaticamente no celular após a seleção
    if (window.innerWidth <= 768) {
        tabsNav.classList.remove('show');
    }

    // Para o leitor de voz caso esteja ativo ao trocar de aba
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        reading = false;
        document.getElementById('btn-speak').innerText = '🔊 Ouvir Aba Atual';
    }
}

// --- FUNCIONALIDADE 3: Aumentar e Diminuir Fonte ---
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

// --- FUNCIONALIDADE 4: Leitor por Voz para a Aba Ativa ---
let reading = false;
const btnSpeak = document.getElementById('btn-speak');

btnSpeak.addEventListener('click', () => {
    if ('speechSynthesis' in window) {
        if (reading) {
            window.speechSynthesis.cancel();
            reading = false;
            btnSpeak.innerText = '🔊 Ouvir Aba Atual';
        } else {
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