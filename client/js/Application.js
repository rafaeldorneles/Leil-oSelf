
angular.module('AppModule', ['ngRoute']).config(['$routeProvider', function ($routeProvider) 
{
	$routeProvider.when('/perfil', 
	{
		templateUrl: 'views/perfil.html',
		controller: 'PessoaController'
	})
        .when('/perfil-novo', {
		templateUrl: 'views/perfil-novo.html',
		controller: 'PessoaController'
	})
        .when('/perfil-juridica-novo', {
		templateUrl: 'views/perfil-juridica-novo.html',
		controller: 'PessoaController'
	})
	.when('/leiloes-leiloes', {
		templateUrl: 'views/leiloes-leiloes.html',
		controller: 'LeilaoController'
	})
	.when('/perfil-juridica-novo', {
		templateUrl: 'views/perfil-juridica-novo.html',
		controller: 'LeilaoController'
	})
	.when('/perfil-cadastroServico', {
		templateUrl: 'views/perfil-cadastroServico.html',
		controller: 'LeilaoController'
	})
	.when('/leiloes-meusLances', {
		templateUrl: 'views/leiloes-meusLances.html',
		controller: 'LeilaoController'
	})
	.when('/leilao-novo', {
		templateUrl: 'views/leilao-novo.html',
		controller: 'LeilaoController'
	})
	.when('/', {
		templateUrl: 'views/home.html',
		controller: 'AppController'
	})
	.when('/sobre', {
		templateUrl: 'views/sobre.html',
		controller: ''
	})
	.when('/leiloes-abertos', {
		templateUrl: 'views/leiloes-abertos.html',
		controller: 'LeilaoController'
	})
         .when('/avaliacao', {
		templateUrl: 'views/avaliacao-do-usuario.html',
		controller: 'AvaliacaoController'
	})
	.when('/404', {
		templateUrl: 'views/404.html'
	})
	// PÁGINA NÃO PREVISTA - 404 
	.otherwise(
	{
		redirectTo: '/404'
	});
}]);

var app = angular.module("AppModule");

app.controller("AppController", function ($scope, $http)
{
	console.log("entrei no controller");
	var config =
	{
		method: "GET",
		url: "/loginForcado"
	};

	$http(config).then(function(response)
	{
		console.log("deu certo");
	}, function(response)
	{
		console.log("nao deu");
	});
});

        