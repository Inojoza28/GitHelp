# GitHelp - Seu Assistente Inteligente de Comandos Git 🇧🇷

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-2.0-orange)
![Status](https://img.shields.io/badge/status-active-brightgreen)

![GitHelp Logo](img/logo-githelp.png)

👉 [Experimente Agora](https://githelp.com.br) 

## 📋 Sobre o Projeto

O GitHelp é uma aplicação web interativa projetada para simplificar o uso do Git através de uma interface amigável em português. Desenvolvido para atender tanto iniciantes quanto usuários avançados, o GitHelp permite que você obtenha comandos Git precisos a partir de descrições em linguagem natural, eliminando a necessidade de memorizar sintaxes complexas.

A aplicação oferece um assistente de comandos que traduz suas necessidades em instruções Git, tutoriais interativos para diferentes níveis de conhecimento, e uma interface moderna com suporte a tema claro/escuro para melhorar a experiência do usuário.

## ✨ Funcionalidades Principais

### 🔍 Assistente de Comandos Git em Português

Digite em português o que você precisa fazer (ex: "quero mandar tudo pro GitHub" ou "desfazer commit") e receba instantaneamente o comando Git correto com uma explicação detalhada sobre seu funcionamento.

### 📚 Tutoriais Interativos

Aprenda Git passo a passo com tutoriais interativos divididos por nível de complexidade:
- **Primeiros Passos com Git**: Conceitos básicos para iniciantes
- **Trabalhando com Branches**: Criação e gerenciamento de branches
- **Colaboração com Git e GitHub**: Comandos essenciais para trabalho em equipe
- **Técnicas Avançadas de Git**: Recursos poderosos para usuários experientes
- **Resolvendo Problemas Comuns**: Soluções para situações difíceis

### 🌓 Alternância de Tema (Claro/Escuro)

Alterne facilmente entre os temas claro e escuro para melhorar a legibilidade e reduzir o cansaço visual, especialmente durante sessões noturnas de programação.

### ⌨️ Atalhos de Teclado

Aumente sua produtividade com atalhos de teclado integrados:
- **Alt + T**: Alterna entre os temas claro e escuro

### 📋 Categorização de Comandos

Navegue por comandos Git organizados em categorias intuitivas:
- **Básicos**: Comandos essenciais para o dia a dia
- **Branches**: Gerenciamento de ramificações
- **Remoto**: Interação com repositórios remotos
- **Desfazer**: Comandos para reverter ações
- **Avançado**: Recursos para usuários experientes

### 📱 Design Responsivo

Interface adaptável que funciona perfeitamente em dispositivos móveis, tablets e desktops.

## 🛠️ Tecnologias Utilizadas

 ![Tecnologias](https://skillicons.dev/icons?i=html,css,tailwind,js,git,github,vscode)

## 📥 Instalação e Uso

### Requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexão com internet (para carregar as dependências externas)

### Instalação Local

1. Clone este repositório:
   ```bash
   git clone https://github.com/inojoza28/githelp.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd githelp
   ```

3. Abra o arquivo `index.html` em seu navegador:
   ```bash
   # No Linux
   xdg-open index.html
   
   # No macOS
   open index.html
   
   # No Windows
   start index.html
   ```

## 📚 Base de Conhecimento

O GitHelp possui uma extensa base de comandos com mais de 50 operações mapeadas, incluindo:

| Categoria        | Comandos Principais                          |
|------------------|-----------------------------------------------|
| Básicos          | `init`, `clone`, `status`, `add`, `commit`    |
| Branches         | `branch`, `checkout`, `merge`, `rebase`       |
| Remotos          | `push`, `pull`, `remote`, `fetch`             |
| Desfazer         | `reset`, `revert`, `checkout --`, `clean`     |
| Avançados        | `stash`, `tag`, `bisect`, `submodule`         |

## 🌟 Destaques Técnicos

- **Algoritmo de Busca**:
  - Sistema de pontuação por relevância
  - Normalização de termos em português
  - Priorização de comandos mais usados

- **Performance**:
  - Carregamento instantâneo
  - Armazenamento local eficiente
  - Zero dependências externas

- **Acessibilidade**:
  - Navegação por teclado
  - Contrastes WCAG AA
  - Semântica HTML5

### Uso Online

Acesse a versão online do GitHelp em: [https://githelp.com.br](https://githelp.com.br)

## 🧩 Estrutura do Projeto

```
githelp/
├── index.html              # Página principal
├── css/
│   ├── styles.css          # Estilos principais
│   └── darkmode.css        # Estilos específicos para o tema escuro
├── js/
│   ├── main.js             # Lógica principal e base de conhecimento
│   ├── tutorial.js         # Funcionalidade de tutoriais interativos
│   ├── keyboard.js         # Menu e atalhos de teclado
│   └── theme.js            # Alternância de tema claro/escuro
└── img/
    └── logo-githelp.png    # Logo do projeto
```

## 🔍 Como Usar

### Assistente de Comandos

1. Digite na caixa de pesquisa o que você deseja fazer com Git em português simples
2. Clique no botão de busca ou pressione Enter
3. Visualize o comando sugerido e sua explicação detalhada
4. Use o botão de cópia para copiar o comando para a área de transferência
5. Forneça feedback sobre a utilidade do comando sugerido

### Tutoriais Interativos

1. Selecione um dos tutoriais disponíveis na seção "Tutoriais básicos"
2. Navegue pelos passos do tutorial usando os botões de navegação
3. Copie os comandos de exemplo para praticar em seu próprio ambiente
4. Feche o tutorial quando terminar ou minimize para continuar explorando

### Alternância de Tema

Para alternar entre os temas claro e escuro, você pode:
- Clicar no botão de tema no canto superior direito da página
- Usar o atalho de teclado `Alt + T`

## 🌟 Diferenciais do Projeto

- **Interface em Português**: Facilita o aprendizado para falantes de português
- **Explicações Detalhadas**: Cada comando vem com uma explicação clara sobre seu funcionamento
- **Tutoriais Progressivos**: Aprenda Git de forma estruturada, do básico ao avançado
- **Design Moderno**: Interface limpa e agradável com animações sutis
- **Acessibilidade**: Suporte a tema escuro e atalhos de teclado
- **Base de Conhecimento Abrangente**: Cobre desde comandos básicos até técnicas avançadas


## ✉️ Contato

**Gabriel Inojoza**  
- Instagram: [@dev_inojoza_](https://www.instagram.com/dev_inojoza_/)
- LinkedIn: [gabrielinojoza](https://www.linkedin.com/in/gabrielinojoza/)
- Email: carlosginojoza@gmail.com

## 👨‍💻 Autor

Desenvolvido por [Gabriel Inojoza](https://github.com/inojoza28)


**Feito com ❤️ para a comunidade de desenvolvedores brasileiros!** 🚀
---

<p align="center">
  <img src="img/logo-githelp.png" alt="GitHelp Logo" width="60">
  <br>
  <em>Transforme dúvidas em domínio — domine o Git com facilidade.</em>
</p>
