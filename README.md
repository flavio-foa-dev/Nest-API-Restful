<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).


## Command
 - npm i -g @nestjs/cli
 - nest new project-"NOME"
 - npx @nestjs/cli new "NOME"

###
  O Nest possui  decorators para capturar dados a partir de uma requisição, inclusive o @Body tem outros usos. Se precisarmos, por exemplo, capturar só uma parte de um objeto que foi enviado no body podemos passar o nome da chave desta parte do objeto e o Nest captura apenas este valor. Vejamos o objeto abaixo:

```
{
    numeroPedido: 23123
    produtos: [
        {
          nome: "camiseta nerd 2077",
          preco: 24.90
        }
    ]
}
```
Se quiséssemos capturar apenas a lista de produtos, poderíamos fazer @Body('produtos') e o Nest nos daria apenas os produtos ignorando o restante dos valores no objeto. Temos outros dois decoratos que se comportam de forma parecida com o @Body. Eles são o @Query e o @Param, o primeiro lida com query parameters e o segundo com parâmetros dinâmicos na URL. Veremos mais sobre estes outros durante nossos estudos.