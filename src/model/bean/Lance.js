var method = Lance.prototype;

//Listagem de Atributos
this.id;
this.valor;
this.interessado;
this.leilao;

function Lance()
{
	
}

//================================SETTERS============================

method.setId = function(id)
{
	this.id = id;
}

method.setValor = function(valor)
{
	this.valor = valor;
}

method.setInteressado = function(interessado)
{
	this.interessado = interessado;
	
}

method.setLeilao = function(leilao)
{
	this.leilao = leilao;
}


//=========================================GETTERS===========================

method.getId = function()
{
	return this.id;
}

method.getValor = function()
{
	return this.valor;
}

method.getInteressado = function()
{
	return this.interessado;
}

method.getLeilao = function()
{
	return this.leilao;
}
//=====================================OUTROS=================================

method.popularLance = function(lance)
{
	var Leilao = require("./Leilao.js");
	var leilao = new Leilao();
	leilao.popularLeilao(lance.leilao);
	
	this.setId(lance.id);
	this.setInteressado(lance.interessado);
	this.setValor(lance.valor);
	this.setLeilao(leilao);
}

module.exports = Lance;