var method = LeilaoRN.prototype;
var errorHandler = require("./../../util/errorHandler.js");
var ErrorGenerator = require("./../../util/ErrorGenerator.js");
var dateConverter = require("./../../util/dateConverter.js");
var isValidDate = require("./../../util/isValidDate.js");

this.errorGenerator;

function LeilaoRN()
{
	this.errorGenerator = new ErrorGenerator();
}

method.cadastrar = function(leilao, dao, callback)
{
	if(isNull(leilao, callback, this.errorGenerator))
		return;
	
	if(!isNumber(leilao, callback, this.errorGenerator))
		return;
		
	if(!isDate(leilao, callback, this.errorGenerator))
		return;
		
	if((leilao.getDataHoraFinal() - leilao.getDataHoraInicio()) < 0)
	{	
		var message1 = "Data final não pode ser menor que data de inicio do leilão";
		this.errorGenerator.getValidationError("dataHoraInicio, dataHoraFinal", message1, callback);
		return;
	}
	
	if((leilao.getDataHoraExecucao() - leilao.getDataHoraFinal()) < 0)
	{
		var message2 = "Data de execução não pode ser menor que data de final do leilão";
		this.errorGenerator.getValidationError("dataHoraFinal, dataHoraExecucao", message2, callback);
		return;
	}
	
	dao.cadastrar(leilao, function(err, dbResponse)
	{
	    if(callback)
	        callback(err, dbResponse);
        else
        {
            if(err)
                throw err;
        }
	});
};

method.listar = function(dao, callback)
{
	dao.listar(function(err,lista){
		if(callback)
			callback(err,lista);
		else
		{
			if(err)
				throw err;
		}
	});	
	
};

method.buscar = function(dao, leilao, callback)
{
	
	dao.buscar(leilao, function(err, leilao)
	{
		if(callback)
			callback(err, leilao);
		else
			if(err)
				throw err;
	});	
};

method.buscarPorDono = function(dao, leilao, callback)
{
	dao.buscarPorDono(leilao, function(err, lista)
	{
		if(callback)
			callback(err, lista);
		else
			if(err)
				throw err;
	});	
};


method.deletar = function(leilao, dao, callback)
{
	
	/**
	 * Criar condição para verifivar se quem esta deletando realmente é o dono
	 * */
	dao.deletar(leilao, function(err, dbResponse)
	{
		if(callback)
			callback(err,dbResponse);
		else
		{
			if(err)
				throw err;
		}
	});	
};

method.editar = function(leilao, dao, callback)
{
	if(isNull(leilao,callback, this.errorGenerator))
		return; 

	if(hasLance(leilao,callback, this.errorGenerator))
		return;
	if(!isNumber(leilao, callback, this.errorGenerator))
		return;
	if(!isDate(leilao, callback, this.errorGenerator))
		return;
	if((leilao.getDataHoraFinal() - leilao.getDataHoraInicio()) < 0)
	{
		var message1 = "Data final não pode ser menor que a data de inicio do leilão";
		this.errorGenerator.getValidationError("dataHoraInicio, dataHoraFinal", message1, callback);
		return;
	}
	if((leilao.getDataHoraExecucao() - leilao.getDataHoraFinal()) < 0)
	{
		var message2 = "Data de execuçãp não ode ser menor que a data de término do leilão";
		this.errorGenerator.getValidationError("dataHoraFinal, dataHoraExecucao", message2, callback);
		return;
	}
	/**
	 * criar metodo para verificar se o leilão já tem lance
	 *
	 */
	
	dao.editar(leilao, function(err, dbResponse)
	{
		if(callback)
			callback(err, dbResponse);
		else
		{
			if(err)
				throw err;
		}
	});
	
};

function isNumber(leilao, callback, errorGenerator)
{
	if(isNaN(leilao.getDono()))
	{
		errorGenerator.getNumberFieldError("dono", callback);
		return false;
	}
	
	if(isNaN(leilao.getCategoria()))
	{
		errorGenerator.getNumberFieldError("categoria", callback);
		return false;
	}
	
	if(isNaN(leilao.getEndereco()))
	{
		errorGenerator.getNumberFieldError("endereco", callback);
		return false;
	}
	
	return true;
}

function isNull(leilao, callback, errorGenerator)
{
	if(leilao.getDono() == null)
	{
		errorGenerator.getNullFieldError("dono", callback);
		return true;
	}
	
	if(leilao.getCategoria() == null)
	{
		errorGenerator.getNullFieldError("categoria", callback);
		return true;
	}
	
	if(leilao.getDescricao() == null)
	{
		errorGenerator.getNullFieldError("descricao", callback);
		return true;
	}
	
	if(leilao.getDataHoraInicio() == null)
	{
		errorGenerator.getNullFieldError("dataHoraInicio", callback);
		return true;
	}
	
	if(leilao.getDataHoraFinal() == null)
	{
		errorGenerator.getNullFieldError("dataHoraFinal", callback);
		return true;
	}
	
	if(leilao.getDataHoraExecucao() == null)
	{
		errorGenerator.getNullFieldError("dataHoraExecucao", callback);
		return true;
	}
	
	if(leilao.getEndereco() == null)
	{
		errorGenerator.getNullFieldError("endereco", callback);
		return true;
	}
	
	return false;
}

function isDate(leilao, callback, errorGenerator)
{
	if(!isValidDate(leilao.getDataHoraInicio()))
	{
		errorGenerator.getDateFieldError("dataHoraInicio", callback);
		return false;
	}
	
	if(!isValidDate(leilao.getDataHoraFinal()))
	{
		errorGenerator.getDateFieldError("dataHoraFinal", callback);
		return false;
	}
	
	if(!isValidDate(leilao.getDataHoraExecucao()))
	{
		errorGenerator.getDateFieldError("dataHoraExecucao", callback);
		return false;
	}
	
	return true;
}

/*function hasLance(leilao, callback, errorGenerator){
	var LanceRN = require("./LanceRN.js");
	var LanceDAO = require("../dao/LanceDAO.js");
	var rn = new LanceRN();
	var dao = new LanceDAO();
	var arr = [];
	rn.metodoDefinir(leilao,dao, function(err, leilao)
		{
			if(err)
			{
				errorHandler(err);
			}
			else
			{
				arr = leilao;
			}
		}
	);
	if(arr != null)
	{
		errorGenerator.getLeilaoRun("arr", callback);
		return false;
	}
	
	return true;
	

	
}*/

module.exports = LeilaoRN;