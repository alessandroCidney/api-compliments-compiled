# API Valoriza :two_men_holding_hands:

## O que é a API Valoriza?
Esta é uma API desenvolvida utilizando o framework minimalista Express, na qual usuários podem se cadastrar e enviar elogios para outros usuários.

## Como utilizar?
- Você pode baixar o projeto no localhost e ativá-lo através do terminal com o comando **yarn dev**. Depois, é só realizar as requisições através das rotas que serão retratadas mais abaixo (com exemplos em JavaScript).
- Você também pode utilizá-lo através da plataforma **Valoriza**, que nada mais é do que uma versão do projeto com o front-end desenvolvido. Atualmente, o setor front-end ainda está sendo desenvolvido, mas você pode conferir a plataforma através do endereço https://alessandrocidney.github.io/front-end-api-compliments.

## Principais funcionalidades
- Cadastro de novos usuários
- Autenticação para usuários já cadastrados
- Cadastro de elogios (aos quais um usuário pode associar uma mensagem e uma tag)
- Listagem de usuários
- Listagem de tags
- Cadastro de novas tags (apenas para usuários admins)
- Listagem de elogios recebidos e enviados

## O que são Tags?
As tags são uma forma de classificar diferentes tipos de elogios. Cada usuário pode cadastrar um elogio com determinada tag, como, por exemplo, "inspiração", "inteligência", etc.

## O que são os Elogios (Compliments)?
Os elogios são uma forma de valorizar outros usuários mediante o cadastro de uma mensagem e uma tag. Ao receber elogios, os usuários podem visualizá-los através da rota de listagem de elogios recebidos, além de poderem visualizar os elogios que já enviaram através da rota de listagem de elogios enviados.

## Rotas
A API contém as rotas:

### /login (POST)
- Método POST.
- Para realizar a autenticação de usuários mediante a passagem de um JSON através do corpo de uma requisição, o qual deve conter o email e a senha (password) do usuário.
- Retorna o token de autenticação do usuário.
- Não necessita de autenticação.

#### Exemplo 
``` javascript
let results = await fetch(`${baseURL}/login`, {
	method: 'POST',
	headers: {
		"Content-Type": "application/json"
	},
	body: JSON.stringify({
		email: 'user@example.com',
		password; '12345'
	})
})
.then(response => response.json())
.then(data => data)
.catch(err => err)
```

### /users (POST)
- Método POST.
- Para realizar a criação (cadastro) de novos usuários mediante a passagem de um nome de usuário (name), um email e uma senha (password).
- Não necessita de autenticação.

#### Exemplo 
``` javascript
let results = await fetch(`${baseURL}/users`, {
	method: 'POST',
	headers: {
		"Content-Type": "application/json"
	},
	body : JSON.stringify({
		name: 'Example',
		email: 'user@example.com',
		password: '12345',
		admin: false
	})
})
.then(response => response.json())
.then(data => data)
.catch(err => err)
```

- Observação: Por padrão, se não informado, o valor de admin é false

### /users (GET)
- Método GET.
- Necessita de confirmação de autenticação mediante a passagem do token de autenticação no campo "Authorization" do Header da requisição.
- Retorna uma lista com os dados dos usuários (exceto a senha).

#### Exemplo
``` javascript
let results = await fetch(`${baseURL}/users`, {
	method: 'GET',
	headers: {
		"Authorization": `Bearer ${token}`,
		"Content-Type": "application/json"
	}
})
.then(response => response.json())
.then(data => data)
.catch(err => err)
```

### /tags (POST)
- Método POST.
- Rota para a criação de novas tags mediante a passagem do nome (name) da nova tag
- Necessita de confirmação de autenticação mediante a passagem do token de autenticação no campo "Authorization" do Header da requisição.
- O usuário criador precisa ser admin.

#### Exemplo
``` javascript
let results = await fetch(`${baseURL}/tags`, {
	method: 'POST',
	headers: {
		"Authorization": `Bearer ${token}`,
		"Content-Type": "application/json"
	},
	body: JSON.stringify({
		name: "simpatia"
	})
})
.then(response => response.json())
.then(data => data)
.catch(err => err)
```

### /tags (GET)
- Método GET.
- Rota para a listagem das tags existentes.
- Necessita de confirmação de autenticação mediante a passagem do token de autenticação no campo "Authorization" do Header da requisição.

#### Exemplo
```javascript
let results = await fetch(`${baseURL}/tags`, {
	method: 'GET',
	headers: {
		"Authorization": `Bearer ${token}`,
		"Content-Type": "application/json"
	}
})
.then(response => response.json())
.then(data => data)
.catch(err => err)
```

### /compliment (POST)
- Método POST.
- Rota para cadastro de novos elogios.
- É necessário informar o id do usuário que receberá o elogio (user_receiver), o id da tag do elogio (tag_id) e a mensagem do elogio (message).
- Necessita de confirmação de autenticação mediante a passagem do token de autenticação no campo "Authorization" do Header da requisição.

#### Exemplo
```javascript
let results = await fetch(`${baseURL}/compliment`, {
	method: 'POST',
	headers: {
		"Authorization": `Bearer ${token}`,
		"Content-Type": "application/json"
	}
	body: JSON.stringify({ 
		tag_id: '123456789', 
		user_receiver: 'dshjdhjsdhfjshdjhjfhjdhf2345', 
		message: 'Você é incrível!'
	})
})
.then(response => response.json())
.then(data => data)
.catch(err => err)
```

### /users/compliments/send (GET)
- Método GET.
- Rota para listagem dos elogios enviados pelo usuário que está autenticado.
- Necessita de confirmação de autenticação mediante a passagem do token de autenticação no campo "Authorization" do Header da requisição.
- Retorna uma lista com informações sobre os elogios enviados.

#### Exemplo
```javascript
let results = await fetch(`${baseURL}/users/compliments/send`, {
	method: 'GET',
	headers: {
		"Authorization": `Bearer ${token}`,
		"Content-Type": "application/json"
	}
})
.then(response => response.json())
.then(data => data)
.catch(err => err)
```

### /users/compliments/receive (GET)
- Método GET.
- Rota para listagem dos elogios recebidos pelo usuário que está autenticado.
- Necessita de confirmação de autenticação mediante a passagem do token de autenticação no campo "Authorization" do Header da requisição.
- Retorna uma lista com informações sobre os elogios recebidos.

#### Exemplo
```javascript
let results = await fetch(`${baseURL}/users/compliments/receive`, {
	method: 'GET',
	headers: {
		"Authorization": `Bearer ${token}`,
		"Content-Type": "application/json"
	}
})
.then(response => response.json())
.then(data => data)
.catch(err => err)
```

## O que é a baseURL (URL Base)?
A URL Base é a URL para a qual deve-se realizar as requisições.
- Caso você tenha baixado o projeto e utilizado no localhost, ela é "http://localhost:8080" (ou "http://localhost:3000").
- Se tiver problemas com a porta utilizada (8080, 3000, etc.), você pode alterá-la no arquivo server.js do projeto.

## Quais foram os pacotes utilizados no projeto?
- Express e seus tipos (@types)
- TypeScript e seus tipos(@types)
- Ts-Node-Dev
- Yarn
- TypeORM e seus tipos
- Sqlite3

## Quando foi desenvolvida?
Esta API foi desenvolvida em 2021 durante o evento NLW Together, disponibilizado pela Rocketseat.

## E o front-end?
Você pode conferir o front-end do projeto no repositório em https://github.com/alessandroCidney/front-end-api-compliments, além de vê-lo funcionando através do endereço https://alessandrocidney.github.io/front-end-api-compliments.