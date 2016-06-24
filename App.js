//Requires independentes de recursos================================
console.log("INFO: Requiring NPM Dependencies");

var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var NodeSession = require("node-session");

console.log("INFO: NPM Dependencies required Sucessfully.");

//==================================================================


//Inicialização de objetos==========================================

console.log("INFO: Initializing Application Server");

var router = express();
var server = http.createServer(router);
var nodeSession = new NodeSession(
{
	secret: "myNudes",
	'files': process.cwd() + '/.sessions',
});

console.log("INFO: Application server initialized sucessfully");

//==================================================================


//Definições de uso dos objetos=====================================
console.log("INFO: Applying configurations to application server.");

router.use(express.static(path.resolve(__dirname, 'client/')));
router.use(bodyParser.json());
router.use(function (req, res, next){
	nodeSession.startSession(req, res, function ()
	{
		req.session.flush();
		next();
	});
});

console.log("INFO: configurations applied");

//==================================================================


//Requires dependetes de recursos===================================
console.log("INFO: requiring inner dependencies");

var JsonFileReader = require("./src/util/JsonFileReader");


console.log("INFO: Setup Interceptors.");

var interceptor = require("./src/interceptor/Interceptors");
router.use(interceptor);

console.log("INFO: Interceptors setup sucess.");

//Require do arquivo que configura as rotas das requisições
require("./src/controller/Routes")(router);


console.log("INFO: Dependencies required sucessfully.");


//==================================================================

console.log("INFO: Reading configuration file.");

var json = new JsonFileReader();
var config = json.readFile("config.json");

console.log("INFO: configurations file sucessfully readed.");


//Inicialização do WebServer========================================

console.log("INFO: Setup of environment variables.");

process.env.NODE_ENV = config.environment;
process.env.PORT = config.port;
process.env.SESSION = config.session;

console.log("INFO: Setup ok.");

console.log("INFO: Starting Server");
server.listen(process.env.PORT, function()
{
    console.log("INFO: Server Started Listening at: " + "http://"+server.address().address + ":" + process.env.PORT);
});

//==================================================================