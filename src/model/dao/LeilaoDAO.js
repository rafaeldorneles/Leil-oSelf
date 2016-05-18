var method = LeilaoDAO.prototype;
var Conexao = require("./Conexao.js");
var Leilao = require("./../bean/Leilao.js");
var ErrorGenerator = require("./../../util/ErrorGenerator.js");

var conn;

this.errorGenerator;

function LeilaoDAO()
{
	this.errorGenerator = new ErrorGenerator();
	conn = new Conexao();
}

method.cadastrar = function(leilao, callback)
{
	function daoCallback(err, dbResponse)
	{
		if(callback)
			callback(err, dbResponse);
		else
		{	
			if(err)
				throw err;
		}
	}
	
	function errCallback(err)
	{
		if(err && callback)
			callback(err);
		else
		{
			if(err)
				throw err;
		}
	}
	
	var args = [];
	var query = "INSERT INTO tblLeilao ";
	query += "(idtblPessoa, idtblCategoriaServio,  descricaoLeilao, dtHoraInicio, dtHoraFinal, dtHoraExecucao, tblPessoa_idtblPessoa1, tblEnderecoLeilai_idtblEnderecoLeilai) ";
	query += "VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
	
	args.push(leilao.getDono());
	args.push(leilao.getCategoria());
	args.push(leilao.getDescricao());
	args.push(leilao.getDataHoraInicio());
	args.push(leilao.getDataHoraFinal());
	args.push(leilao.getDataHoraExecucao());
	args.push(leilao.getDono());
	args.push(leilao.getEndereco());
	
	
	conn.conectar(errCallback);
	conn.executeQuery(query, args, daoCallback);
	conn.desconectar(errCallback);
	
}

method.deletar = function(leilao, callback)
{
	function daoCallback(err, dbResponse)
	{
		if(callback)
			callback(err, dbResponse);
		else
		{	
			if(err)
				throw err;
		}
	}
	
	
	var query = "DELETE FROM tblLeilao WHERE idtblLeilao = ?";
	var args = [];
	args.push(leilao.getId());
	
	conn.conectar(daoCallback());
	conn.executeQuery(query, args, daoCallback())
	conn.desconectar(daoCallback());
}

method.listar = function(callback)
{
	
	function daoCallback(err, rows)
	{
		if(callback)
		{	var listaLeilao = [];
			if(rows)
			{
				for(var i=0; i<rows.length; i++){
					var leilao = new Leilao();
					var line = rows[i];
					
					leilao.setId(line.idtblLeilao);
					leilao.setDono(line.idtblPessoa);
					leilao.setCategoria(line.idtblCategoriaServio);
					leilao.setDescricao(line.descricaoLeilao);
					leilao.setDataHoraInicio(line.dtHoraInicio);
					leilao.setDataHoraFinal(line.dtHoraFinal);
					leilao.setDataHoraExecucao(line.dtHoraExecucao);
					leilao.setEndereco(line.tblEnderecoLeilai_idtblEnderecoLeilai);
					listaLeilao.push(leilao.retrieveLeilao());
				}
			}
			
			callback(err, listaLeilao);
		}
		else
		{
			if(err)
				throw err;
		}
	}
	
	function errCallback(err)
	{
		if(err && callback)
			callback(err);
		else
		{
			if(err)
				throw err;
		}
	}
	
	var query = "SELECT * FROM tblLeilao";
	
	conn.conectar(errCallback);
	conn.queryResultSet(query, daoCallback);
	conn.desconectar(errCallback);
	
};

method.buscar = function(paramLeilao, callback)
{
	var gen = this.errorGenerator;
	function errCallback(err)
	{
		if(err && callback)
			callback(err);
		else
		{
			if(err)
				throw err;
		}
	}
	
	function daoCallback(err, row)
	{
		if(callback)
		{
			var line = row[0];
			
			if(line)
			{
				var leilao = new Leilao();
				
				leilao.setId(line.idtblLeilao);
				leilao.setDono(line.idtblPessoa);
				leilao.setCategoria(line.idtblCategoriaServio);
				leilao.setDescricao(line.descricaoLeilao);
				leilao.setDataHoraInicio(line.dtHoraInicio);
				leilao.setDataHoraFinal(line.dtHoraFinal);
				leilao.setDataHoraExecucao(line.dtHoraExecucao);
				leilao.setEndereco(line.tblEnderecoLeilai_idtblEnderecoLeilai);
			
				callback(err, leilao);	
			}
			else
			{
				gen.getResourceNotFoundError(paramLeilao.getId(), callback);
				return;
			}
		}
		else
			if(err)
				throw err;
	}
	
	var args = [];
	var query = "SELECT * FROM tblLeilao WHERE idtblLeilao = ?;";
	
	args.push(paramLeilao.getId());
	
	conn.conectar(errCallback);
	conn.queryResultSetWithArguments(query, args, daoCallback);
	conn.desconectar(errCallback);
	
};

method.buscarPorDono = function(paramLeilao, callback)
{
	
	function daoCallback(err, rows)
	{
		if(callback)
		{	var listaLeilao = [];
			if(rows)
			{
				for(var i=0; i<rows.length; i++){
					var leilao = new Leilao();
					var line = rows[i];
					
					leilao.setId(line.idtblLeilao);
					leilao.setDono(line.idtblPessoa);
					leilao.setCategoria(line.idtblCategoriaServio);
					leilao.setDescricao(line.descricaoLeilao);
					leilao.setDataHoraInicio(line.dtHoraInicio);
					leilao.setDataHoraFinal(line.dtHoraFinal);
					leilao.setDataHoraExecucao(line.dtHoraExecucao);
					leilao.setEndereco(line.tblEnderecoLeilai_idtblEnderecoLeilai);
					listaLeilao.push(leilao.retrieveLeilao());
				}
			}
			
			callback(err, listaLeilao);
		}
		else
		{
			if(err)
				throw err;
		}
	}
	
	function errCallback(err)
	{
		if(err && callback)
			callback(err);
		else
		{
			if(err)
				throw err;
		}
	}
	
	var args = [];
	var query = "SELECT * FROM tblLeilao WHERE idtblPessoa = ?";
	
	args.push(paramLeilao.getDono());
	
	conn.conectar(errCallback);
	conn.queryResultSetWithArguments(query, args, daoCallback);
	conn.desconectar(errCallback);
	
};

method.editar = function(leilao,callback)
{
	function errCallback(err)
	{
		if(err && callback)
			callback(err);
		else
		{
			if(err)
				throw err;
		}
	}
	
	function daoCallback(err, dbResponse)
	{
		if(callback)
			callback(err, dbResponse);
		else
		{	
			if(err)
				throw err;
		}
	}
	
	var args = [];
	var query = "UPDATE tblLeilao SET ";
	query += "idtblPessoa = ?, ";
	query += "idtblCategoriaServio = ?, ";
	query += "descricaoLeilao = ?, ";
	query += "dtHoraInicio = ?, ";
	query += "dtHoraFinal = ?, ";
	query += "dtHoraExecucao = ?, ";
	query += "tblPessoa_idtblPessoa1 = ?, ";
	query += "tblEnderecoLeilai_idtblEnderecoLeilai = ? ";
	query += "WHERE idtblLeilao = ?;";
	
	args.push(leilao.getDono());
	args.push(leilao.getCategoria());
	args.push(leilao.getDescricao());
	args.push(leilao.getDataHoraInicio());
	args.push(leilao.getDataHoraFinal());
	args.push(leilao.getDataHoraExecucao());
	args.push(leilao.getDono());
	args.push(leilao.getEndereco());
	args.push(leilao.getId());
	
	conn.conectar(errCallback);
	conn.executeQuery(query, args, daoCallback);
	conn.desconectar(errCallback);
}

module.exports = LeilaoDAO;