# Wishlist Application

## Descrição

Este é um projeto de uma aplicação de **Wishlist** que permite aos usuários visualizar e adicionar produtos a uma lista de desejos. A aplicação é desenvolvida utilizando Vue.js e TypeScript e se comunica com uma API para buscar os produtos e salvar a wishlist no armazenamento local (localStorage). 

## Funcionalidades

- Exibição de produtos com preço, imagem e avaliações.
- Adição e remoção de produtos da Wishlist.
- Armazenamento da Wishlist localmente utilizando o **localStorage**.
- Skeleton Loader durante o carregamento de produtos para uma melhor experiência de usuário.
- Responsivo para diferentes dispositivos, exibindo os produtos em diferentes layouts (grid em desktop, stack em mobile).

## Tecnologias Utilizadas

- **Vue.js 3**: Framework JavaScript para construir a interface do usuário.
- **TypeScript**: Linguagem para adicionar tipos ao JavaScript, aumentando a segurança e previsibilidade do código.
- **Axios**: Biblioteca HTTP para realizar chamadas à API.
- **Heroicons**: Ícones SVG para melhorar a interface visual.
- **Vitest**: Framework de testes para garantir a qualidade do código.

## Pré-requisitos

Antes de começar, você vai precisar ter o [Node.js](https://nodejs.org/) e o [npm](https://www.npmjs.com/) instalados na sua máquina. Você também pode usar o [yarn](https://yarnpkg.com/) como gerenciador de pacotes, se preferir.

## Instalação

1. Clone o repositório para a sua máquina local:

   ```bash
    cd nome-do-repositorio
    npm install
    yarn install

## Estrutura do Projeto

```bash
  ├── public
  │   └── assets
  ├── src
  │   ├── components        # Componentes reutilizáveis, como ProductCard, SkeletonLoader, etc.
  │   ├── services          # Serviços que fazem a comunicação com a API e manipulação de localStorage
  │   ├── types             # Definição de tipos e interfaces do TypeScript
  │   ├── views             # Páginas principais da aplicação, como ProductsPage e WishlistPage
  │   └── App.vue           # Componente raiz
  ├── tests                 # Testes unitários e de integração
  ├── package.json          # Configurações e dependências do projeto
  └── README.md             # Instruções do projeto
```

## Endpoints Utilizados

A aplicação consome dados de uma API externa hospedada no Render, com os seguintes endpoints:

### GET /products
Retorna a lista de produtos que será exibida na aplicação.

## Instruções de Uso

### Página de Produtos
A página principal da aplicação exibe uma lista de produtos que são carregados da API. Cada produto exibe:

- Imagem do produto
- Nome
- Preço cheio e preço promocional
- Avaliação do produto
- Botão de "favoritar" para adicionar o produto à Wishlist

Os produtos são exibidos em um layout de grid com 4 colunas em telas grandes, e o layout é ajustado automaticamente para telas menores.

### Página da Wishlist
Na página Wishlist, o usuário pode visualizar todos os produtos que foram adicionados à lista de desejos. Os produtos são armazenados no `localStorage` e podem ser adicionados ou removidos a qualquer momento.

### Skeleton Loader
Para melhorar a experiência do usuário durante o carregamento dos produtos, a aplicação exibe um Skeleton Loader (esqueleto de carregamento) que simula o layout final dos produtos, mantendo a aparência visual enquanto os dados reais ainda estão sendo carregados.

## Melhorias Futuras

Algumas ideias para melhorias no projeto:

- Implementar login para que o usuário possa salvar a wishlist em um banco de dados remoto.
- Adicionar funcionalidade para filtrar produtos por categoria ou faixa de preço.
- Implementar notificações com toast para melhorar o feedback ao adicionar/remover itens da wishlist.




