module.exports = function(router) 
{
	require("./LeilaoController.js")(router);
	require("./LanceController.js")(router);
};