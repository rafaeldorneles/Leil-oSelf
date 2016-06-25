module.exports = function(router) 
{

	router.get("/start", function (request, response) {response.status(200).send({menus: request.menus});});
	require("./LeilaoController.js")(router);
	require("./LanceController.js")(router);
	require("./PessoaController.js")(router);
	require("./AvaliacaoController.js")(router);
};