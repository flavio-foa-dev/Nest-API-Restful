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
 - npm i --save class-validator class-transformer
 - npm install class-validator class-transformer

```
app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
 );

 export class CriaUsuarioDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  email: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  senha: string;
}

@Post()
 async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    this.usuarioRepository.salvar(dadosDoUsuario);
    return dadosDoUsuario;
 }
```

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

### Para validar produtos, precisamos quebrar o problema dessa validação em partes. Primeiro, vamos relembrar como é o JSON que precisamos enviar para cadastrar um produto:

```
{
    "nome": "Figura de ação Marvel Homem Aranha Olympus Homem Aranha E6358 de Hasbro Classic",
    "valor": 70.0,
    "quantidadeDisponivel": 10,
    "descricao": "Produto novo, bem acabado, alegria para colecionadores",
    "caracteristicas": [{
        "nome": "Fabricante",
        "descricao": "Iron Studios"
    },{
        "nome": "material",
        "descricao": "Plástico"
    }],
    "imagens": [{
        "url": "https://i.imgur.com/dwDZICq.jpg",
        "descricao": "Imagem do Homem Aranha"
    }],
    "categoria": "Colecionáveis",
    "dataCriacao": "2022-10-12T14:22:53.496Z",
    "dataAtualizacao": "2022-10-12T14:22:53.496Z"
}

```
Claramente, podemos quebrar esse JSON em algumas partes. Podemos observar que qualquer chave do JSON que tem uma lista como valor pode ser representada como uma classe diferente. Um exemplo seria as características de um produto que possuem, por enquanto, o nome do fabricante e o material do qual é feito o produto. Poderíamos separar isso em uma classe:

```
export class CaracteristicaProdutoDTO {
  nome: string;
  descricao: string;
}
```

A mesma ideia é válida para a validação das Imagens do produto. Isso nos geraria uma classe CriaProdutoDTO parecida com a que se encontra abaixo:

```
export class CriaProdutoDTO {
  nome: string;
  valor: number;
  quantidade: number;
  descricao: string;
  caracteristicas: CaracteristicaProdutoDTO[];
  imagens: ImagemProdutoDTO[];
  categoria: string;
}
```

A pergunta que fica é: como fazer o pipe validar um atributo que na verdade é uma lista de objetos de outra classe que também possui suas próprias validações? O class-validator nos ajuda nisso também.

Primeiro, precisamos validar que deve ser uma lista, ou melhor, um array. Para isso temos o decorator @IsArray(). Segundo, precisamos dizer para o class-validator que ele deve validar o objeto que está sendo referenciado pelo atributo, ou seja, precisa fazer a validação aninhada ao atributo validado, para isso usaremos o decorator @ValidateNested().

E, por último, precisamos informar o tipo do objeto ao qual o atributo faz referência, para transformar o objeto do atributo no tipo correto e para isso usaremos o decorator @Type() que por parâmetro espera uma função que retorne o tipo ao que o atributo está se referindo.

Juntando tudo, teremos uma validação que segue o seguinte formato para as características do produto:

```
@ValidateNested()
@IsArray()
@Type(() => CaracteristicaProdutoDTO)
caracteristicas: CaracteristicaProdutoDTO[];
```

Com isso em mente, crie a validação de criação de produtos. Elas precisam atender aos critérios abaixo:

O nome do produto não pode ser vazio;
O valor do produto precisa ser um número positivo (não pode ser zero) e ter até duas casas decimais;
A quantidade precisa ser um número igual ou maior que zero;
A descrição não pode ser vazia ou maior que 1000 caracteres;
A lista de características do produto precisa ter pelo menos 3 itens;
A lista de imagens do produto precisa ter pelo menos 1 item;
A categoria do produto não pode ser vazia.
[dOCUMENTACAO](https://github.com/typestack/class-validator#validation-decorators)