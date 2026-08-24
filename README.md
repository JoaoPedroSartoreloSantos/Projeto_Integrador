# Projeto Integrador — Ótica, Robótica e Física e Tecnociência

Site do projeto integrador com conteúdo introdutório sobre Ótica e registros dos projetos desenvolvidos em Robótica e Física e Tecnociência.

## Estrutura
- `index.html` — estrutura e conteúdo do site
- `style.css` — estilos visuais e responsividade
- `script.js` — troca de abas, menu mobile, leitor de voz e controle de fonte
- `favicon.svg` — ícone do site

## Recursos de acessibilidade
- Botões para aumentar/diminuir o tamanho do texto
- Leitor de voz da aba ativa (Web Speech API)
- Navegação por teclado nas abas (setas, Home/End)
- Link "pular para o conteúdo"
- Integração com [VLibras](https://vlibras.gov.br/) para tradução em Libras
- Estrutura ARIA (`role="tablist"`, `aria-selected`, `aria-expanded`, etc.)

## Outros recursos
- **Modo claro/escuro**: botão na barra de acessibilidade, com preferência salva no navegador (`localStorage`)
- **Badge numerado** em cada projeto (canto do card)
- **Card "Aplicação real"** em cada projeto: espaço para uma imagem + texto sobre um item existente que usa aquele conhecimento e ajuda a sociedade — a preencher conforme o conteúdo for adicionado
- **Vídeos com capa e botão de play customizado**, em vez do player padrão do navegador

## Como rodar
Basta abrir o `index.html` no navegador, ou publicar via GitHub Pages:
`Settings → Pages → Branch: main → Save`

## Pendências
- Substituir as imagens de placeholder pelas fotos reais dos projetos
- Adicionar os vídeos (`caminho-do-videoN.mp4`) e as legendas (`legenda-*.vtt`) de cada projeto
