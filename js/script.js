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
        historyList: document.getElementById('historyList')
    };

    // ===== Base de conhecimento de comandos Git =====
    const gitKnowledgeBase = {
        commands: [
            {
                keywords: ['iniciar', 'começar', 'criar repositório', 'novo repositório', 'inicializar', 'init'],
                command: 'git init',
                explanation: 'Inicializa um novo repositório Git no diretório atual. Isso cria a estrutura necessária para o Git começar a rastrear mudanças.',
                category: 'basics',
                importance: 10
            },
            {
                keywords: ['clonar', 'baixar repositório', 'clone', 'copiar repositório'],
                command: 'git clone [url-do-repositório]',
                explanation: 'Cria uma cópia local de um repositório remoto. Substitua [url-do-repositório] pela URL do repositório que deseja clonar. Isso baixa todo o histórico e arquivos do repositório.',
                category: 'basics',
                importance: 10
            },
            {
                keywords: ['status', 'ver status', 'verificar mudanças', 'estado atual'],
                command: 'git status',
                explanation: 'Mostra o estado atual do repositório, incluindo arquivos modificados, adicionados e não rastreados. É um dos comandos mais utilizados para verificar o que mudou desde o último commit.',
                category: 'basics',
                importance: 10
            },
            {
                keywords: ['adicionar', 'adicionar arquivos', 'adicionar mudanças', 'preparar', 'stage', 'staging'],
                command: 'git add .',
                explanation: 'Adiciona todas as mudanças à área de preparação (staging) para serem incluídas no próximo commit. O ponto "." representa todos os arquivos modificados no diretório atual e seus subdiretórios.',
                category: 'basics',
                importance: 10
            },
            {
                keywords: ['adicionar arquivo específico', 'adicionar um arquivo', 'stage arquivo'],
                command: 'git add [nome-do-arquivo]',
                explanation: 'Adiciona um arquivo específico à área de preparação. Substitua [nome-do-arquivo] pelo nome do arquivo que deseja adicionar. Você também pode usar padrões glob como *.js para adicionar todos os arquivos JavaScript.',
                category: 'basics',
                importance: 8
            },
            {
                keywords: ['commit', 'salvar', 'confirmar mudanças', 'fazer commit', 'commitar'],
                command: 'git commit -m "mensagem do commit"',
                explanation: 'Salva as mudanças preparadas com uma mensagem descritiva. Substitua "mensagem do commit" por uma descrição breve e significativa das alterações realizadas. Uma boa mensagem de commit facilita o entendimento do histórico.',
                category: 'basics',
                importance: 10
            },
            {
                keywords: ['enviar', 'push', 'mandar pro GitHub', 'subir alterações', 'publicar', 'enviar para remoto'],
                command: 'git push origin main',
                explanation: 'Envia os commits locais para o repositório remoto. Este comando envia para a branch "main" no remoto chamado "origin". Em repositórios mais antigos, você pode precisar usar "master" em vez de "main".',
                category: 'remote',
                importance: 10
            },
            {
                keywords: ['atualizar', 'baixar atualizações', 'pull', 'puxar alterações', 'sincronizar'],
                command: 'git pull origin main',
                explanation: 'Obtém e integra alterações do repositório remoto para sua branch local. Este comando puxa da branch "main" no remoto chamado "origin". É equivalente a executar git fetch seguido de git merge.',
                category: 'remote',
                importance: 10
            },
            {
                keywords: ['branch', 'criar branch', 'nova branch'],
                command: 'git branch [nome-da-branch]',
                explanation: 'Cria uma nova branch. Substitua [nome-da-branch] pelo nome que deseja dar à nova branch. O comando apenas cria a branch, mas não muda para ela automaticamente.',
                category: 'branching',
                importance: 8
            },
            {
                keywords: ['mudar branch', 'trocar branch', 'checkout', 'mudar para branch'],
                command: 'git checkout [nome-da-branch]',
                explanation: 'Muda para a branch especificada. Substitua [nome-da-branch] pelo nome da branch para a qual deseja mudar. Este comando atualiza os arquivos no seu diretório de trabalho para corresponder à versão armazenada na branch especificada.',
                category: 'branching',
                importance: 9
            },
            {
                keywords: ['criar e mudar branch', 'nova branch e mudar', 'checkout com branch nova'],
                command: 'git checkout -b [nome-da-branch]',
                explanation: 'Cria uma nova branch e muda para ela imediatamente. Substitua [nome-da-branch] pelo nome que deseja dar à nova branch. É um atalho para executar "git branch" seguido de "git checkout".',
                category: 'branching',
                importance: 9
            },
            {
                keywords: ['listar branches', 'ver branches', 'mostrar branches', 'todas as branches'],
                command: 'git branch',
                explanation: 'Lista todas as branches locais. A branch atual é marcada com um asterisco (*). Para ver também branches remotas, use "git branch -a".',
                category: 'branching',
                importance: 7
            },
            {
                keywords: ['mesclar', 'merge', 'juntar branches', 'combinar branches'],
                command: 'git merge [nome-da-branch]',
                explanation: 'Integra as alterações da branch especificada na branch atual. Substitua [nome-da-branch] pelo nome da branch que deseja mesclar na atual. Se houver conflitos, o Git irá pedir que você os resolva manualmente.',
                category: 'branching',
                importance: 9
            },
            {
                keywords: ['desfazer commit', 'reverter commit', 'voltar commit', 'remover último commit'],
                command: 'git reset --soft HEAD~1',
                explanation: 'Desfaz o último commit mantendo as alterações na área de preparação. O parâmetro "--soft" preserva suas mudanças para que você possa ajustá-las e fazer o commit novamente.',
                category: 'undoing',
                importance: 8
            },
            {
                keywords: ['desfazer alterações', 'descartar mudanças', 'resetar', 'limpar alterações'],
                command: 'git checkout -- .',
                explanation: 'Descarta todas as alterações não commitadas no diretório de trabalho. CUIDADO: Isso apaga permanentemente todas as mudanças que não foram adicionadas à área de preparação.',
                category: 'undoing',
                importance: 7
            },
            {
                keywords: ['histórico', 'ver histórico', 'log', 'commits anteriores'],
                command: 'git log --oneline',
                explanation: 'Mostra o histórico de commits de forma resumida, com uma linha por commit. Inclui o hash abreviado e a mensagem do commit, facilitando a visualização do histórico.',
                category: 'basics',
                importance: 8
            },
            {
                keywords: ['diferenças', 'ver mudanças', 'diff', 'o que mudou'],
                command: 'git diff',
                explanation: 'Mostra as diferenças entre o diretório de trabalho e a área de preparação. Para ver apenas as diferenças de um arquivo específico, use "git diff [nome-do-arquivo]".',
                category: 'basics',
                importance: 7
            },
            {
                keywords: ['remoto', 'adicionar remoto', 'configurar origin', 'conectar repositório remoto'],
                command: 'git remote add origin [url-do-repositorio]',
                explanation: 'Conecta seu repositório local a um repositório remoto. Substitua [url-do-repositorio] pela URL do repositório remoto. Normalmente usado após criar um novo repositório local que precisa ser conectado ao GitHub ou outro serviço.',
                category: 'remote',
                importance: 8
            },
            {
                keywords: ['stash', 'guardar temporariamente', 'salvar para depois', 'armazenar alterações'],
                command: 'git stash',
                explanation: 'Salva temporariamente as alterações que ainda não foram commitadas para poder mudar de branch sem perder o trabalho. As alterações são removidas do diretório de trabalho até serem restauradas.',
                category: 'advanced',
                importance: 7
            },
            {
                keywords: ['recuperar stash', 'aplicar stash', 'restaurar alterações salvas'],
                command: 'git stash pop',
                explanation: 'Aplica e remove o stash mais recente, restaurando as alterações salvas anteriormente. Isso pode causar conflitos se as alterações aplicadas conflitarem com o estado atual dos arquivos.',
                category: 'advanced',
                importance: 6
            },
            {
                keywords: ['tag', 'versão', 'marcar versão', 'release', 'criar tag'],
                command: 'git tag -a v1.0 -m "Versão 1.0"',
                explanation: 'Cria uma tag anotada para marcar pontos importantes como lançamentos de versão. As tags são frequentemente usadas para marcar releases oficiais e são mais permanentes que branches.',
                category: 'advanced',
                importance: 6
            },
            {
                keywords: ['sincronizar branch', 'atualizar branch com main', 'rebase', 'rebase com main'],
                command: 'git rebase main',
                explanation: 'Reaplica os commits da branch atual sobre a branch main, mantendo um histórico linear. Ao contrário do merge, o rebase reescreve o histórico de commits, criando uma linha de desenvolvimento mais limpa.',
                category: 'advanced',
                importance: 7
            },
            {
                keywords: ['resolver conflitos', 'conflitos de merge', 'cancelar merge'],
                command: 'git merge --abort',
                explanation: 'Cancela uma operação de merge em caso de conflitos. Após resolver conflitos manualmente, use git add para marcar os arquivos como resolvidos e git commit para finalizar o merge.',
                category: 'advanced',
                importance: 7
            },
            {
                keywords: ['ignorar arquivos', 'configurar gitignore', 'criar gitignore'],
                command: 'echo "node_modules/" >> .gitignore',
                explanation: 'Adiciona "node_modules/" ao arquivo .gitignore para que o Git ignore essa pasta. O arquivo .gitignore especifica arquivos e diretórios intencionalmente não rastreados que o Git deve ignorar.',
                category: 'basics',
                importance: 7
            },
            {
                keywords: ['ver remoto', 'listar remotos', 'mostrar repositórios remotos'],
                command: 'git remote -v',
                explanation: 'Lista todos os repositórios remotos configurados com suas URLs. A opção "-v" mostra as URLs usadas para fetch e push para cada remoto.',
                category: 'remote',
                importance: 6
            },
            {
                keywords: ['forçar push', 'push forçado', 'push -f'],
                command: 'git push --force origin main',
                explanation: 'Força o envio de alterações para o repositório remoto, mesmo que isso cause conflitos. USE COM EXTREMO CUIDADO! Este comando pode sobrescrever trabalho de outras pessoas e causar perda de dados irrecuperável.',
                category: 'advanced',
                importance: 5
            },
            {
                keywords: ['deletar branch', 'remover branch', 'apagar branch'],
                command: 'git branch -d [nome-da-branch]',
                explanation: 'Remove uma branch local após ela ter sido mesclada. Use -D para forçar a remoção de uma branch não mesclada. Para remover uma branch remota, use "git push origin --delete [nome-da-branch]".',
                category: 'branching',
                importance: 6
            },
            {
                keywords: ['amend', 'corrigir commit', 'modificar último commit', 'alterar commit'],
                command: 'git commit --amend -m "Nova mensagem"',
                explanation: 'Modifica o último commit, alterando sua mensagem ou incluindo novas alterações. Útil para corrigir erros de digitação na mensagem ou adicionar pequenas mudanças esquecidas.',
                category: 'undoing',
                importance: 7
            },
            {
                keywords: ['ver author', 'quem modificou', 'blame', 'responsável pela linha'],
                command: 'git blame [arquivo]',
                explanation: 'Mostra quem modificou cada linha de um arquivo, com informações sobre o commit. Útil para entender o contexto de uma mudança ou identificar quem é o melhor contato para uma parte específica do código.',
                category: 'advanced',
                importance: 5
            },
            {
                keywords: ['cherry-pick', 'aplicar commit específico', 'trazer commit'],
                command: 'git cherry-pick [hash-do-commit]',
                explanation: 'Aplica as alterações de um commit específico na branch atual. Substitua [hash-do-commit] pelo identificador do commit que deseja aplicar. Útil para trazer mudanças específicas de uma branch para outra.',
                category: 'advanced',
                importance: 6
            },
            {
                keywords: ['reflog', 'histórico de referências', 'recuperar branch deletada', 'histórico de operações'],
                command: 'git reflog',
                explanation: 'Mostra um log de todas as referências de HEAD, útil para recuperar commits ou branches perdidos. O reflog mantém um histórico de onde seu HEAD e branches estavam nos últimos 30 dias.',
                category: 'advanced',
                importance: 5
            },
            {
                keywords: ['fetch', 'buscar atualizações', 'baixar sem mesclar'],
                command: 'git fetch origin',
                explanation: 'Baixa conteúdo de um repositório remoto sem mesclar automaticamente. Isso permite verificar as mudanças antes de integrá-las ao seu trabalho local.',
                category: 'remote',
                importance: 8
            },
            {
                keywords: ['status detalhado', 'status verboso', 'status completo'],
                command: 'git status -v',
                explanation: 'Mostra o status detalhado do repositório com as diferenças em formato patch para os arquivos na área de preparação.',
                category: 'basics',
                importance: 6
            },
            {
                keywords: ['log gráfico', 'visualizar branches', 'árvore de commits'],
                command: 'git log --graph --oneline --all',
                explanation: 'Mostra o histórico de commits como um gráfico ASCII, útil para visualizar como as branches se relacionam. A opção --all mostra todas as branches.',
                category: 'advanced',
                importance: 7
            },
            {
                keywords: ['comparar branches', 'diferença entre branches', 'diff branches'],
                command: 'git diff branch1..branch2',
                explanation: 'Mostra as diferenças entre duas branches. Substitua branch1 e branch2 pelos nomes das branches que deseja comparar.',
                category: 'branching',
                importance: 6
            },
            {
                keywords: ['configurar usuário', 'definir nome', 'configurar email', 'identidade git'],
                command: 'git config --global user.name "Seu Nome"',
                explanation: 'Configura seu nome de usuário global para commits. Use git config --global user.email "seu@email.com" para configurar seu email.',
                category: 'basics',
                importance: 8
            }
        ],

        // Tags organizadas por categoria
        tags: {
            basics: [
                { text: 'Iniciar repositório', icon: 'fa-play', query: 'iniciar repositório git' },
                { text: 'Clonar repositório', icon: 'fa-clone', query: 'clonar repositório' },
                { text: 'Ver status', icon: 'fa-info-circle', query: 'verificar status git' },
                { text: 'Adicionar mudanças', icon: 'fa-plus', query: 'adicionar arquivos git' },
                { text: 'Fazer commit', icon: 'fa-save', query: 'fazer commit das alterações' },
                { text: 'Ver histórico', icon: 'fa-history', query: 'ver histórico de commits' },
                { text: 'Configurar usuário', icon: 'fa-user', query: 'configurar usuário git' }
            ],
            branching: [
                { text: 'Criar branch', icon: 'fa-code-branch', query: 'criar nova branch' },
                { text: 'Mudar de branch', icon: 'fa-exchange-alt', query: 'mudar para outra branch' },
                { text: 'Listar branches', icon: 'fa-list', query: 'listar todas as branches' },
                { text: 'Fazer merge', icon: 'fa-object-group', query: 'mesclar branches' },
                { text: 'Deletar branch', icon: 'fa-trash', query: 'deletar branch' },
                { text: 'Comparar branches', icon: 'fa-exchange-alt', query: 'comparar duas branches' }
            ],
            remote: [
                { text: 'Push para GitHub', icon: 'fa-upload', query: 'enviar alterações para github' },
                { text: 'Pull de atualizações', icon: 'fa-download', query: 'baixar atualizações do remoto' },
                { text: 'Fetch remoto', icon: 'fa-cloud-download-alt', query: 'fetch mudanças sem mesclar' },
                { text: 'Adicionar remoto', icon: 'fa-link', query: 'adicionar repositório remoto' },
                { text: 'Ver remotos', icon: 'fa-server', query: 'listar repositórios remotos' }
            ],
            undoing: [
                { text: 'Desfazer commit', icon: 'fa-undo', query: 'desfazer último commit' },
                { text: 'Descartar mudanças', icon: 'fa-trash-alt', query: 'descartar alterações não salvas' },
                { text: 'Corrigir último commit', icon: 'fa-edit', query: 'modificar último commit' }
            ],
            advanced: [
                { text: 'Guardar com stash', icon: 'fa-box', query: 'salvar mudanças com stash' },
                { text: 'Criar tag de versão', icon: 'fa-tag', query: 'criar tag de versão' },
                { text: 'Rebase', icon: 'fa-stream', query: 'rebase com main' },
                { text: 'Cherry-pick', icon: 'fa-hand-pointer', query: 'aplicar commit específico' },
                { text: 'Ver reflog', icon: 'fa-clipboard-list', query: 'ver reflog' },
                { text: 'Log gráfico', icon: 'fa-project-diagram', query: 'ver log gráfico de commits' }
            ]
        }
    };

    // ===== Funções principais =====

    /**
     * Processa uma consulta de usuário e retorna o comando Git mais relevante
     * @param {string} query - A consulta do usuário
     * @returns {Object} - O comando Git correspondente
     */
    function processQuery(query) {
        if (!query || typeof query !== 'string') {
            return getFallbackResponse();
        }

        // Normaliza a consulta (remove acentos, converte para minúsculas)
        const normalizedQuery = query.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .trim();

        if (normalizedQuery.length === 0) {
            return getFallbackResponse();
        }

        // Inicializa com pontuação zero para todos os comandos
        const scoredCommands = gitKnowledgeBase.commands.map(cmd => {
            return {
                command: cmd,
                score: calculateRelevanceScore(normalizedQuery, cmd)
            };
        });

        // Ordena por pontuação e pega o melhor resultado
        scoredCommands.sort((a, b) => b.score - a.score);

        // Verifica se temos um resultado com pontuação mínima aceitável
        if (scoredCommands[0].score > 2) {
            return scoredCommands[0].command;
        }

        // Tenta encontrar correspondências parciais nas palavras-chave
        const queryWords = normalizedQuery.split(/\s+/);
        if (queryWords.length > 0) {
            const partialMatches = findPartialMatches(queryWords);
            if (partialMatches) {
                return partialMatches;
            }
        }

        // Caso não encontre correspondência boa, sugere verificar a documentação
        return getFallbackResponse();
    }

    /**
     * Calcula a pontuação de relevância de um comando para uma consulta
     * @param {string} normalizedQuery - A consulta normalizada
     * @param {Object} cmd - O comando Git a ser avaliado
     * @returns {number} - A pontuação de relevância
     */
    function calculateRelevanceScore(normalizedQuery, cmd) {
        let score = 0;
        const queryWords = normalizedQuery.split(/\s+/);

        // Verifica correspondência com palavras-chave
        cmd.keywords.forEach(keyword => {
            const normalizedKeyword = keyword.toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            // Correspondência exata com a keyword completa (maior peso)
            if (normalizedQuery === normalizedKeyword) {
                score += 20; // Correspondência perfeita tem peso muito alto
            }
            // Correspondência se contém a keyword completa
            else if (normalizedQuery.includes(normalizedKeyword)) {
                score += normalizedKeyword.length * 0.5; // Palavras-chave mais longas têm maior peso
            }

            // Pontuação baseada em palavras individuais
            const keywordWords = normalizedKeyword.split(/\s+/);

            // Verifica se todas as palavras da keyword existem na query (em qualquer ordem)
            const allWordsMatch = keywordWords.every(kw => queryWords.includes(kw));
            if (allWordsMatch && keywordWords.length > 1) {
                score += keywordWords.length * 2; // Bônus para correspondência completa de múltiplas palavras
            }

            // Pontuação para palavras individuais
            keywordWords.forEach(kw => {
                if (queryWords.includes(kw)) {
                    score += 1.5;
                }
                // Pontuação parcial para prefixos
                else {
                    queryWords.forEach(qw => {
                        if (kw.startsWith(qw) && qw.length > 2) {
                            score += 0.5;
                        }
                    });
                }
            });
        });

        // Considerar fator de importância do comando
        score *= (cmd.importance / 7); // Normaliza a importância para um multiplicador razoável

        return score;
    }

    /**
     * Procura correspondências parciais para as palavras da consulta
     * @param {Array} queryWords - Palavras da consulta
     * @returns {Object|null} - O comando correspondente ou null
     */
    function findPartialMatches(queryWords) {
        // Prioriza palavras mais longas, que tendem a ser mais específicas
        queryWords.sort((a, b) => b.length - a.length);

        for (const word of queryWords) {
            if (word.length < 3) continue; // Ignora palavras muito curtas

            // Procura comandos que tenham essa palavra em suas keywords
            for (const cmd of gitKnowledgeBase.commands) {
                for (const keyword of cmd.keywords) {
                    const normalizedKeyword = keyword.toLowerCase()
                        .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                    if (normalizedKeyword.includes(word)) {
                        return cmd;
                    }
                }
            }
        }

        return null;
    }

    /**
     * Retorna uma resposta padrão quando nenhum comando específico é encontrado
     * @returns {Object} - Resposta padrão
     */
    function getFallbackResponse() {
        return {
            command: 'git help',
            explanation: 'Não foi possível identificar um comando específico para sua consulta. Considere:\n• Verificar a documentação oficial do Git\n• Reformular sua pergunta com mais detalhes ou palavras-chave específicas\n• Usar os botões de categorias acima para encontrar o comando desejado',
            category: 'basics'
        };
    }

    /**
     * Carrega tags de comandos com base na categoria selecionada
     * @param {string} category - Categoria de comandos (padrão: 'basics')
     */
    function loadCommandTags(category = 'basics') {
        domElements.tagsContainer.innerHTML = '';  // Limpa o container

        const categoryTags = gitKnowledgeBase.tags[category] || [];

        categoryTags.forEach(tag => {
            const tagButton = document.createElement('button');
            tagButton.className = 'tag-pill px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-full text-sm text-gray-700 transition';
            tagButton.innerHTML = `<i class="fas ${tag.icon} mr-1"></i> ${tag.text}`;
            tagButton.dataset.query = tag.query;

            tagButton.addEventListener('click', function () {
                domElements.input.value = this.dataset.query;
                // Dispara o evento de submit no formulário
                domElements.form.dispatchEvent(new Event('submit'));
                // Foca o input para melhor experiência do usuário
                domElements.input.focus();
            });

            domElements.tagsContainer.appendChild(tagButton);
        });
    }

    /**
     * Salva uma consulta no histórico local
     * @param {string} query - A consulta do usuário
     * @param {string} command - O comando Git retornado
     * @param {string} explanation - A explicação do comando
     */
    function saveToHistory(query, command, explanation) {
        // Recuperar histórico existente ou iniciar um novo
        let history = JSON.parse(localStorage.getItem('gitHelperHistory')) || [];

        // Verificar se esta consulta já existe no histórico
        const existingIndex = history.findIndex(item => item.query === query);
        if (existingIndex !== -1) {
            // Se existe, remova-a para adicioná-la novamente no topo
            history.splice(existingIndex, 1);
        }

        // Adicionar novo item no início
        history.unshift({
            query: query,
            command: command,
            explanation: explanation,
            timestamp: new Date().toISOString()
        });

        // Limitar a 20 itens (aumentado de 10)
        if (history.length > 20) {
            history = history.slice(0, 20);
        }

        // Salvar de volta ao localStorage
        localStorage.setItem('gitHelperHistory', JSON.stringify(history));

        // Atualizar a UI
        loadHistory();
    }

    /**
     * Carrega o histórico de consultas salvo no localStorage
     */
    function loadHistory() {
        const history = JSON.parse(localStorage.getItem('gitHelperHistory')) || [];
        domElements.historyList.innerHTML = '';

        if (history.length === 0) {
            domElements.historyList.innerHTML = `
                <div class="text-gray-500 text-sm italic text-center py-4">
                    Seu histórico de comandos aparecerá aqui
                </div>
            `;
            return;
        }

        history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item p-2 rounded hover:bg-gray-100 cursor-pointer border-b border-gray-100 transition';

            // Formatar a timestamp de forma amigável
            const date = new Date(item.timestamp);
            const formattedDate = formatRelativeTime(date);

            historyItem.innerHTML = `
                <div class="flex justify-between items-start">
                    <div class="font-medium text-sm text-gray-700">${escapeHTML(item.query)}</div>
                    <div class="text-xs text-gray-400">${formattedDate}</div>
                </div>
                <div class="text-xs text-red-600 font-mono mt-1">${escapeHTML(item.command)}</div>
            `;

            historyItem.addEventListener('click', function () {
                // Restaurar este comando
                domElements.commandResult.textContent = item.command;
                domElements.commandExplanation.textContent = item.explanation;
                domElements.resultSection.classList.remove('hidden');
                domElements.input.value = item.query;

                // Rolar até o resultado
                domElements.resultSection.scrollIntoView({ behavior: 'smooth' });
            });

            domElements.historyList.appendChild(historyItem);
        });
    }

    /**
     * Formata uma data como tempo relativo
     * @param {Date} date - A data a ser formatada
     * @returns {string} - Texto representando o tempo relativo
     */
    function formatRelativeTime(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);

        if (diffDay > 0) {
            return diffDay === 1 ? 'Ontem' : `${diffDay} dias atrás`;
        } else if (diffHour > 0) {
            return `${diffHour}h atrás`;
        } else if (diffMin > 0) {
            return `${diffMin}m atrás`;
        } else {
            return 'Agora mesmo';
        }
    }

    /**
     * Escapa caracteres HTML para prevenção de XSS
     * @param {string} text - O texto a ser escapado
     * @returns {string} - Texto com caracteres especiais HTML escapados
     */
    function escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Exibe resposta de feedback ao usuário
     * @param {boolean} wasHelpful - Se o comando foi útil ou não
     */
    /**
     * Exibe resposta de feedback ao usuário e restaura após um tempo
     * @param {boolean} wasHelpful - Se o comando foi útil ou não
     */
    function showFeedbackResponse(wasHelpful) {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'p-3 mt-3 rounded-md animate__animated animate__fadeIn';

        if (wasHelpful) {
            feedbackDiv.classList.add('bg-green-100', 'text-green-800');
            feedbackDiv.innerHTML = '<i class="fas fa-check-circle mr-2"></i> Ótimo! Obrigado pelo feedback. Isso nos ajuda a melhorar.';
        } else {
            feedbackDiv.classList.add('bg-blue-100', 'text-blue-800');
            feedbackDiv.innerHTML = '<i class="fas fa-info-circle mr-2"></i> Obrigado! Tente reformular sua pergunta ou use os botões de categorias acima para encontrar o comando desejado.';
        }

        const feedbackContainer = domElements.feedbackYes.parentElement.parentElement;

        // Armazenar o conteúdo HTML original antes de substituir
        if (!feedbackContainer.dataset.originalHtml) {
            feedbackContainer.dataset.originalHtml = feedbackContainer.innerHTML;
        }

        // Substituir o conteúdo
        feedbackContainer.innerHTML = '';
        feedbackContainer.appendChild(feedbackDiv);

        // Restaura o formulário de feedback original após 5 segundos
        setTimeout(() => {
            // Restaurar o HTML original do container de feedback
            feedbackContainer.innerHTML = feedbackContainer.dataset.originalHtml;

            // Atualizar as referências dos elementos nos domElements
            domElements.feedbackYes = document.getElementById('feedbackYes');
            domElements.feedbackNo = document.getElementById('feedbackNo');

            // Reconectar event listeners
            domElements.feedbackYes.addEventListener('click', function () {
                showFeedbackResponse(true);
            });

            domElements.feedbackNo.addEventListener('click', function () {
                showFeedbackResponse(false);
            });
        }, 6000); // 6 segundos
    }

    /**
     * Copia texto para a área de transferência
     * @param {string} text - Texto a ser copiado
     * @returns {Promise} - Promise que se resolve quando o texto é copiado
     */
    function copyToClipboard(text) {
        // Usa a API moderna de clipboard quando disponível
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        } else {
            // Fallback para método mais antigo
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            return new Promise((resolve, reject) => {
                try {
                    const successful = document.execCommand('copy');
                    if (!successful) {
                        reject('Não foi possível copiar o texto');
                    }
                    document.body.removeChild(textArea);
                    resolve();
                } catch (err) {
                    document.body.removeChild(textArea);
                    reject(err);
                }
            });
        }
    }

    /**
     * Atualiza o estado dos botões de categoria
     * @param {HTMLElement} activeButton - O botão ativo
     */
    function updateCategoryButtons(activeButton) {
        domElements.categoryButtons.forEach(btn => {
            btn.classList.remove('bg-red-100', 'text-red-700', 'text-orange-500');
            btn.classList.add('bg-gray-200', 'text-gray-700');
        });

        activeButton.classList.remove('bg-gray-200', 'text-gray-700');
        activeButton.classList.add('bg-red-100', 'text-orange-500');
    }

    /**
     * Adiciona efeito de destaque em uma entrada de texto (usado para animação pós-cópia)
     * @param {HTMLElement} element - O elemento a animar
     */
    function animateHighlight(element) {
        element.classList.add('highlight-animation');
        setTimeout(() => {
            element.classList.remove('highlight-animation');
        }, 1000);
    }

    // ===== Event Listeners =====

    // Submissão do formulário
    domElements.form.addEventListener('submit', function (e) {
        e.preventDefault();

        const query = domElements.input.value.trim();
        if (!query) return;

        // Mostrar loading state
        domElements.loadingSection.classList.remove('hidden');
        domElements.resultSection.classList.add('hidden');

        // Simular uma pequena latência para dar uma sensação mais natural
        setTimeout(() => {
            try {
                // Processar a consulta
                const result = processQuery(query);

                // Atualizar UI
                domElements.commandResult.textContent = result.command;
                domElements.commandExplanation.textContent = result.explanation;

                // Salvar no histórico
                saveToHistory(query, result.command, result.explanation);

                // Destacar visualmente a categoria do comando encontrado
                domElements.categoryButtons.forEach(btn => {
                    if (btn.dataset.category === result.category) {
                        updateCategoryButtons(btn);
                        loadCommandTags(result.category);
                    }
                });

                // Esconder loading, mostrar resultado
                domElements.loadingSection.classList.add('hidden');
                domElements.resultSection.classList.remove('hidden');

                // Tornar o resultado visível na tela
                domElements.resultSection.scrollIntoView({ behavior: 'smooth' });
            } catch (error) {
                console.error('Error:', error);
                domElements.loadingSection.classList.add('hidden');
                alert('Houve um erro ao processar sua solicitação. Por favor, tente novamente.');
            }
        }, 600); // Delay de 600ms para feedback visual
    });

    // Seleção de categoria
    domElements.categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            updateCategoryButtons(this);
            loadCommandTags(this.dataset.category);
        });
    });

    // Funcionalidade do botão de copiar
    domElements.copyButton.addEventListener('click', function () {
        const textToCopy = domElements.commandResult.textContent;

        copyToClipboard(textToCopy)
            .then(() => {
                // Feedback visual para cópia
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                animateHighlight(domElements.commandResult);

                setTimeout(() => {
                    copyButton.innerHTML = '<i class="far fa-copy"></i>';
                }, 2000);
            })
            .catch(err => {
                console.error('Erro ao copiar:', err);
                alert('Não foi possível copiar o texto. Por favor, tente novamente.');
            });
    });

    // Adicionar funcionalidade aos botões de feedback
    domElements.feedbackYes.addEventListener('click', function () {
        showFeedbackResponse(true);
    });

    domElements.feedbackNo.addEventListener('click', function () {
        showFeedbackResponse(false);
    });

    // Detecção de "Enter" no campo de entrada
    domElements.input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            domElements.form.dispatchEvent(new Event('submit'));
        }
    });

    // Sugestões enquanto digita (autocomplete simples)
    domElements.input.addEventListener('input', function () {
        const query = this.value.trim().toLowerCase();

        // Só mostrar sugestões se tiver pelo menos 3 caracteres
        if (query.length >= 3) {
            // Encontrar todas as keywords que começam com a consulta atual
            const possibleCommands = gitKnowledgeBase.commands
                .filter(cmd => {
                    return cmd.keywords.some(keyword =>
                        keyword.toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .includes(query.normalize("NFD").replace(/[\u0300-\u036f]/g, "")));
                })
                .slice(0, 3); // Limita a 3 sugestões

            // TODO: Implementar um dropdown de sugestões se desejar essa funcionalidade
        }
    });

    // ===== Inicialização =====

    // Verificar se há suporte a localStorage
    function checkLocalStorage() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
        } catch (e) {
            return false;
        }
    }

    // Inicialização do app
    function init() {
        // Carregar tags da categoria básica por padrão
        loadCommandTags('basics');

        // Carregar o histórico salvo, se disponível
        if (checkLocalStorage()) {
            loadHistory();
        } else {
            console.warn('LocalStorage não está disponível. O histórico não será salvo.');
        }

        // Adicionar classe CSS para animações
        document.body.classList.add('js-loaded');
    }

    // Iniciar o aplicativo
    init();
});