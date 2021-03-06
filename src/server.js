"use strict";
// Caminho: Fabinho\Documents\Alessandro\Programação\NWL
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * AULA 3
 * - Adição de Middleware para erros em server.ts
 * - Criação e Execução da migration CreateTags
 * - Criação da Entity Tag
 * - Criação do Repositório TagsRepositories
 * - Criação do Service para Tags
 * - Criação do Controller para Tags
 * - Adição da rota para tags no routes.ts
 * - Criação do Middleware ensureAdmin
 * */
/**
 * SUGESTÕES - AULA 3
 * - Criar uma classe de erros customizável(que receberia um status e uma mensagem)
 * - Lembrar do Try e Catch para tratar erros
 * */
/**
 * AULA 4
 * - Criação e utilização da migration AlterUserAddPassword
 * - Instalação e utilização da biblioteca bcryptjs para criptografia
 * - Adicionando a criptografia de senhas através da função hash
 * - Criando mecanismo de autenticação
 * - Criação e utilização da migration responsável pela criação da tabela compliments
 * - Criação da entity Compliment
 * - Criação de controllers, services e rotas relacionadas à entidade Compliment
 * - Adição de valor padrão para o campo admin da tabela de users (o valor false)
 * */
/**
 * AULA 5
 * - Criação de middleware ensureAuthenticated para verificação de autenticação
 * - Correção do mecanismo de verificação de administradores no ensureAdmin
 * - Passagem de valor do ID do usuário pelo request
 *
 * - Correção no controller CreateComplimentController, que agora capta o user_id pelo request ao invés de receber o user_sender
 *
 * - Criando services para listagem dos elogios recebidos e enviados pelo usuário autenticado
 *
 * - Criando controllers para listagem dos elogios recebidos e enviados pelo usuário autenticado
 *
 * - Criação de rotas para listagem dos elogios recebidos e enviados pelo usuário autenticado
 *
 * - Criando service, controller e rota para listagem das tags disponíveis
 *
 * - Instalação da biblioteca class-transformer
 *
 * - Criando service, controller e rota para listagem dos usuários disponíveis
 *
 * - Ocultando a senha na listagem de usuários com a função Exclude do class-transformer
 *
 * - Instalando a biblioteca cors e importando em server.ts
 * */
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var cors_1 = __importDefault(require("cors"));
var routes_1 = require("./routes");
require("./database");
// Necessário utilizar o comando yarn @types/express -D
// Inicializando o Express
var app = express_1.default();
// O Cors habilita que outras fontes, além do back-end da aplicação, acessem os dados
app.use(cors_1.default());
// Para especificar o site:
// app.use(cors({
//     origin: ""
// }));

/**
 * Tipos de parâmetros (requisições)
 *
 * Route Params => Parâmetros que vem com as rotas (no endereço, por exemplo)
 * Exemplo: http://localhost:3000/produtos/2122323212a343453434
 * (
 *  Devem ser configurados na hora de construir a rota
 *  Exemplo: app.get(/test/{id}...)
 * )
 *
 * Query Params => Parâmetros que fazem parte de uma query (não são obrigatórios)
 * http://localhost:3000/produtos?name=teclado&description=teclado-master
 * (Não vem explícitos na configuração da rota)
 *
 * Body Params  => Parâmetros para POST, PUT e PATCH, vem no corpo da requisição
 * {
 *   "name": "teclado"
 *   "description": "teclado-master"
 * }
 */
/**
 * APP.USE() representam MIDDLEWARES
 * ou seja, itens entre o início e o fim de uma requisição que podem controlá-la
*/
// O Express trabalha com vários formatos
// Como utilizamos JSON no body da Request, devemos especificar isso
app.use(express_1.default.json());
// Inserindo as rotas no Express
app.use(routes_1.router);
// Middleware de erro
app.use(function (err, request, response, next) {
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message
        });
    }
    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
});
/**
 * OBSERVAÇÃO
 * - A biblioteca do Express, por padrão, não consegue capturar erros vindos de funções async
 * - É necessário instalar a biblioteca express-async-errors
 * */

// Configurando porta para o Heroku
var port = process.env.PORT || 8080

// Inicializando o servidor em http://localhost:3000
app.listen(port, function () { return console.log("Server is running!"); });
// yarn tsc
// node src/server.js
// Para facilitar o desenvolvimento, utilize:
// yarn add ts-node-dev -D
// Possível executar com yarn dev
/**
 * Migrations
 * - Controle de versionamento de tabelas
 */ 
