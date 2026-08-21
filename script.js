// --- FUNCIONALIDADE 1: Alternar Menu Hambúrguer em Telas Menores ---
const hamburgerBtn = document.getElementById('hamburger-btn');
const tabsNav = document.getElementById('tabs-nav');

hamburgerBtn.addEventListener('click', () => {
    const isOpen = tabsNav.classList.toggle('show');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
});

// --- FUNCIONALIDADE 2: Sistema de Troca de Abas (padrão ARIA tabs) ---
let reading = false;
const btnSpeak = document.getElementById('btn-speak');

function openTab(evt, tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    const tabBtns = document.querySelectorAll('.tab-btn');

    // Esconde todas as seções e desmarca todos os botões
    tabContents.forEach(content => {
        content.classList.remove('active');
        content.hidden = true;
    });

    tabBtns.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
        btn.setAttribute('tabindex', '-1');
    });

    // Exibe a aba clicada e marca o botão como ativo
    const targetContent = document.getElementById(tabName);
    targetContent.classList.add('active');
    targetContent.hidden = false;

    const targetBtn = evt.currentTarget;
    targetBtn.classList.add('active');
    targetBtn.setAttribute('aria-selected', 'true');
    targetBtn.setAttribute('tabindex', '0');

    // Fecha o menu hambúrguer automaticamente no celular após a seleção
    if (window.innerWidth <= 768) {
        tabsNav.classList.remove('show');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
    }

    // Para o leitor de voz caso esteja ativo ao trocar de aba
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        reading = false;
        btnSpeak.innerText = '🔊 Ouvir';
        btnSpeak.setAttribute('aria-pressed', 'false');
    }
}

// --- FUNCIONALIDADE 2b: Navegação das abas com as setas do teclado ---
const tabButtons = Array.from(document.querySelectorAll('.tab-btn'));

tabsNav.addEventListener('keydown', (evt) => {
    const currentIndex = tabButtons.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    let newIndex = null;

    if (evt.key === 'ArrowRight') {
        newIndex = (currentIndex + 1) % tabButtons.length;
    } else if (evt.key === 'ArrowLeft') {
        newIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
    } else if (evt.key === 'Home') {
        newIndex = 0;
    } else if (evt.key === 'End') {
        newIndex = tabButtons.length - 1;
    }

    if (newIndex !== null) {
        evt.preventDefault();
        const nextBtn = tabButtons[newIndex];
        nextBtn.focus();
        const tabName = nextBtn.getAttribute('aria-controls');
        openTab({ currentTarget: nextBtn }, tabName);
    }
});

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
btnSpeak.addEventListener('click', () => {
    if ('speechSynthesis' in window) {
        if (reading) {
            window.speechSynthesis.cancel();
            reading = false;
            btnSpeak.innerText = '🔊 Ouvir';
            btnSpeak.setAttribute('aria-pressed', 'false');
        } else {
            const activeTab = document.querySelector('.tab-content.active');
            const textToRead = activeTab ? activeTab.innerText : '';

            if (textToRead.trim() === '') return;

            const utterance = new SpeechSynthesisUtterance(textToRead);
            utterance.lang = 'pt-BR';
            utterance.rate = 1.0;

            utterance.onend = () => {
                reading = false;
                btnSpeak.innerText = '🔊 Ouvir';
                btnSpeak.setAttribute('aria-pressed', 'false');
            };

            window.speechSynthesis.speak(utterance);
            reading = true;
            btnSpeak.innerText = '⏹️ Parar';
            btnSpeak.setAttribute('aria-pressed', 'true');
        }
    } else {
        alert('Seu navegador não possui suporte para leitura por áudio.');
    }
});

// --- FUNCIONALIDADE 5: Capa e botão de play customizado nos vídeos ---
document.querySelectorAll('.video-wrapper').forEach(wrapper => {
    const video = wrapper.querySelector('video');
    const playBtn = wrapper.querySelector('.video-play-btn');

    playBtn.addEventListener('click', () => {
        video.play();
    });

    video.addEventListener('play', () => {
        playBtn.classList.add('is-hidden');
    });

    video.addEventListener('pause', () => {
        playBtn.classList.remove('is-hidden');
    });

    video.addEventListener('ended', () => {
        playBtn.classList.remove('is-hidden');
    });
});

// --- FUNCIONALIDADE 6: Alternar entre modo claro e escuro ---
const btnTheme = document.getElementById('btn-theme');
const htmlEl = document.documentElement;

function applyThemeLabel(theme) {
    const isDark = theme === 'dark';
    btnTheme.innerText = isDark ? '☀️ Claro' : '🌙 Escuro';
    btnTheme.setAttribute('aria-pressed', String(isDark));
}

// O tema já foi definido no <head> (evita flash); aqui só sincronizamos o rótulo do botão
applyThemeLabel(htmlEl.getAttribute('data-theme') || 'light');

btnTheme.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    applyThemeLabel(next);
});
