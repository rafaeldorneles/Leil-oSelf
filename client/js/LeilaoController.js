var app = angular.module('AppModule');


app.controller('LeilaoController', function ($scope, $http)
{
    $scope.cadastrar = function (leilao)
    {

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

    $scope.setInfo = function (leilao)
    {
        $scope.informacoes = true;
=======
        
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
	
	$scope.listar = function()
	{
		
		function sucessHandler(response)
		{
			$scope.lista = response.data.lista;
			
			$scope.lista.delete = function(leilao)
			{
				for(var i = 0; i < this.length; i++)
				{
					if(this[i].id == leilao.id)
						delete this[i];
				}
			};
			
			$scope.lista.replace = function(leilao)
			{
				for(var i = 0; i < this.length; i++)
				{
					if(this[i].id == leilao.id)
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
	
	$scope.deletar = function(leilao, lista)
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
	
	$scope.editar = function(leilao)
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
>>>>>>> 393b5b89e69c8e621275fc78cd4a9417deaf8900
        $scope.leilao = angular.copy(leilao)
    }

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

        var config =
                {
                    method: "GET",
                    timeout: 10000,
                    responseType: "json",
                    url: "/leiloes/dono/6",
                    cache: false
                };

        $http(config).then(sucessHandler, errorHandler);
    }

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

