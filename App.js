//Requires independentes de recursos================================

var http = require('http');
var path = require('path');
var express = require('express');

//==================================================================


//Inicialização de objetos==========================================

var router = express();
var server = http.createServer(router);

//==================================================================


//Definições de uso dos objetos=====================================

router.use(express.static(path.resolve(__dirname, 'client/')));
router.use(express.bodyParser());

//==================================================================


//Requires dependetes de recursos===================================

//Require do arquivo que configura as rotas das requisições
require("./src/controller/Routes.js")(router);
var JsonFileReader = require("./src/util/JsonFileReader.js");

//==================================================================

var json = new JsonFileReader();
var config = json.readFile("config.json");


//Inicialização do WebServer========================================


process.env.NODE_ENV = config.environment; 
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function()
{
    console.log(process.env.NODE_ENV);
});


//==================================================================

