

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
 - npm install @nestjs/typeorm typeorm
 - npm install @nestjs/config
 - npm install pg --save
 - pm instal dotenv
 - typeorm-ts-node-esm -d src/db/dataSource.cli.ts migration:show
 - migration:generate caminho-da-migracao/adiciona-coluna-genero-em-filmes
 - npm i --save bcrypt
 - cache-manager-redis-yet
 - npm i @nestjs/jwt
 migration:run.
 npm install -g @nestjs/cli
 nest generate resource <entity>
 npm i -g typeorm
 nest generate guard `auth``

- app.module, no array de imports:
```
     CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({ ttl: 10 * 1000 }),
      }),
      isGlobal: true,
    }),

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
```
 Note que essa não é a forma convencional de importar módulos. Em vez disso, estamos utilizando métodos estáticos como registerAsync, forRoot e forRootAsync, além de passar configurações para esses métodos.

### Module
Ao realizar a integração com o Redis, utilizamos algumas sintaxes específicas do Nest. Mas como isso funciona “por baixo dos panos”?

Vamos relembrar o código que inserimos em app.module, no array de imports:

    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({ ttl: 10 * 1000 }),
      }),
      isGlobal: true,
    }),
COPIAR CÓDIGO
Além disso, nesse mesmo array imports, também temos mais alguns módulos com as seguintes sintaxes:

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
COPIAR CÓDIGO
Note que essa não é a forma convencional de importar módulos. Em vez disso, estamos utilizando métodos estáticos como registerAsync, forRoot e forRootAsync, além de passar configurações para esses métodos. Vamos entender melhor essa sintaxe?

Módulos estáticos e dinâmicos
Um módulo no Nest nada mais é que uma classe com o decorator @Module. Podemos chamar os módulos “normais” que conhecemos como módulos estáticos, como o UsuarioModule e o ProdutoModule. Para que um outro módulo possa importá-los, basta adicioná-los no array imports do decorator @Module, como fizemos em AppModule.

Contudo, o que está acontecendo quando adicionamos uma importação como CacheModule.registerAsync({ ...opções })? Por baixo dos panos, CacheModule é um módulo muito semelhante aos módulos estáticos que conhecemos, mas podemos notar que ele possui um método estático registerAsync. Nesta aula, também chegamos a utilizar um método register, também disponível nesse módulo, antes de fazermos a integração com o Redis.

No VSCode, se você passar o cursor por cima de qualquer um dos métodos registerAsync, forRoot ou forRootAsync, poderá notar que todos eles retornam uma classe chamada DynamicModule. Em outras palavras, os módulos que aplicam esses métodos podem ser chamados de módulos dinâmicos.

Qual a diferença entre um módulo estático e um módulo dinâmico?
Em um módulo dinâmico, podemos passar configurações específicas no momento de importá-lo. Por exemplo, no método registerAsync do CacheModule, passamos configurações como a store a ser utilizada e o TTL padrão dos dados que serão guardados em cache.

Ao fazer isso, os serviços internos do módulo dinâmico poderão utilizar essas informações que passamos. A principal vantagem é que não precisamos repetidamente definir essas informações sempre que formos utilizar os serviços de um módulo dinâmico, como o CacheModule.

Se CacheModule não fosse um módulo dinâmico, não conseguiríamos migrar tão facilmente o cache nativo do Nest para o Redis. Note que, quando fizemos essa migração, alteramos somente as configurações de importação do módulo dinâmico e não foi necessário alterar nada do código do controlador de produtos.

Isso porque o CacheModule possui justamente o papel de abstrair o mecanismo de cache sendo utilizado na aplicação, facilitando seu uso em outros módulos. Assim, sempre que precisarmos alterar a ferramenta de cache ou configurações específicas, como o TTL padrão, precisamos modificar apenas as configurações na importação dinâmica do CacheModule.

Em produto.controller, por exemplo, utilizamos o CacheInterceptor. Esse interceptor, por sua vez, utiliza os serviços de CacheModule por baixo dos panos, mais especificamente o serviço gerenciador de cache. No desafio Otimizando a listagem de um produto, em vez de utilizar o interceptor, utilizamos diretamente o gerenciador, o injetando no construtor do controlador de produtos, com o seguinte código:

@Inject(CACHE_MANAGER) private gerenciadorDeCache: Cache,
COPIAR CÓDIGO
O token CACHE_MANAGER faz referência ao gerenciador de cache (um dos serviços disponibilizados por CacheModule), e com esse código estamos pedindo para o Nest injetar esse serviço no controlador. Como o CacheModule foi configurado dinamicamente nas importações de ProdutoModule, o serviço já virá com informações definidas por padrão, como a store do Redis e o TTL padrão!

Além disso, você terá a oportunidade de explorar melhor essa sintaxe de injeção em uma atividade futura, quando falarmos sobre provedores personalizados :)

Também podemos definir informações diferentes dependendo de onde vamos importar o módulo dinâmico. Diferentes módulos que importarem o CacheModule poderão definir um TTL padrão diferente ou até mesmo uma store diferente. É exatamente por isso que eles são chamados de módulos dinâmicos: eles podem ser configurados dinamicamente no momento da importação, passando informações específicas para uso interno nos seus serviços.

Esses são apenas alguns exemplos do grande poder dos módulos dinâmicos do Nest. Você pode ler em mais detalhes sobre como eles funcionam na página Dynamic Modules da documentação, incluindo como você pode construir um do zero.

Além disso, você pode consultar a seção Community guidelines para entender um pouco mais sobre a diferença entre os métodos register, forRoot e forFeature, além de suas contrapartes registerAsync, forRootAsync e forFeatureAsync. No geral, esses métodos possuem o mesmo propósito de construir o módulo dinamicamente, mas existem convenções para utilizá-los em diferentes situações.



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

# Instalação do NestJS
### instalar a CLI (Command Line Interface ) do NestJS. Para isso, basta executar o seguinte comando no terminal:

- $ npm i -g @nestjs/cli

### criar projeto
- $ nest new nestjs-pgsql-api

### Image docker postgress
```
version: '3'

services:
  pgsql:
    image: postgres:alpine
    ports:
      - '5432:5432'
    container_name: 'pgsql'
    restart: always
    volumes:
      - pg-data:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: pguser
      POSTGRES_PASSWORD: pgpassword

  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080

volumes:
  pg-data:


  $ docker-compose up -d
```

### Conectando com o Banco de Dados  orm TypeORM  pg driver postgres

- npm i --save typeorm @nestjs/typeorm pg

### Agora dentro da pasta src vamos criar uma pasta /config/typeorm.config.ts:
```
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'pguser',
  password: 'pgpassword',
  database: 'nestjs',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
```

### adicionar agora o módulo do TypeORM aos imports globais, no arquivo app.module.ts.
```
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
```
- verifica se esta tudo certinho
- npm run start:dev

### Criando endpoint
```
nest g module user
nest generate resource user
```

```
import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  email: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  role: string;

  @Column({ nullable: false, default: true })
  status: boolean;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  salt: string;

  @Column({ nullable: true, type: 'varchar', length: 64 })
  confirmationToken: string;

  @Column({ nullable: true, type: 'varchar', length: 64 })
  recoverToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

O controller é responsável por lidar com as requisições HTTP relacionadas ao recurso. Ele contém os métodos para criar, ler, atualizar e deletar os objetos do recurso. O Service é responsável pela lógica de negócio relacionada ao recurso, enquanto a Entity representa a estrutura de dados do recurso, se estiver usando um banco de dados.

Caso a CLI do Nest.js não atualize automaticamente o arquivo app.module.ts para importar o controlador e o serviço do recurso que você criou, é necessário importá-lo manualmente. Isso garante que o Nest.js reconheça e gerencie corretamente o novo recurso em sua aplicação.


### Regex Para Password

Para garantir a segurança das contas dos usuários e proteger o sistema contra ataques de força bruta, você deve implementar uma validação mais rigorosa para as senhas dos usuários. Neste desafio, você deve utilizar o conceito de expressões regulares e o @Matches decorator para garantir que as senhas atendam a critérios específicos.

Atualmente, o DTO de criação de usuário possui a seguinte estrutura:
```
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailEhUnico } from '../validacao/email-eh-unico.validator';

export class CriaUsuarioDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @EmailEhUnico({ message: 'Já existe um usuário com este e-mail' })
  email: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  senha: string;
}

```

E os critérios a serem cumpridos, visando maior segurança, são:

1 - Adicione o @Matches decorator do pacote class-validator na propriedade senha do DTO de criação de usuário;

2 - Defina uma expressão regular que atenda aos seguintes requisitos para as senhas:

Pelo menos uma letra minúscula (a-z);
Pelo menos uma letra maiúscula (A-Z);
Pelo menos um dígito (0-9);
Pelo menos um caractere especial (por exemplo, !@#$%^&*()_-+=<>?/).
3 - Garanta que a senha tenha um comprimento mínimo de 8 caracteres e um comprimento máximo de 30 caracteres;

4 - Quando a senha não atender aos critérios acima, o @Matches decorator deve lançar uma mensagem de erro personalizada, por exemplo: 'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 8 e 30 caracteres'.

Seguindo essas orientações, implemente uma validação para as senhas dos usuários!

O decorator @Matches é uma funcionalidade oferecida pelo módulo de validação do Nest.js, que permite aplicar validações baseadas em expressões regulares para campos específicos em DTOs (Data Transfer Objects).

O @Matches aceita dois parâmetros:

Expressão Regular (Regex): É o primeiro parâmetro do @Matches, onde você deve fornecer a expressão regular que será utilizada para realizar a validação do campo. Ele verificará em nosso exemplo se a senha recebida atende o que digitamos na expressão regular, caso não atenda, será lançada uma mensagem de erro.

Opções: É o segundo parâmetro do @Matches, que permite fornecer opções adicionais para a validação. Com esse parâmetro, nós podemos fornecer uma mensagem de erro personalizada caso a validação falhe. Em nosso desafio, devemos retornar a mensagem 'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 8 e 30 caracteres' caso falhe.

Primeiro, vamos adicionar o @Matches decorator à propriedade senha do DTO de criação de usuário:
```
@Matches()
senha: string;

```
Agora, o passo seguinte é construir a expressão regular que atenderá aos critérios estabelecidos para as senhas. A expressão regular deve ser elaborada para garantir a presença de pelo menos uma letra minúscula, uma letra maiúscula, um dígito e um caractere especial.

Para isso, a expressão regular pode ser construída da seguinte forma:

```
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+).{6,30}$/

```
Agora, vamos explicar cada parte da expressão:

^: Esse símbolo indica o início da string. Ou seja, a expressão regular vai verificar a partir do começo da senha.
(?=.*[a-z]): Essa parte da expressão verifica se há pelo menos uma letra minúscula (a-z) em qualquer posição da senha.
(?=.*[A-Z]): Aqui, verificamos se há pelo menos uma letra maiúscula (A-Z) em qualquer posição da senha.
(?=.*\d): Essa parte confere se há pelo menos um dígito (0-9) em qualquer posição da senha.
(?=.*\W+): Nesta parte, verificamos se há pelo menos um caractere especial (por exemplo, !@#$%^&*()_-+=<>?/) em qualquer posição da senha.
.{6,30}: Essa parte verifica se a senha tem um comprimento mínimo de 6 caracteres e um comprimento máximo de 30 caracteres. O ponto final (.) corresponde a qualquer caractere (exceto quebras de linha), e o quantificador {6,30} específica que deve haver de 6 a 30 caracteres.
$: Esse símbolo indica o final da string. A expressão regular vai garantir que o padrão se estenda até o final da senha.

```
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+)(.{6,30})$/, {
    message: 'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 8 e 30 caracteres',
  })
  senha: string;



### Guards e casos de uso com Nest.js

Autenticação:
Podemos verificar credenciais, tokens, chaves ou outra forma de autenticação suportada. Nesse contexto, um Guard irá atuar de fato como um Guardião da rota, pois irá protegê-la através da verificação das regras de autenticação.
Autorização:
A lógica de autorização também pode ser aplicada por meio de um Guard. Após autenticar o usuário, um Guard pode verificar se ele carrega as permissões para realizar uma determinada operação ou acessar recursos da aplicação. Se o usuário não for autorizado a acessar uma rota de Administrador, por exemplo, um Guard pode negar o acesso e retornar um erro.
Early exit (saída antecipada):
Guards podem interromper o processamento de uma requisição antes de alcançar o controlador. Essa ação é muito útil quando alguma condição não é atendida e, seja por questões de segurança ou regras de negócio, não precisamos continuar com o processamento da requisição. Nesse sentido, é possível permitir que um Guard retorne uma resposta ao cliente de forma direta, evitando assim adicionar processamento no controlador.
Validação de dados:
Antes de uma requisição ser processada pelo controlador, Guards podem ser utilizados para validar os dados. Podemos incluir nesse contexto a verificação de parâmetros de URL, payloads, dados enviados no corpo da requisição, cabeçalhos, dentre outros. Caso os dados enviados não apresentarem os requisitos esperados, um Guard poderá rejeitar a requisição e enviar uma resposta de erro.
Lógica de negócios:
Guards também são flexíveis para se adaptarem a regras de negócios. É possível executar lógica de negócios específica para uma rota de acordo com a necessidade. Assim, cada rota pode conter requisitos de validação e segurança distintos.
Logging e métricas:
Podemos registrar informações relevantes sobre as requisições e respostas, a fim de capturar métricas ou para auxiliar no monitoramento e depuração da aplicação.