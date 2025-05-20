// Função para criar e adicionar o menu de atalhos de teclado
function createKeyboardShortcutsMenu() {
  // Verifica se o menu já existe para evitar duplicação
  if (document.getElementById('keyboard-shortcuts-menu')) {
    return;
  }
  
  // Verifica se a tela é grande o suficiente (desktop)
  // Não cria o menu se a largura for menor que 1024px (dispositivos móveis/tablets)
  if (window.innerWidth < 1024) {
    return;
  }
  
  // Cria o elemento principal do menu
  const menuContainer = document.createElement('div');
  menuContainer.id = 'keyboard-shortcuts-menu';
  menuContainer.className = 'fixed bottom-4 left-4 z-50';
  
  // Cria o botão de ajuda que abre o menu 
  const helpButton = document.createElement('button');
  helpButton.id = 'shortcuts-help-button';
  helpButton.className = 'bg-orange-500 hover:bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-700';
  helpButton.innerHTML = '<i class="fas fa-keyboard"></i>';
  helpButton.setAttribute('aria-label', 'Atalhos de teclado');
  helpButton.setAttribute('title', 'Mostrar atalhos de teclado');
  
  // Cria o painel de atalhos (inicialmente oculto) 
  const shortcutsPanel = document.createElement('div');
  shortcutsPanel.id = 'shortcuts-panel';
  shortcutsPanel.className = 'bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-4 mb-3 transition-all duration-300 transform scale-95 opacity-0 invisible';
  shortcutsPanel.setAttribute('aria-hidden', 'true');
  
  // Cabeçalho do painel
  const panelHeader = document.createElement('div');
  panelHeader.className = 'flex justify-between items-center mb-3 pb-2 border-b border-orange-200';
  
  const panelTitle = document.createElement('h3');
  panelTitle.className = 'text-lg font-medium text-orange-800';
  panelTitle.textContent = 'Atalhos de Teclado';
  
  const closeButton = document.createElement('button');
  closeButton.className = 'text-orange-500 hover:text-orange-700';
  closeButton.innerHTML = '<i class="fas fa-times"></i>';
  closeButton.setAttribute('aria-label', 'Fechar menu');
  
  panelHeader.appendChild(panelTitle);
  panelHeader.appendChild(closeButton);
  
  // Conteúdo do painel - lista de atalhos
  const shortcutsList = document.createElement('div');
  shortcutsList.className = 'space-y-3';
  
  // Array com os atalhos disponíveis
  const shortcuts = [
    { keys: ['Alt', 'T'], description: 'Alternar tema claro/escuro' },
    // Adicione aqui outros atalhos que seu aplicativo tenha
  ];
  
  // Criar cada item de atalho
  shortcuts.forEach(shortcut => {
    const shortcutItem = document.createElement('div');
    shortcutItem.className = 'flex justify-between items-center';
    
    const keysContainer = document.createElement('div');
    keysContainer.className = 'flex items-center space-x-1';
    
    // Cria elementos para cada tecla no atalho
    shortcut.keys.forEach((key, index) => {
      const keyElement = document.createElement('kbd');
      keyElement.className = 'px-2 py-1 bg-orange-50 text-orange-800 text-sm font-medium rounded border border-orange-200 shadow-sm';
      keyElement.textContent = key;
      keysContainer.appendChild(keyElement);
      
      // Adiciona o sinal de + entre as teclas
      if (index < shortcut.keys.length - 1) {
        const plusSign = document.createElement('span');
        plusSign.className = 'text-orange-500 mx-1';
        plusSign.textContent = '+';
        keysContainer.appendChild(plusSign);
      }
    });
    
    const description = document.createElement('span');
    description.className = 'text-gray-600 text-sm ml-3';
    description.textContent = shortcut.description;
    
    shortcutItem.appendChild(keysContainer);
    shortcutItem.appendChild(description);
    shortcutsList.appendChild(shortcutItem);
  });
  
  // Monta a estrutura do menu
  shortcutsPanel.appendChild(panelHeader);
  shortcutsPanel.appendChild(shortcutsList);
  menuContainer.appendChild(shortcutsPanel);
  menuContainer.appendChild(helpButton);
  
  // Adiciona o menu ao corpo do documento
  document.body.appendChild(menuContainer);
  
  // Lógica para mostrar/ocultar o painel
  helpButton.addEventListener('click', () => {
    if (shortcutsPanel.classList.contains('invisible')) {
      // Mostra o painel
      shortcutsPanel.classList.remove('invisible', 'opacity-0', 'scale-95');
      shortcutsPanel.classList.add('opacity-100', 'scale-100');
      shortcutsPanel.setAttribute('aria-hidden', 'false');
    } else {
      // Oculta o painel
      hideShortcutsPanel();
    }
  });
  
  closeButton.addEventListener('click', hideShortcutsPanel);
  
  // Função auxiliar para ocultar o painel
  function hideShortcutsPanel() {
    shortcutsPanel.classList.remove('opacity-100', 'scale-100');
    shortcutsPanel.classList.add('opacity-0', 'scale-95');
    setTimeout(() => {
      shortcutsPanel.classList.add('invisible');
      shortcutsPanel.setAttribute('aria-hidden', 'true');
    }, 300);
  }
  
  // Fechar ao clicar fora
  document.addEventListener('click', (event) => {
    const isClickInsideMenu = menuContainer.contains(event.target);
    if (!isClickInsideMenu && !shortcutsPanel.classList.contains('invisible')) {
      hideShortcutsPanel();
    }
  });
  
  // Adiciona a animação de pulso ao botão de ajuda para chamar atenção na primeira visita
  setTimeout(() => {
    helpButton.classList.add('animate-pulse');
    setTimeout(() => {
      helpButton.classList.remove('animate-pulse');
    }, 2000);
  }, 1500);
  
  // Adiciona listener para revalidar responsividade quando a janela for redimensionada
  window.addEventListener('resize', () => {
    if (window.innerWidth < 1024) {
      if (document.getElementById('keyboard-shortcuts-menu')) {
        document.body.removeChild(menuContainer);
      }
    } else {
      if (!document.getElementById('keyboard-shortcuts-menu')) {
        document.body.appendChild(menuContainer);
      }
    }
  });
}

// Adiciona o CSS personalizado para animações
function addKeyboardShortcutsStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    #shortcuts-panel {
      transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
    }
    
    @keyframes pulse-once {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    
    .animate-pulse {
      animation: pulse-once 1s ease-in-out;
    }
    
    /* Esconde o menu em telas menores usando CSS além da lógica JS */
    @media (max-width: 1023px) {
      #keyboard-shortcuts-menu {
        display: none !important;
      }
    }
    
    /* Estilo para o tema escuro usando data-theme */
    [data-theme="dark"] #shortcuts-panel {
      background-color: rgba(30, 41, 59, 0.95); /* slate-800 com transparência */
      border-color: rgba(71, 85, 105, 0.3); /* slate-600 */
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    }
    
    [data-theme="dark"] #shortcuts-panel h3 {
      color:rgb(255, 127, 80);
    }
    
    [data-theme="dark"] #shortcuts-panel .border-orange-200 {
      border-color: rgba(71, 85, 105, 0.5); /* slate-600 */
    }
    
    [data-theme="dark"] #shortcuts-panel kbd {
      background-color: rgba(15, 23, 42, 0.6); /* slate-900 */
      border-color: rgba(100, 116, 139, 0.3); /* slate-500 */
      color: rgb(249, 250, 251); /* gray-50 */
    }
    
    [data-theme="dark"] #shortcuts-panel span:not(kbd) {
      color: rgba(226, 232, 240, 0.8); /* slate-200 */
    }
    
    [data-theme="dark"] #shortcuts-help-button {
      background-color: #2d3748;
    }
    
    [data-theme="dark"] #shortcuts-help-button:hover {
      background-color: #4a5568;
    }
    
    [data-theme="dark"] .text-orange-500 {
      color: rgb(255, 127, 80);
    }
    
    [data-theme="dark"] .text-gray-600 {
      color: rgb(203, 213, 225); /* slate-300 */
    }
  `;
  document.head.appendChild(styleElement);
}

// Inicializa o menu de atalhos quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  addKeyboardShortcutsStyles();
  createKeyboardShortcutsMenu();
});