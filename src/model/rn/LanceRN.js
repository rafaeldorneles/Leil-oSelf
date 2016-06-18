var method = LanceRN.prototype;
var ErrorGenerator = require("./../../util/ErrorGenerator.js");

this.errorGenerator;

function LanceRN()
{
	this.errorGenerator = new ErrorGenerator();
}

method.cadastrar = function(lance, dao, callback)
{
	
	
    dao.cadastrar(lance, function(err, insertedId)
    {
        callback(err, insertedId)
    });
	
		
};

method.getWinner = function (idLeilao, dao, callback)
{
    var moneyImportance = 0.3; //Quanto menor, mais importante 
    var winner;
    var bestPoints;
    dao.buscarPorLeilao(idLeilao, function (err, lances)
    {
        for(var i = 0; i < lances.length; i++)
        {
            var interessado = lances[i].getInteressado();
            var valor = lances[i].getValor();
            var points = interessado.ranking;
            points = points - (valor/moneyImportance);
            
            //console.log(interessado.nome + " - " + interessado.ranking + " - " + valor + " - " + points);
            
            if(!winner)
            {
                winner = interessado;
                bestPoints = points;
            }
            else
            {
                if(points > bestPoints)
                {
                    winner = interessado;
                    bestPoints = points;
                }
            }
        }
        
        //console.log(winner);
        if(callback)
            callback(err, winner);
        else
        {
            if(err)
                throw err;
        }
        
    }, {datahora: 1});
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