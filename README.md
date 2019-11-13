# eng-zap-challenge-nodejs

## Environment (Ambiente)

Developed on a simple container with:

::

Desenvolvido em uma máquina simples com:


npm version: 6.13.0
nodejs version: 12.13.0

## How to run (Como executar)

First, this is the link to the Postman Collection with endpoint produced, download it and import into Postman App: https://www.getpostman.com/collections/6a483596df4f1161d0dd

**The API has the prefix /api**
**The full endpoint is http://localhost:3000/api/realty/**

Into a machine (or container) with nodejs and npm configured, **rename the file .env.example** (yeah, there is a URL), now, just execute `npm install` and `npm start`;

:::

Primeiro, este é o link para a Coleção do Postman com o endpoint produzido, baixe e importe no Postman App: https://www.getpostman.com/collections/6a483596df4f1161d0dd

**A API tem um prefixo /api**
**O endpoint completo é http://localhost:3000/api/realty/**

Em uma máquina (ou container) com nodejs e npm configurados, renomei o arquivo **.env.example** (sim, lá tem uma URL), agora, execute os comandos `npm install` e `npm start`;



## How it works (Como isso funciona)

This project uses express framework to manipulate requests and routes, filesystem module to save the data source after requests at the first time with axios library, the dotenv package to read the .env file and nodemon to maintain it running...

PS.: There is some console.log left behind just to you follow the thing. :)

::

Este projeto utiliza o express framework para manipular as requisições e preparar as rotas da API, o módulo filesystem para salvar os dados depois de serem buscados utilizando a biblioteca axios, o pacote dotenv para ler o arquivo .env e o nodemon para manter o projeto rodando.

Obs.: Deixei alguns console.log para trás para facilitar o acompanhamento das coisas.
