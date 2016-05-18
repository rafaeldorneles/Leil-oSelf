var method = Pessoa.prototype;

//Lista de Atributos
this.id;
this.nome;
this.sobrenome;
this.dataNascimento;
this.cpf;
this.cnpj;
this.ranking;
this.status;
this.username;
this.senha;
this.email;
this.telefones;

function Pessoa()
{
	
}


//==================================SETTERS======================

method.setId = function(id)
{
	this.id = id;
}

method.setNome = function(nome)
{
	this.nome = nome;
}

method.setSobrenomme = function(sobrenome)
{
	this.sobrenome = sobrenome;	
}

method.setDataNascimento = function(dataNascimento)
{
	this.dataNascimento = dataNascimento;
}

method.setCpf = function(cpf)
{
	this.cpf = cpf;
}

method.setCnpj = function (cnpj) 
{
	this.cnpj = cnpj;
}

method.setRanking = function(ranking)
{
	this.ranking = ranking;
}

method.setStatus = function(status)
{
	this.status = status;
}

method.setUsername = function(username)
{
	this.username = username;
}

method.setSenha = function(senha)
{
	this.senha = senha;
}

method.setEmail = function(email)
{
	this.email = email;
}

method.setTelefones = function(telefones)
{
	this.telefones = telefones;
}

//==================================GETTERS======================

method.getNome = function()
{
	return this.nome;
}

method.getSobrenome = function()
{
	return this.sobrenome;
}

method.getDataNascimento = function()
{
	return this.dataNascimento;
}

method.getCpf = function()
{
	return this.cpf;
}

method.getCnpj = function()
{
	return this.cnpj;
}

method.getRanking = function()
{
	return this.ranking;
}

method.getStatus = function()
{
	return this.status;
}

method.getUsername = function()
{
	return this.username;
}

method.getSenha = function()
{
	return this.senha;
}

method.getEmail = function()
{
	return this.email;
}

method.getTelefones = function()
{
	return this.telefones;
}

///==================================EXPORT======================

module.exports = Pessoa;