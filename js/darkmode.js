document.addEventListener('DOMContentLoaded', function() {
  // Carrega o tema salvo
  loadSavedTheme();
  
  // Adiciona o evento de clique a todos os botões de tema
  const themeToggleButtons = document.querySelectorAll('#themeToggle');
  themeToggleButtons.forEach(button => {
    button.addEventListener('click', toggleTheme);
  });
  
  // Adiciona atalho de teclado (Alt+T) para alternar o tema
  document.addEventListener('keydown', function(event) {
    // Verifica se a combinação de teclas Alt+T foi pressionada
    if (event.altKey && (event.key === 't' || event.key === 'T')) {
      toggleTheme();
      event.preventDefault(); // Previne o comportamento padrão do navegador
    }
  });
});

// Função para alternar o tema com animação
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Atualiza todos os ícones de tema na página
  const themeIcons = document.querySelectorAll('#themeIcon');
  themeIcons.forEach(icon => {
    // Adiciona classe para animação
    icon.classList.add('pulse-theme');
    
    // Remove classe após animação
    setTimeout(() => {
      icon.classList.remove('pulse-theme');
    }, 500);
    
    icon.className = newTheme === 'light' ? 'fas fa-moon text-gray-600 text-lg' : 'fas fa-sun text-lg';
  });
}

// Função para carregar o tema salvo
function loadSavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Atualiza todos os ícones de tema na página
    const themeIcons = document.querySelectorAll('#themeIcon');
    themeIcons.forEach(icon => {
      icon.className = savedTheme === 'light' ? 'fas fa-moon text-gray-600 text-lg' : 'fas fa-sun text-lg';
    });
  }
}