var app = angular.module('AppModule');


app.controller('LeilaoController', function ($scope, $http, $rootScope)
{
    $scope.cadastrar = function (leilao)
    {
		leilao.dataHoraInicio  = $rootScope.dateTimeConverter(leilao.dataHoraInicio);
		leilao.dataHoraFinal = $rootScope.dateTimeConverter(leilao.dataHoraFinal);
		leilao.dataHoraExecucao = $rootScope.dateTimeConverter(leilao.dataHoraExecucao);

        function sucessHandler(response)
        {
            console.log(response);
            alert(response.data.message);
        }

        var config =
                {
                    method: "POST",
                    timeout: 10000,
                    responseType: "json",
                    url: "/leiloes",
                    cache: true,
                    data: leilao
                };

        $http(config).then(sucessHandler, errorHandler);

    };

    $scope.listar = function ()
    {

        function sucessHandler(response)
        {
            $scope.lista = response.data.lista;

            $scope.lista.delete = function (leilao)
            {
                for (var i = 0; i < this.length; i++)
                {
                    if (this[i].id == leilao.id)
                        delete this[i];
                }
            };

            $scope.lista.replace = function (leilao)
            {
                for (var i = 0; i < this.length; i++)
                {
                    if (this[i].id == leilao.id)
                        this[i] = leilao;
                }
            };

        }

        var config =
                {
                    method: "GET",
                    timeout: 10000,
                    responseType: "json",
                    url: "/leiloes",
                    cache: false
                };

        $http(config).then(sucessHandler, errorHandler);

    }

    $scope.deletar = function (leilao, lista)
    {

        function sucessHandler(response)
        {
            lista.delete(leilao);
        }

        var config =
                {
                    method: "DELETE",
                    timeout: 10000,
                    responseType: "json",
                    url: "/leiloes/" + leilao.id,
                    cache: false,
                    params: {leilao: leilao}
                };

        $http(config).then(sucessHandler, errorHandler);
    }

    $scope.editar = function (leilao)
    {
        function sucessHandler(response)
        {
            $scope.lista.replace(leilao);
            alert(response.data.message);
        }


        var config =
                {
                    method: "PUT",
                    timeout: 10000,
                    responseType: "json",
                    url: "/leiloes/" + leilao.id,
                    cache: false,
                    data: leilao
                };

        $http(config).then(sucessHandler, errorHandler);
    }


	$scope.setInfo = function(leilao)
	{
		$scope.informacoes = true;
		$scope.leilao = angular.copy(leilao)
	};
	
	$scope.encerrar = function (id)
	{
		function  sucessHandler()
		{
			alert("Encerrado");
		}
		var config =
		{
			method: "POST",
			timeout: 10000,
			responseType: "json",
			url: "/leiloes/encerrar/" + id,
			cache: false
		};

		$http(config).then(sucessHandler, errorHandler);
	};
	

    $scope.removeInfo = function ()
    {
        $scope.informacoes = false;
    }

    $scope.setInfoLance = function ()
    {
        $scope.campoLance = true;
        //$scope.lance = angular.copy(lance)
    };

    $scope.removeInfoLance = function ()
    {
        $scope.campoLance = false;
    };

    $scope.listarPorDono = function ()
    {
        function sucessHandler(response)
        {
            $scope.lista = response.data.lista;

            $scope.lista.delete = function (leilao)
            {
                for (var i = 0; i < this.length; i++)
                {
                    if (this[i].id == leilao.id)
                        delete this[i];
                }
            };

            $scope.lista.replace = function (leilao)
            {
                for (var i = 0; i < this.length; i++)
                {
                    if (this[i].id == leilao.id)
                        this[i] = leilao;
                }
            };

        }

		var idDono;

		$http
		(
			{
				method: "GET",
				timeout: 10000,
				responseType: "json",
				url: "/pessoas/isLogged/",
				cache: false
			}
		)
		.then(function (response)
		{
			var config =
			{
				method: "GET",
				timeout: 10000,
				responseType: "json",
				url: "/leiloes/dono/"+response.data.user.id,
				cache: false
			};

			$http(config).then(sucessHandler, errorHandler);
		},
		function (response) {
		{

		}
		});
    };

    $scope.opCategorias =
    [
                {value: 1, text: "Serviços Gerais"},
                {value: 2, text: "Serviços de Manutenção Predial"},
                {value: 3, text: "Serviços de Informática"},
                {value: 4, text: "Serviços de Manufatura"},
                {value: 5, text: "Serviços de Instação de ar condicionado"},
                {value: 666, text: "Serviços de Satanistas"},
                {value: 5555, text: "Serviços de Diversos (Outros)"}
            ];

    $scope.opCategorias.find = function (id)
    {
        for (var i = 0; i < this.length; i++)
        {
            if (this[i].value == id)
                return this[i];

        }
    };

    function errorHandler(response)
    {
        console.log(response.data.error);
        alert(response.data.errorMessage);
    }
});

