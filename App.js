//Requires independentes de recursos================================
console.log("INFO: Requiring NPM Dependencies");

var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var session = require("express-session");

console.log("INFO: NPM Dependencies required Sucessfully.");

//==================================================================


//Inicialização de objetos==========================================

console.log("INFO: Initializing Application Server");

var router = express();
var server = http.createServer(router);

console.log("INFO: Application server initialized sucessfully");

//==================================================================


//Definições de uso dos objetos=====================================
console.log("INFO: Applying configurations to application server.");

router.use(express.static(path.resolve(__dirname, 'client/')));
router.use(bodyParser.json());
router.use(session(
{
    secret: 'myNudes',
    resave: false,
    saveUninitialized: true,
    cookie: 
    {
        secure: true
    }
}));

console.log("INFO: configurations applied");

//==================================================================


//Requires dependetes de recursos===================================
console.log("INFO: requiring inner dependencies");
//Require do arquivo que configura as rotas das requisições
require("./src/controller/Routes")(router);
var JsonFileReader = require("./src/util/JsonFileReader");
console.log("INFO: Dependencies required sucessfully.")

//==================================================================

console.log("INFO: Reading configuration file.");
var json = new JsonFileReader();
var config = json.readFile("config.json");
console.log("INFO: configurations file sucessfully readed.");


//Inicialização do WebServer========================================

console.log("INFO: Setup of environment variables.");
process.env.NODE_ENV = config.environment;
process.env.PORT = config.port;
console.log("INFO: Setup ok.");

console.log("INFO: Starting Server");
server.listen(process.env.PORT, function()
{
    console.log("INFO: Server Started Listening at: " + "http://"+server.address().address + ":" + process.env.PORT);
    
    var DAO = require("./src/model/dao/LanceDAO");
    var RN = require('./src/model/rn/LanceRN');
    var dao = new DAO();
    var rn = new RN();
    rn.getWinner("57543c45029eaf0e815be10b", dao, function ()
    {
        
    });
});

//==================================================================

