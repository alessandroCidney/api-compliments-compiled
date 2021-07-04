"use strict";
// Verificação de autenticação
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
function ensureAuthenticated(request, response, next) {
    // Receber o token
    var authToken = request.headers.authorization;
    // Checar se o token está preenchido
    if (!authToken) {
        return response.status(401).end();
    }
    // Ignora a primeira posição do array (com "Bearer") e adiciona a segunda em token
    var _a = authToken.split(" "), token = _a[1];
    // Verificar se o token é válido
    try {
        // const decode = verify(token, "50cba2380b557b209f10e6b561ef3aa3");
        // Estamos forçando o resultado do sub a ser uma string, que antes era uma função
        // Pois request.user_id espera uma string
        var sub = jsonwebtoken_1.verify(token, "50cba2380b557b209f10e6b561ef3aa3").sub;
        // Passando o sub dentro da request
        request.user_id = sub;
        return next();
    }
    catch (err) {
        return response.status(401).end();
    }
}
exports.ensureAuthenticated = ensureAuthenticated;
