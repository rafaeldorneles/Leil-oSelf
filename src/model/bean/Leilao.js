var method = Leilao.prototype;
var dateConverter = require("./../../util/dateConverter.js");
var formatter = require("./../../util/dateFormatter.js");

//Listagem de Atributos

this.id;
this.dono;
this.categoria;
this.descricao;
this.dataHoraInicio;
this.dataHoraFinal;
this.dataHoraExecucao;
this.endereco;

function Leilao()
{
	
};

//==================================SETTERS======================

method.setId = function(id)
{
	this.id = id;
};

method.setDono = function(dono)
{
	this.dono = dono;
};

method.setCategoria = function(categoria)
{
	this.categoria = categoria;
};

method.setDescricao = function(descricao)
{
	this.descricao = descricao;
};

method.setDataHoraInicio = function(dataHoraInicio)
{
	this.dataHoraInicio = dateConverter(dataHoraInicio);
};

method.setDataHoraFinal = function(dataHoraFinal)
{
	this.dataHoraFinal = dateConverter(dataHoraFinal);
};

method.setDataHoraExecucao = function(dataHoraExecucao)
{
	this.dataHoraExecucao = dateConverter(dataHoraExecucao);
};

method.setEndereco = function(endereco)
{
	this.endereco = endereco;
};

//==================================GETTERS======================

method.getId = function()
{
	return this.id;
};

method.getDono = function()
{
	return 6;
};

method.getCategoria = function()
{
	return this.categoria;
};

method.getDescricao = function()
{
	return this.descricao;
};

method.getDataHoraInicio = function()
{
	return this.dataHoraInicio;
};

method.getDataHoraFinal = function()
{
	return this.dataHoraFinal;
};

method.getDataHoraExecucao = function()
{
	return this.dataHoraExecucao;
};

method.getEndereco = function()
{
	return this.endereco;
};

//================================OUTROS========================

method.popularLeilao = function(leilao)
{
	this.setId(leilao.id);
	this.setDono(leilao.dono);
	this.setCategoria(leilao.categoria);
	this.setDescricao(leilao.descricao);
	this.setDataHoraInicio(leilao.dataHoraInicio);
	this.setDataHoraFinal(leilao.dataHoraFinal);
	this.setDataHoraExecucao(leilao.dataHoraExecucao);
	this.setEndereco(leilao.endereco);
};

method.retrieveLeilao = function()
{
	var leilao = {};
	leilao.id = this.getId();
	leilao.dono = this.getDono();
	leilao.categoria = this.getCategoria();
	leilao.descricao = this.getDescricao();
	leilao.dataHoraInicio = formatter(this.getDataHoraInicio());
	leilao.dataHoraFinal = formatter(this.getDataHoraFinal());
	leilao.dataHoraExecucao = formatter(this.getDataHoraExecucao());
	leilao.endereco = this.getEndereco();
	
	return leilao;
}

//==================================EXPORT======================

module.exports = Leilao;