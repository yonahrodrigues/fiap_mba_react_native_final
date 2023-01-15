# FIAP MBA Mobile - Trabalho Final - React Native

Olá, seja bem-vindo a entrega final do Aula Aplicações Nativas Cross-Platform com React Native.

Você terá de desenvolver um aplicativo React Native que irá listar os produtos de uma loja.

**Principais instruções**

- Após o login, o usuário poderá visualizar os detalhes de cada produto e saber quais as lojas eles estão disponíveis.
- Também será possível favoritar o produto e ver uma página com os produtos favoritos.
- Ao realizar o refresh do navegador, a aplicação deverá permanecer logada.
  > **Dica:** Em todas as APIs você deve usar a URL: **https://fiap-reactjs-presencial.herokuapp.com**.

# Telas

## Tela de login

- Tela com e-mail e senha para autenticar o usuário
- Abaixo aparecerá um botão de realizar cadastro
- Você utilizará a **API MBA Presencial - Trabalho Final - Realiza o login do usuário /storeProducts/login**
- Utilizar o Yup para realizar a validação

## Tela de cadastro

- Tela com nome, telefone, e-mail e senha para cadastrar o usuário
- Você utilizará a **API MBA Presencial - Trabalho Final - Realiza o cadastro do usuário /storeProducts/signup**
- Utilizar o Yup para realizar a validação

## Menu Lateral

- Em todas as telas principais (1a tela do Stack), deverá aparecer um menu lateral com as opções:
  - Nome do usuário
  - Principal (Tela de produtos)
  - favoritos (Tela de favoritos)
  - Botão de logout

## Tela de produtos

- Tela que exibirá em uma lista os dados dos produtos
- Cada item deverá mostrar: Nome do Produto, Preço do Produto, Favorito e um botão de visualizar detalhe (Ir a tela **Detalhe do produto**).
- Esse ListView utilizará a paginação de resultados.
- Você utilizará a **API MBA Presencial - Trabalho Final - Busca todos os produtos /storeProducts/**
- Ao carregar a tela, deverá buscar a posição do usuário.

## Tela de favoritos

- Tela exibirá os produtos determinados como favoritos dos usuários.
- A tabela deverá mostrar: Nome do Produto, Preço do Produto, Favorito e um botão de visualizar detalhe (Ir a tela **Detalhe do produto**).
- Você utilizará a **API MBA Presencial - Trabalho Final - Busca todos os produtos favoritos /storeProducts/getFavProduts**

## Tela detalhe do produto

- Tela que exibirá os detalhes de um produto.
- A tela deverá mostrar:
  - Nome do Produto
  - Preço do Produto
  - Se é Favorito do usuário (e um botão para marcar/desmarcar favorito)
  - Mapa com a posição do usuário e as lojas com o produto disponível
- Você utilizará a **API MBA Presencial - Trabalho Final - Busca informação de um produto /storeProducts/product/:productID** e **API MBA Presencial - Trabalho Final - Adicionar ou remove um produto como favorito da pessoa /storeProducts/manageFavorite**

# Doc das APIs

A documentação das APIs está disponível em: **https://fiap-reactjs-presencial.herokuapp.com/doc**

# Comandos

## criando template

- expo init mba_fiap_react_native_final

## iniciando app

To run your project, navigate to the directory and run one of the following yarn commands.

- cd mba_fiap_react_native_final
- yarn start # you can open iOS, Android, or web from here, or run them directly with the commands below.
- yarn android
- yarn ios
- yarn web
- expo start -c to clear the cache

## packages commands:

```
- yarn add axios@0.27.2 babel-plugin-inline-dotenv
- yarn add styled-components
- yarn add --dev @types/styled-components @types/styled-components-react-native
- yarn add @react-navigation/native @react-navigation/stack @react-navigation/drawer @react-navigation/bottom-tabs
- expo install react-native-screens react-native-gesture-handler react-native-reanimated
- yarn add @react-native-async-storage/async-storage
- yarn add react-native-elements
- expo install react-native-safe-area-context
- yarn add @reduxjs/toolkit react-redux redux-thunk redux-persist @react-native-async-storage/async-storage
- yarn add react-native-paper
- expo install expo-location
- expo install react-native-reanimated

```

> Config

```
  -- add plugins: ['react-native-reanimated/plugin', 'inline-dotenv'], in babel.config.js
  -- plugins: ['react-native-reanimated/plugin'], in babel.config.js
  -- "entryPoint": "./src/Routes/RouteController",
"jsEngine": "hermes", in app.json add entrypoint and hermes for debug
```

> Referencias:


- [repository git class](https://github.com/joserrodrigues/fiap_mba_prs_ts_rn_v2)

- [doc API](https://fiap-reactjs-presencial.herokuapp.com/doc)

- [notion 1](https://joserubensrodrigues.notion.site/Aula-1-Introdu-o-ao-React-bba5d9fe08c5436da07a5f673b38332c)

- [notion 2a](https://joserubensrodrigues.notion.site/Aula-2-Layouts-React-Navigation-255cc28327634cdab9e85c957bf49f19)

- [notion 2b](https://joserubensrodrigues.notion.site/Aula-2-Layouts-React-Navigator-Parte-B-c50121c00b634eb78dce16ccf4daf74e)


- [notion 3a](https://joserubensrodrigues.notion.site/Aula-3-Flat-List-f7b2acc496d34e8c8410909e375c0b38)

- [notion 3b](https://joserubensrodrigues.notion.site/Aula-3-Notification-Jest-1c1dde68bef5466eb8d7f9d55e21a492)

- [notion 4](https://joserubensrodrigues.notion.site/Aula-4-Redux-Toolkit-Login-222918b548d0421ab002962d8ddb2703)

- [formatting MD Sintaxe](https://docs.github.com/pt/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

- [expo location docs](https://docs.expo.dev/versions/latest/sdk/location/)

- [stackoverflow#1](https://stackoverflow.com/questions/74428450/error-invariant-violation-failed-to-call-into-javascript-module-method-appregis)

- [redux medium](https://medium.com/reactbrasil/iniciando-com-redux-c14ca7b7dcf)




> Objetivos:

```
- [x] Deve listar produtos da Loja
- [-] Deve permitir registro
- [] Deve persistir login após o reflesh do app
- [-] Apos o Login deve permitir visualizar detalhes de cada produto e em quais lojas esta disponível
- [] Deve permitir favoritar o produto
- [] Deve listar os produtos Favoritos de um usuário
- [-] Tela Login com campo email e senha e botão pra cadastro
- [-] Tela Cadastro com nome, telefone, email e senha
- [] Utilizar Yup pra validar campos Login e Cadastro
- [x] Tela de Produtos deve exibir campos:
     - Nome, preço, Favorito e botão detalhe
- [] Tela de Produtos deve utilizar ListView com paginação
- [] Tela de Produtos ao iniciar deve carregar a geolocalização do usuário
- [-] Tela de Favoritos deve exibir campos:
     - Nome, preço, Favorito e botão detalhe
- [-] Tela de Detalhe deve exibir:
     - Nome, preço, botão se é favoritado, mapa com a posição do usuário e as lojas onde está disponível
- [] Menu Lateral em todas as telas principais com as seguintes opções:
    - nome do usuário
    - Principal (tela Produtos)
    - Favoritos (tela de Favoritos)
    - Botão de Logout

- [] Trabalho concluído e requisitos atendidos. :)
```
