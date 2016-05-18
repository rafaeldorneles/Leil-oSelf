var method = LanceRN.prototype;
var ErrorGenerator = require("./../../util/ErrorGenerator.js");

this.errorGenerator;

function LanceRN()
{
	this.errorGenerator = new ErrorGenerator();
}

method.cadastrar = function(lance, dao, callback)
{
	if(!isNull(lance, callback, this.errorGenerator))
		return;
		
	if(!isNumber(lance, callback, this.errorGenerator))
		return;
		
	if(!isLeilao(lance, callback, this.errorGenerator))
		return;
		
	
		
};

function isNull(lance, callback, errorGenerator)
{
	if(lance.getValor == null)
	{
		errorGenerator.getNullFieldError("valor", callback);
		return true;
	}
	
	if(lance.getInteressado == null)
	{
		errorGenerator.getNullFieldError("interessado", callback);
		return true;
	}
	
	if(lance.getLeilao() == null)
	{
		errorGenerator.getNullFieldError("leilao", callback);
	}
	return false;
}

function isNumber(lance, callback, errorGenerator)
{
	if(isNaN(lance.getInteressado()))
	{
		errorGenerator.getNumberFieldError("interessado", callback);
		return false;
	}
	
	if(isNaN(lance.getValor()))
	{
		errorGenerator.getNumberFieldError("valor", callback);
		return false;
	}
	
	return true;
}

function isLeilao(lance, callback, errorGenerator)
{
	var Leilao = require("./../bean/Leilao.js");
	
	return (lance.getLeilao() instanceof Leilao);
}

module.exports = LanceRN;