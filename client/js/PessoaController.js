
var app = angular.module('AppModule');

app.controller('PessoaController', function($scope, $http, $rootScope)
{
    $scope.cadastrar = function(pessoa)
    {
        console.log("entrou cadastrar");
        console.log(pessoa);
       
        
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
            url: "/pessoas/",
            cache: true,
            data: pessoa
        };

        $http(config).then(sucessHandler, errorHandler);
		
	};

    $scope.signUp = function(pessoa)
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
            url: "/pessoas",
            cache: true,
            data: pessoa
        };

        $http(config).then(sucessHandler, errorHandler);
		
	};
        
    $scope.listar = function()
    {
		
        function sucessHandler(response)
        {
            $scope.lista = response.data.lista;

             $scope.lista.delete = function(pessoa)
            {
                for(var i = 0; i < this.length; i++)
                {
                        if(this[i].id == pessoa.id)
                                delete this[i];
                }
            };

            $scope.lista.replace = function(pessoa)
            {
                for(var i = 0; i < this.length; i++)
                {
                    if(this[i].id == pessoa.id)
                        this[i] = pessoa;
                }
            };

        }

        var config = 
        {
                method: "GET",
                timeout: 10000,
                responseType: "json",
                url: "/pessoas",
                cache: false
        };

        $http(config).then(sucessHandler, errorHandler);

    };
    
    $scope.deletar = function(pessoa, lista)
    {

        function sucessHandler(response)
        {
            lista.delete(pessoa);
        }

        var config = 
        {
            method: "DELETE",
            timeout: 10000,
            responseType: "json",
            url: "/pessoas/" + pessoa.id,
            cache: false,
            params: {pessoa: pessoa}
        };

        $http(config).then(sucessHandler, errorHandler);
    }
	
    $scope.editar = function(pessoa)
    {
        function sucessHandler(response)
        {
            $scope.lista.replace(pessoa);
            alert(response.data.message);
        }


        var config = 
        {
            method: "PUT",
            timeout: 10000,
            responseType: "json",
            url: "/pessoas/" + pessoa.id,
            cache: false,
            data: pessoa
        };

        $http(config).then(sucessHandler, errorHandler);
    }
	
    $scope.setInfo = function(pessoa)
    {
        $scope.informacoes = true;
    $scope.pessoa = angular.copy(pessoa)
    }

    $scope.removeInfo = function()
    {
        $scope.informacoes = false;
    }

	$scope.validarSenha = function(cadastro)
	{
	    function validarSenha(cadastro){ 
                
            }
	password = document.formulario.senha.value
	confirmPassword = document.formulario.repetir_senha.value
	if (senha != senhaRepetida){
		alert("Repita a senha corretamente");
		document.formulario.repetir_senha.focus();	
		return false;
	}
}
        
        
    $scope.login = function(pessoa)
    {
         console.log(pessoa);
        function sucessHandler(response)
        {
            console.log(response);
            alert("Bem-vindo!");
           window.location.assign("http://localhost:3000/#/");
            
        }

        var config = 
        {
            method: "POST",
            timeout: 10000,
            responseType: "json",
            url: "/pessoas/login/",
            cache: false,
            params: {pessoa: pessoa}
        };

        $http(config).then(sucessHandler, errorHandler);
    };

    function errorHandler(response)
    {
        console.log(response);
        //alert(response.data.errorMessage);
    }

});
	
