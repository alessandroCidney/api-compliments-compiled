"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var CreateUserController_1 = require("./controllers/CreateUserController");
var CreateTagController_1 = require("./controllers/CreateTagController");
var ensureAdmin_1 = require("./middlewares/ensureAdmin");
var ensureAuthenticated_1 = require("./middlewares/ensureAuthenticated");
var AuthenticateUserController_1 = require("./controllers/AuthenticateUserController");
var CreateComplimentController_1 = require("./controllers/CreateComplimentController");
var ListUserSendComplimentsController_1 = require("./controllers/ListUserSendComplimentsController");
var ListUserReceiveComplimentsController_1 = require("./controllers/ListUserReceiveComplimentsController");
var ListTagsController_1 = require("./controllers/ListTagsController");
var ListUsersController_1 = require("./controllers/ListUsersController");
var router = express_1.Router();
exports.router = router;
var createUserController = new CreateUserController_1.CreateUserController();
var createTagController = new CreateTagController_1.CreateTagController();
var authenticateUserController = new AuthenticateUserController_1.AuthenticateUserController();
var createComplimentController = new CreateComplimentController_1.CreateComplimentController();
// Controllers de listagem de elogios
var listUserSendComplimentsController = new ListUserSendComplimentsController_1.ListUserSendComplimentsController();
var listUserReceiveComplimentsController = new ListUserReceiveComplimentsController_1.ListUserReceiveComplimentsController();
// Controller para listagem de tags
var listTagsController = new ListTagsController_1.ListTagsController();
// Controller para listagem de usuários
var listUsersController = new ListUsersController_1.ListUsersController();
// Rotas
router.post("/users", createUserController.handle);
// router.use(ensureAdmin);
/**
 * Se usássemos isso, todo o restante do código abaixo
 * seria afetado e teria de passar pelo middleware antes
 * de ser executado.
 *
 * Como só queremos que a rota de tags seja afetada, passaremos
 * isso entre o path e o controller
 *
 * É possível colocar quantos middlewares forem necessários entre
 * o path e o controller, mas os "da borda" são o path e o controller*/
router.post("/tags", ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createTagController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliment", ensureAuthenticated_1.ensureAuthenticated, createComplimentController.handle);
// Rotas de listagem de elogios, que necessitam de autenticação para execução
router.get("/users/compliments/send", ensureAuthenticated_1.ensureAuthenticated, listUserSendComplimentsController.handle);
router.get("/users/compliments/receive", ensureAuthenticated_1.ensureAuthenticated, listUserReceiveComplimentsController.handle);
// Rota para listagem de tags
router.get("/tags", ensureAuthenticated_1.ensureAuthenticated, listTagsController.handle);
// Rota para listagem de usuários
router.get("/users", ensureAuthenticated_1.ensureAuthenticated, listUsersController.handle);
