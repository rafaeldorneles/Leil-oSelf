
angular.module('AppModule', ['ngRoute']).config(['$routeProvider', function ($routeProvider) 
{
	$routeProvider.when('/perfil', 
	{
		templateUrl: 'views/perfil.html',
		controller: 'LeilaoController'
	})
	.when('/leiloes-leiloes', {
		templateUrl: 'views/leiloes-leiloes.html',
		controller: 'LeilaoController'
	})
	.when('/perfil-juridica', {
		templateUrl: 'views/perfil-juridica.html',
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
		controller: ''
	})
	.when('/sobre', {
		templateUrl: 'views/sobre.html',
		controller: ''
	})
	.when('/leiloes-abertos', {
		templateUrl: 'views/leiloes-abertos.html',
		controller: 'LeilaoController'
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

        