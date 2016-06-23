
var app = angular.module('AppModule');


app.controller('PessoaController', function($scope, $http) 
{
    $scope.cadastrar = function(pessoa)
    {
        console.log("entrou cadastrar");
        console.log(pessoa);
       
         if(pessoa.senha != pessoa.confirmaSenha) {
             
        alert("Error: Senhas não conferem!");
        console.log("senha Errada");
        //pessoa.pwd1.focus();
        return false;
      }else
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
        
        
        //teste validação login
        /*
        var app = angular.module('myApp', []);

app.controller("passwordVerify", function() {
   return {
      require: "ngModel",
      scope: {
        passwordVerify: '='
      },
      link: function(scope, element, attrs, ctrl) {
        scope.$watch(function() {
            var combined;

            if (scope.passwordVerify || ctrl.$viewValue) {
               combined = scope.passwordVerify + '_' + ctrl.$viewValue; 
            }                    
            return combined;
        }, function(value) {
            if (value) {
                ctrl.$parsers.unshift(function(viewValue) {
                    var origin = scope.passwordVerify;
                    if (origin !== viewValue) {
                        ctrl.$setValidity("passwordVerify", false);
                        return undefined;
                    } else {
                        ctrl.$setValidity("passwordVerify", true);
                        return viewValue;
                    }
                });
            }
        });
     }
   };
});
*/
        
        
        
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

/*
    $scope.cadastrarAvaliacao = function (avaliacao)
    {
        console.log(avaliacao);

        function sucessHandler(response)
        {
            console.log(response);
            //alert(response.data.message);
        }
        
        var config =
                {
                    method: "POST",
                    timeout: 10000,
                    responseType: "json",
                    url: "/avaliacao",
                    cache: true,
                    data: avaliacao
                };

        $http(config).then(sucessHandler, errorHandler);
    };
*/    
    
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

    $scope.buscar = function()
    {
        /*
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
            url: "/Pessoa",
            cache: false
        };

        $http(config).then(sucessHandler, errorHandler);
        */
       
    };
    
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
        
        
    $scope.login = function()
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
            url: "/pessoas/1?1",//mudar
            cache: false
        };

        $http(config).then(sucessHandler, errorHandler);
    };
    

    function errorHandler(response)
    {
        console.log(response);
       // alert(response.data.errorMessage);
    }

});
	
