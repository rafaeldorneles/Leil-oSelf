var app = angular.module('AppModule');


app.controller('LanceController', function ($scope, $http)
{
    $scope.cadastrarLance = function (lance, leilao)
    {

        function sucessHandler(response)
        {
            console.log(response);
            //alert(response.data.message);
            
        }
        lance.leilao = leilao;
        console.log(lance);
        var config =
                {
                    method: "POST",
                    timeout: 10000,
                    responseType: "json",
                    url: "/lances",
                    cache: true,
                    data: lance
                };

        $http(config).then(sucessHandler, errorHandler);

    };

    /*
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
    */



    /*
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
    };
    */
            function errorHandler(response)
            {
                console.log(response);
                //alert(response.data.errorMessage);
            }
});

