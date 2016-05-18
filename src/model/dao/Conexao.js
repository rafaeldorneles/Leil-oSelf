var method = Conexao.prototype;

var mysql = require("mysql");
var JsonFileReader = require("../../util/JsonFileReader.js");

//Carrega Json de Properties
var reader = new JsonFileReader();
var config = reader.readFile("./config.json");

//Popula variáveis com dados do banco
var host = config.Database.host;
var user = config.Database.user;
var password = config.Database.password;
var database = config.Database.database;

//Variáveis da classe
this.conn;
this.resultSet;

//Método varrutor da classe
function Conexao() 
{
    //Cria conexao com as varantes
    this.conn = mysql.createConnection
    ({
        host: host,
        user: user,
        password: password,
        database: database
    });
}

//Conecta no banco de dados
method.conectar = function(callback) 
{
    this.conn.connect(function(err) 
    {
        
        if(callback)
            callback(err);
        else
        {
            if(err)
                throw err;
        }
    });
};

//Desconecta do banco de dados
method.desconectar = function(callback) 
{
    this.conn.end(function(err) 
    {
        if(callback)
            callback(err);
        else
        {
            if(err)
                throw err;
        }
            
    });

};

//Realiza querys que retornam um resultado
method.queryResultSet = function(query, callback)
{
    this.conn.query(query, function(err, rows)
    {
        
        if(callback)
            callback(err, rows);
        else
        {
            if(err)
                throw err;    
        }
    });
}

method.queryResultSetWithArguments = function(query, args ,callback)
{
    this.conn.query(query, args, function(err, rows)
    {
        
        if(callback)
            callback(err, rows);
        else
        {
            if(err)
                throw err;    
        }
    });
};

//Executa querys que não retornam resultado
method.executeQuery = function(query, args, callback)
{
    this.conn.query(query, args, function(err, dbResponse)
    {
        if(callback)
            callback(err, dbResponse);
        else
        {
            if(err)
                throw err;
        }
    });
}

module.exports = Conexao;
