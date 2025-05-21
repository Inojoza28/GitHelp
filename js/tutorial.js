/**
 * GitHelp - Tutorial Interativo
 * 
 * Este arquivo implementa a funcionalidade de tutorial interativo
 * para o GitHelp, permitindo que usuários aprendam Git passo a passo.
 */

document.addEventListener('DOMContentLoaded', function () {
    // ===== Elementos do DOM =====
    const domElements = {
        form: document.getElementById('commandForm'),
        input: document.getElementById('userInput'),
        resultSection: document.getElementById('resultSection'),
        commandResult: document.getElementById('commandResult'),
        commandExplanation: document.getElementById('commandExplanation'),
        copyButton: document.getElementById('copyButton'),
        loadingSection: document.getElementById('loadingSection'),
        feedbackYes: document.getElementById('feedbackYes'),
        feedbackNo: document.getElementById('feedbackNo'),
        tagsContainer: document.getElementById('tagsContainer'),
        categoryButtons: document.querySelectorAll('[data-category]'),
        historyList: document.getElementById('historyList'),
        tutorialContainer: document.getElementById('tutorialContainer')
    };

    // ===== Definição dos tutoriais disponíveis =====
// ===== Definição dos tutoriais disponíveis =====
const tutorials = {
    basics: {
        title: "Primeiros Passos com Git",
        icon: "fa-book-open",
        description: "Um guia passo a passo para quem nunca usou Git, começando do zero",
        steps: [
            {
                title: "O que é Git?",
                command: "# Git é um sistema de controle de versão que permite rastrear mudanças no seu código",
                explanation: "Antes de começar: Git não é GitHub! Git é um sistema que registra todas as alterações nos seus arquivos ao longo do tempo. GitHub é um serviço online que usa Git. O Git permite que você trabalhe offline, volte para versões anteriores do seu código e colabore com outras pessoas sem sobrescrever o trabalho uns dos outros."
            },
            {
                title: "Configurando sua identidade",
                command: "git config --global user.name \"Seu Nome\"\ngit config --global user.email \"seu.email@exemplo.com\"",
                explanation: "Antes de começar a usar Git, você precisa informar quem você é. Isso identifica você como autor nas alterações que fizer. Esta configuração é feita apenas uma vez no seu computador."
            },
            {
                title: "Inicializando um repositório",
                command: "git init",
                explanation: "Este comando transforma sua pasta atual em um repositório Git. Ele cria uma pasta oculta .git que contém toda a 'mágica' do Git. Execute este comando na pasta principal do seu projeto."
            },
            {
                title: "Verificando status do projeto",
                command: "git status",
                explanation: "Este comando mostra o estado atual do seu repositório. Use-o frequentemente para ver quais arquivos foram modificados, quais estão prontos para commit e quais não estão sendo rastreados pelo Git. É como verificar 'o que está acontecendo' no seu projeto."
            },
            {
                title: "Adicionando arquivos para controle",
                command: "git add arquivo.js",
                explanation: "Este comando prepara um arquivo específico para ser incluído no próximo commit. Pense nisso como dizer ao Git: 'Considere estas mudanças para a próxima versão que vou salvar'. Para adicionar todos os arquivos modificados de uma vez, use 'git add .'"
            },
            {
                title: "Salvando alterações (commit)",
                command: "git commit -m \"Descrição clara do que foi alterado\"",
                explanation: "Este comando salva todas as alterações preparadas (adicionadas) como uma nova versão do projeto. A mensagem após -m deve descrever claramente o que você fez. Um bom commit é como um bom checkpoint em um jogo - você pode voltar para ele mais tarde se algo der errado."
            },
            {
                title: "Visualizando histórico de alterações",
                command: "git log --oneline",
                explanation: "Mostra o histórico de commits de forma resumida, uma linha por commit. Você verá uma lista com o ID único (hash) e a mensagem de cada commit. Esta é a 'linha do tempo' do seu projeto."
            }
        ]
    },
    branching: {
        title: "Trabalhando com Branches",
        icon: "fa-code-branch",
        description: "Aprenda a criar linhas de desenvolvimento paralelas para trabalhar em novas funcionalidades sem afetar o código principal",
        steps: [
            {
                title: "O que são branches?",
                command: "# Branches são linhas de desenvolvimento paralelas",
                explanation: "Branches (ramos) permitem desenvolver funcionalidades, corrigir bugs ou experimentar ideias sem afetar a versão principal (main/master) do seu código. É como criar uma cópia do seu projeto onde você pode fazer alterações livremente."
            },
            {
                title: "Verificando branches existentes",
                command: "git branch",
                explanation: "Lista todas as branches no seu repositório local. A branch atual será marcada com um asterisco (*). Quando você inicia um repositório, só existe a branch principal, geralmente chamada 'main' ou 'master'."
            },
            {
                title: "Criando uma nova branch",
                command: "git branch nova-funcionalidade",
                explanation: "Cria uma nova branch chamada 'nova-funcionalidade' baseada na branch atual, mas NÃO muda para ela automaticamente. É como criar um novo caminho paralelo, mas você ainda não começou a segui-lo."
            },
            {
                title: "Mudando para outra branch",
                command: "git checkout nova-funcionalidade",
                explanation: "Muda seu ambiente de trabalho para a branch especificada. Todos os arquivos no seu diretório serão atualizados para refletir o estado daquela branch. É como 'entrar' naquela linha de desenvolvimento."
            },
            {
                title: "Atalho: criar e mudar de branch",
                command: "git checkout -b correcao-bug",
                explanation: "Este comando combina os dois anteriores: cria uma nova branch chamada 'correcao-bug' E já muda para ela automaticamente. É a maneira mais rápida de iniciar o trabalho em uma nova funcionalidade ou correção."
            },
            {
                title: "Mesclando alterações de uma branch",
                command: "git checkout main\ngit merge nova-funcionalidade",
                explanation: "Estes comandos primeiro retornam para a branch principal e depois incorporam todas as alterações feitas na branch 'nova-funcionalidade'. Use esse processo quando terminar de trabalhar em uma funcionalidade e quiser incluí-la no projeto principal."
            },
            {
                title: "Excluindo branch após mesclagem",
                command: "git branch -d nova-funcionalidade",
                explanation: "Remove a branch especificada após você já ter mesclado suas alterações. As branches são leves no Git, portanto é uma boa prática excluir branches que não são mais necessárias para manter seu repositório organizado."
            }
        ]
    },
    collaboration: {
        title: "Colaboração com Git e GitHub",
        icon: "fa-users",
        description: "Comandos essenciais para trabalhar em equipe usando Git e plataformas como GitHub",
        steps: [
            {
                title: "O que é um repositório remoto?",
                command: "# Repositórios remotos são versões do seu projeto hospedadas na internet",
                explanation: "Repositórios remotos como GitHub, GitLab ou Bitbucket permitem que você faça backup do seu código e trabalhe com outras pessoas. Eles funcionam como a 'versão oficial' do projeto que todos podem acessar."
            },
            {
                title: "Clonando um repositório existente",
                command: "git clone https://github.com/usuario/repositorio.git",
                explanation: "Cria uma cópia local completa de um repositório remoto. Isso baixa todo o histórico do projeto e configura automaticamente a conexão com o repositório original. Use este comando quando for começar a trabalhar em um projeto já existente."
            },
            {
                title: "Conectando a um repositório remoto",
                command: "git remote add origin https://github.com/seu-usuario/seu-repositorio.git",
                explanation: "Conecta seu repositório local a um repositório remoto (vazio) que você já criou. 'origin' é um apelido que você usará para se referir a este remoto. Execute este comando após 'git init' quando quiser publicar um projeto local no GitHub."
            },
            {
                title: "Enviando alterações para o repositório remoto",
                command: "git push origin main",
                explanation: "Envia os commits da sua branch local 'main' para o repositório remoto. Use este comando quando quiser compartilhar suas alterações ou fazer backup do seu trabalho online. Substitua 'main' pelo nome da branch que deseja enviar."
            },
            {
                title: "Baixando atualizações do repositório remoto",
                command: "git pull origin main",
                explanation: "Baixa e integra automaticamente as alterações do repositório remoto na sua branch atual. Use este comando para obter o trabalho mais recente da equipe. É uma boa prática sempre fazer pull antes de começar a trabalhar e antes de fazer push."
            },
            {
                title: "Verificando alterações antes de baixar",
                command: "git fetch origin\ngit diff main origin/main",
                explanation: "O primeiro comando baixa as alterações do repositório remoto sem aplicá-las. O segundo mostra as diferenças entre sua branch local e a remota. Isso permite que você veja o que mudou antes de incorporar as alterações."
            },
            {
                title: "Criando um fork no GitHub",
                command: "# Use o botão 'Fork' na interface do GitHub",
                explanation: "Um fork é uma cópia pessoal de um repositório de outra pessoa no GitHub. Isso permite que você experimente livremente sem afetar o projeto original. É geralmente o primeiro passo para contribuir em projetos de código aberto."
            }
        ]
    },
    advanced: {
        title: "Técnicas Avançadas de Git",
        icon: "fa-cogs",
        description: "Comandos poderosos para desenvolvedores que já dominam o básico do Git",
        steps: [
            {
                title: "Salvando alterações temporárias (stash)",
                command: "git stash save \"Trabalho em progresso no login\"",
                explanation: "Salva temporariamente suas alterações não commitadas para que você possa mudar de branch sem perder seu trabalho. É como guardar suas alterações em uma gaveta para usar mais tarde. Útil quando você precisa mudar de contexto rapidamente."
            },
            {
                title: "Recuperando alterações do stash",
                command: "git stash list\ngit stash apply stash@{0}",
                explanation: "O primeiro comando lista todos os stashes salvos. O segundo aplica o stash específico (geralmente o mais recente) sem removê-lo da lista. Use 'git stash pop' se quiser aplicar e remover o stash em um único comando."
            },
            {
                title: "Voltando no tempo com reset",
                command: "git reset --soft HEAD~1",
                explanation: "Desfaz o último commit, mas mantém as alterações prontas para um novo commit. Útil quando você percebe que commitou algo errado ou quer mudar a mensagem do commit. O '--soft' preserva suas alterações."
            },
            {
                title: "Voltando no tempo (de forma drástica)",
                command: "git reset --hard HEAD~1",
                explanation: "Desfaz completamente o último commit e todas as alterações. CUIDADO: Isso descarta permanentemente as alterações! Use apenas quando realmente quiser descartar todo o trabalho desde o commit anterior."
            },
            {
                title: "Reescrevendo histórico com rebase",
                command: "git rebase -i HEAD~3",
                explanation: "Abre um editor interativo para reorganizar, editar, combinar ou remover os últimos 3 commits. Útil para manter um histórico limpo antes de compartilhar suas alterações. AVISO: Nunca use rebase em commits que já foram publicados/compartilhados!"
            },
            {
                title: "Importando commits específicos (cherry-pick)",
                command: "git cherry-pick a1b2c3d",
                explanation: "Aplica as alterações de um commit específico (identificado pelo hash 'a1b2c3d') na branch atual. Útil quando você quer trazer apenas uma correção específica de outra branch sem mesclar todo o conteúdo."
            },
            {
                title: "Encontrando bugs com bisect",
                command: "git bisect start\ngit bisect bad\ngit bisect good a1b2c3d",
                explanation: "Inicia uma busca binária para encontrar qual commit introduziu um bug. Você marca o commit atual como 'bad' (ruim) e um commit anterior como 'good' (bom). Git te ajudará a testar commits intermediários até encontrar o culpado."
            }
        ]
    },
    troubleshooting: {
        title: "Resolvendo Problemas Comuns",
        icon: "fa-bug",
        description: "Soluções para situações difíceis que todo desenvolvedor Git enfrenta eventualmente",
        steps: [
            {
                title: "Oops! Commitei na branch errada",
                command: "git cherry-pick HEAD\ngit reset --hard HEAD~1",
                explanation: "Primeiro, anote o hash do commit errado. Mude para a branch correta, aplique o commit com cherry-pick e depois volte à branch original e remova o commit com reset. Isso 'move' efetivamente o commit entre branches."
            },
            {
                title: "Socorro! Commitei informações sensíveis",
                command: "git filter-branch --force --index-filter \"git rm --cached --ignore-unmatch caminho/para/arquivo_sensivel\" HEAD",
                explanation: "Este comando remove completamente um arquivo do histórico Git. ATENÇÃO: Isso reescreve todo o histórico! Se o repositório é compartilhado, todos os colaboradores precisarão sincronizar. Para senhas/tokens já expostos, considere-os comprometidos e altere-os imediatamente."
            },
            {
                title: "Desfazendo o último commit (mantendo alterações)",
                command: "git reset --soft HEAD~1",
                explanation: "Reverte o último commit, mas mantém todas as alterações em staging. Útil quando você percebe que esqueceu algo ou cometeu um erro. As alterações estarão prontas para serem commitadas novamente."
            },
            {
                title: "Revertendo um commit específico",
                command: "git revert a1b2c3d",
                explanation: "Cria um novo commit que desfaz as alterações do commit especificado. A diferença do reset é que o histórico não é reescrito. Use revert para desfazer alterações que já foram compartilhadas com outros."
            },
            {
                title: "O que mudou neste arquivo?",
                command: "git blame arquivo.js",
                explanation: "Mostra quem modificou cada linha de um arquivo e em qual commit. Útil para entender por que uma parte do código está da forma que está ou para encontrar quem pode ajudar com dúvidas sobre aquele código."
            },
            {
                title: "Recuperando arquivo excluído (não commitado)",
                command: "git checkout -- arquivo_deletado.txt",
                explanation: "Restaura um arquivo que foi excluído, mas a exclusão ainda não foi commitada. Funciona apenas para arquivos que já estavam sob controle de versão antes de serem deletados."
            },
            {
                title: "Mergei a branch errada, e agora?",
                command: "git reset --hard ORIG_HEAD",
                explanation: "Após um merge, o Git salva sua posição anterior em ORIG_HEAD. Este comando reverte para o estado exato antes do merge. Funciona apenas se você não fez outras operações depois do merge."
            }
        ]
    }
};
    // Estado atual do tutorial
    let currentTutorial = null;
    let currentStep = 0;
    let tutorialSection = null;
    let isTutorialActive = false;
    let isTutorialMinimized = false;

    /**
     * Inicializa a funcionalidade de tutorial
     */
    function initTutorials() {
        // Criar a seção de tutorial (inicialmente oculta)
        createTutorialSection();
        
        // Adicionar botão de minimizar/maximizar ao título da seção de tutoriais
        addMinimizeButton();
        
        // Carregar preferência do usuário do localStorage
        loadTutorialVisibilityPreference();

        // Adicionar event listeners aos botões de tutorial
        document.querySelectorAll('.tutorial-pill').forEach(button => {
            button.addEventListener('click', () => {
                const tutorialId = button.getAttribute('data-tutorial');
                
                // Fechar qualquer resultado de categoria que esteja aberto
                if (domElements.resultSection && !domElements.resultSection.classList.contains('hidden')) {
                    domElements.resultSection.classList.add('hidden');
                }
                
                startTutorial(tutorialId);
                
                // Atualiza estilo dos botões de tutorial
                document.querySelectorAll('.tutorial-pill').forEach(btn => {
                    btn.classList.remove('active-tutorial');
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    btn.classList.add('bg-gray-100', 'hover:bg-gray-200', 'text-gray-700');
                    
                    // Restaura cor do ícone
                    const icon = btn.querySelector('i');
                    if (icon) icon.classList.add('text-gray-500');
                });
                
                // Destaca o botão selecionado
                button.classList.add('active-tutorial');
                button.classList.remove('bg-gray-100', 'hover:bg-gray-200', 'text-gray-700');
                button.style.backgroundColor = 'var(--primary)';
                button.style.color = 'white';
                
                // Atualiza cor do ícone
                const icon = button.querySelector('i');
                if (icon) icon.classList.remove('text-gray-500');
            });
        });
        
        // Adicionar event listeners aos botões de categoria para fechar o tutorial quando uma categoria for selecionada
        if (domElements.categoryButtons) {
            domElements.categoryButtons.forEach(button => {
                const originalClickHandler = button.onclick;
                
                button.onclick = function(e) {
                    // Se o tutorial estiver ativo, feche-o
                    if (isTutorialActive && tutorialSection) {
                        tutorialSection.classList.add('hidden');
                        isTutorialActive = false;
                        resetTutorialButtons();
                    }
                    
                    // Preservar o comportamento original do botão de categoria
                    if (originalClickHandler) {
                        return originalClickHandler.call(this, e);
                    }
                };
            });
        }
        
        // Adicionar event listener ao formulário para fechar o tutorial quando uma pesquisa for realizada
        if (domElements.form) {
            const originalSubmitHandler = domElements.form.onsubmit;
            
            domElements.form.onsubmit = function(e) {
                // Se o tutorial estiver ativo, feche-o
                if (isTutorialActive && tutorialSection) {
                    tutorialSection.classList.add('hidden');
                    isTutorialActive = false;
                    resetTutorialButtons();
                }
                
                // Preservar o comportamento original do formulário
                if (originalSubmitHandler) {
                    return originalSubmitHandler.call(this, e);
                }
            };
        }
        
        // Garantir que o botão "Básicos" mantenha seu estilo destacado
        const basicsCategoryButton = document.querySelector('[data-category="basics"]');
        if (basicsCategoryButton) {
            // Aplicar estilo destacado ao botão "Básicos"
            basicsCategoryButton.style.backgroundColor = 'var(--primary)';
            basicsCategoryButton.style.color = 'white';
            
            // Remover classes que possam interferir
            basicsCategoryButton.classList.remove('bg-gray-100', 'hover:bg-gray-200', 'text-gray-700');
            
            // Ajustar o ícone
            const icon = basicsCategoryButton.querySelector('i');
            if (icon) {
                icon.classList.remove('text-gray-500');
            }
        }
    }

    /**
     * Carrega a preferência de visibilidade do tutorial do localStorage
     */
    function loadTutorialVisibilityPreference() {
        try {
            // Verificar se há uma preferência salva
            const savedPreference = localStorage.getItem('githelp_tutorial_minimized');
            
            if (savedPreference !== null) {
                // Converter string para booleano
                isTutorialMinimized = savedPreference === 'true';
                
                // Aplicar a preferência
                if (isTutorialMinimized) {
                    // Ocultar tutoriais
                    if (domElements.tutorialContainer) {
                        domElements.tutorialContainer.style.display = 'none';
                    }
                    
                    // Atualizar ícone do botão
                    const toggleButton = document.getElementById('toggleTutorialButton');
                    if (toggleButton) {
                        toggleButton.innerHTML = '<i class="fas fa-chevron-down"></i>';
                        toggleButton.setAttribute('title', 'Expandir tutoriais');
                    }
                }
            }
        } catch (error) {
            console.error('Erro ao carregar preferência de visibilidade do tutorial:', error);
        }
    }

    /**
     * Adiciona o botão de minimizar/maximizar ao título da seção de tutoriais
     */
    function addMinimizeButton() {
        // Encontrar o título da seção de tutoriais
        const tutorialHeader = document.querySelector('.mb-6 h3:has(i.fa-graduation-cap)');
        
        if (tutorialHeader) {
            // Criar o botão de minimizar/maximizar
            const minimizeButton = document.createElement('button');
            minimizeButton.id = 'toggleTutorialButton';
            minimizeButton.className = 'ml-2 text-gray-400 hover:text-gray-600 transition';
            minimizeButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
            minimizeButton.setAttribute('aria-label', 'Minimizar tutoriais');
            minimizeButton.setAttribute('title', 'Minimizar tutoriais');
            
            // Adicionar o botão ao título
            tutorialHeader.appendChild(minimizeButton);
            
            // Adicionar event listener ao botão
            minimizeButton.addEventListener('click', toggleTutorialVisibility);
        }
    }

    /**
     * Alterna a visibilidade da seção de tutoriais
     */
    function toggleTutorialVisibility() {
        const tutorialContainer = domElements.tutorialContainer;
        const toggleButton = document.getElementById('toggleTutorialButton');
        
        if (!tutorialContainer || !toggleButton) return;
        
        // Inverter o estado atual
        isTutorialMinimized = !isTutorialMinimized;
        
        // Salvar preferência no localStorage
        try {
            localStorage.setItem('githelp_tutorial_minimized', isTutorialMinimized.toString());
        } catch (error) {
            console.error('Erro ao salvar preferência de visibilidade do tutorial:', error);
        }
        
        if (!isTutorialMinimized) {
            // Mostrar tutoriais
            tutorialContainer.style.display = 'flex';
            tutorialContainer.classList.add('animate-in');
            toggleButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
            toggleButton.setAttribute('title', 'Minimizar tutoriais');
        } else {
            // Ocultar tutoriais
            tutorialContainer.style.display = 'none';
            toggleButton.innerHTML = '<i class="fas fa-chevron-down"></i>';
            toggleButton.setAttribute('title', 'Expandir tutoriais');
            
            // Se houver um tutorial ativo, feche-o também
            if (isTutorialActive && tutorialSection) {
                tutorialSection.classList.add('hidden');
                isTutorialActive = false;
                resetTutorialButtons();
            }
        }
    }

    /**
     * Cria a seção de tutorial
     */
    function createTutorialSection() {
        tutorialSection = document.createElement('section');
        tutorialSection.id = 'tutorialSection';
        tutorialSection.className = 'rounded-xl p-6 mb-6 hidden animate-in';
        tutorialSection.style.backgroundColor = 'var(--accent)';
        
        // Inserir após as categorias e antes dos comandos
        const commandTags = document.getElementById('commandTags');
        if (commandTags) {
            commandTags.parentNode.insertBefore(tutorialSection, commandTags.nextSibling);
        }
    }

    /**
     * Inicia um tutorial específico
     * @param {string} tutorialId - ID do tutorial a ser exibido
     */
    function startTutorial(tutorialId) {
        if (!tutorials[tutorialId]) {
            console.error(`Tutorial ${tutorialId} não encontrado`);
            return;
        }
        
        // Define o tutorial atual e reseta o passo
        currentTutorial = tutorialId;
        currentStep = 0;
        isTutorialActive = true;
        
        // Atualiza o conteúdo da seção de tutorial
        updateTutorialContent();
        
        // Mostra a seção de tutorial se estiver oculta
        tutorialSection.classList.remove('hidden');
        
        // Rolagem suave até o tutorial
        tutorialSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /**
     * Atualiza o conteúdo do tutorial
     */
    function updateTutorialContent() {
        const tutorial = tutorials[currentTutorial];
        const step = tutorial.steps[currentStep];
        
        // Template HTML para o tutorial
        tutorialSection.innerHTML = `
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold mb-0 flex items-center" style="color: var(--primary-dark);">
                    <i class="fas ${tutorial.icon} mr-2" style="color: var(--primary);"></i> 
                    ${tutorial.title}
                </h3>
                <div class="badge" style="background-color: var(--accent); color: var(--primary-dark);">
                    <i class="fas fa-graduation-cap mr-1"></i> Passo ${currentStep + 1}/${tutorial.steps.length}
                </div>
            </div>
            
            <p class="text-gray-700 mb-4 bg-white p-4 rounded-xl shadow-sm">${tutorial.description}</p>
            
            <div class="mb-6">
                <div class="flex items-center justify-between mb-3">
                    <h4 class="text-md font-medium mb-0 flex items-center" style="color: var(--primary-dark);">
                        <i class="fas fa-terminal mr-2" style="color: var(--primary);"></i> ${step.title}:
                    </h4>
                </div>
                <div class="bg-white p-5 rounded-xl shadow-sm command-card">
                    <div class="flex justify-between items-center">
                        <pre class="command-result whitespace-pre-wrap break-words flex-grow" style="color: var(--primary-dark);">${step.command}</pre>
                        <button id="copyTutorialCommand" class="text-gray-400 hover:text-orange-600 transition tooltip flex-shrink-0 text-xl ml-4">
                            <i class="far fa-copy"></i>
                            <span class="tooltiptext">Copiar comando</span>
                        </button>
                    </div>
                </div>
            </div>
            
            <div>
                <h4 class="text-md font-medium mb-3 flex items-center" style="color: var(--primary-dark);">
                    <i class="fas fa-info-circle mr-2" style="color: var(--primary);"></i> Explicação:
                </h4>
                <p class="text-gray-700 bg-white p-5 rounded-xl shadow-sm">${step.explanation}</p>
            </div>
            
            <div class="flex justify-between mt-6 pt-4 border-t" style="border-color: var(--primary-light);">
                <button id="prevStepButton" class="px-4 py-2 rounded-lg flex items-center ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''} transition" style="background-color: ${currentStep === 0 ? '#f1f1f1' : 'var(--gray-light)'}; color: ${currentStep === 0 ? '#999' : 'var(--dark)'};">
                    <i class="fas fa-chevron-left mr-2"></i> Anterior
                </button>
                <button id="closeTutorialButton" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center">
                    <i class="fas fa-times mr-2"></i> Fechar
                </button>
                <button id="nextStepButton" class="px-4 py-2 rounded-lg flex items-center transition" style="background-color: ${currentStep === tutorial.steps.length - 1 ? '#4CAF50' : 'var(--primary)'}; color: white;">
                    ${currentStep === tutorial.steps.length - 1 ? '<i class="fas fa-check mr-2"></i> Concluir' : 'Próximo <i class="fas fa-chevron-right ml-2"></i>'}
                </button>
            </div>
        `;
        
        // Adicionar event listeners aos botões
        document.getElementById('prevStepButton').addEventListener('click', prevStep);
        document.getElementById('nextStepButton').addEventListener('click', nextStep);
        document.getElementById('closeTutorialButton').addEventListener('click', closeTutorial);
        document.getElementById('copyTutorialCommand').addEventListener('click', () => {
            copyToClipboard(step.command);
        });
    }

    /**
     * Vai para o passo anterior do tutorial
     */
    function prevStep() {
        if (currentStep > 0) {
            currentStep--;
            updateTutorialContent();
        }
    }

    /**
     * Vai para o próximo passo do tutorial
     */
    function nextStep() {
        const tutorial = tutorials[currentTutorial];
        
        if (currentStep < tutorial.steps.length - 1) {
            currentStep++;
            updateTutorialContent();
        } else {
            // Último passo - fechar tutorial
            closeTutorial();
        }
    }

/**
 * Fecha o tutorial e volta para a lista de tutoriais
 */
function closeTutorial() {
    tutorialSection.classList.add('hidden');
    isTutorialActive = false;
    
    // Garantir que os tutoriais estejam visíveis
    isTutorialMinimized = false;
    localStorage.setItem('githelp_tutorial_minimized', 'false');
    
    if (domElements.tutorialContainer) {
        // Mostrar container dos tutoriais
        domElements.tutorialContainer.style.display = 'flex';
        
        // Atualizar botão de toggle
        const toggleButton = document.getElementById('toggleTutorialButton');
        if (toggleButton) {
            toggleButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
            toggleButton.setAttribute('title', 'Minimizar tutoriais');
        }

        // Rolagem suave após pequeno delay para garantir renderização
        setTimeout(() => {
            domElements.tutorialContainer.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 50);
    }

    resetTutorialButtons();
    currentTutorial = null;
    currentStep = 0;
}

    /**
     * Reseta o estilo dos botões de tutorial
     */
    function resetTutorialButtons() {
        document.querySelectorAll('.tutorial-pill').forEach(btn => {
            btn.classList.remove('active-tutorial');
            btn.style.backgroundColor = '';
            btn.style.color = '';
            btn.classList.add('bg-gray-100', 'hover:bg-gray-200', 'text-gray-700');
            
            // Restaura cor do ícone
            const icon = btn.querySelector('i');
            if (icon) icon.classList.add('text-gray-500');
        });
    }

    /**
     * Copia o texto para a área de transferência
     * @param {string} text - Texto a ser copiado
     */
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            // Feedback visual temporário
            const copyButton = document.getElementById('copyTutorialCommand');
            const originalHTML = copyButton.innerHTML;
            
            copyButton.innerHTML = '<i class="fas fa-check text-green-500"></i> <span class="tooltiptext">Copiado!</span>';
            
            setTimeout(() => {
                copyButton.innerHTML = originalHTML;
            }, 2000);
        }).catch(err => {
            console.error('Erro ao copiar texto: ', err);
        });
    }

    // Função para observar mudanças no DOM e garantir que o botão "Básicos" mantenha seu estilo
    function observeDOMChanges() {
        // Criar um observador de mutações
        const observer = new MutationObserver(function(mutations) {
            // Verificar se o botão "Básicos" perdeu seu estilo
            const basicsCategoryButton = document.querySelector('[data-category="basics"]');
            if (basicsCategoryButton && 
                (basicsCategoryButton.style.backgroundColor !== 'var(--primary)' || 
                 basicsCategoryButton.style.color !== 'white')) {
                
                // Reaplicar estilo destacado
                basicsCategoryButton.style.backgroundColor = 'var(--primary)';
                basicsCategoryButton.style.color = 'white';
                
                // Remover classes que possam interferir
                basicsCategoryButton.classList.remove('bg-gray-100', 'hover:bg-gray-200', 'text-gray-700');
                
                // Ajustar o ícone
                const icon = basicsCategoryButton.querySelector('i');
                if (icon) {
                    icon.classList.remove('text-gray-500');
                }
            }
        });
        
        // Configurar o observador para monitorar mudanças em atributos e filhos
        observer.observe(document.body, { 
            attributes: true, 
            childList: true, 
            subtree: true,
            attributeFilter: ['style', 'class'] 
        });
    }

    // Inicializar tutoriais quando o DOM estiver pronto
    initTutorials();
    
    // Iniciar observação de mudanças no DOM
    observeDOMChanges();
});
