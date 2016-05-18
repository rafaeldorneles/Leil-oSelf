angular.module('LeilaoModule', ['AppModule']).controller('LeilaoController', ['$scope', function ($scope) 
{

                $scope.leilao = {};
                $scope.pesquisa = '';
                $scope.editarRegistro = false;
                $scope.informacoes = false;

                $scope.info = function (obj) {
                    $scope.informacoes = true;
                    $scope.leilao = angular.copy(obj)
                };

                $scope.editar = function (obj) {
                    $scope.editarRegistro = true;
                    $scope.leilao = angular.copy(obj);
                };

                $scope.excluir = function (key) {
                    for (var i = 0; i < $scope.lista_leilao.length; i++) {
                        if ($scope.lista_leilao[i].id == key) {
                            $scope.lista_leilao.splice(i, 1);
                            $scope.pesquisa = '';
                        }
                    }
                };

                $scope.salvarEdicao = function () {
                    if (!$scope.leilao.categoria || !$scope.leilao.leilao.descricao || !$scope.leilao.dataHoraInicio || !$scope.leilao.dataHoraFinal
                    || !$scope.leilao.dataHoraExecucao || $scope.leilao.endereco) {
                        alert('Campos obrigatórios não foram preenchidos!');
                        return;
                    }

                    $scope.excluir($scope.leilao.id);

                    $scope.leilao.id = $scope.getFakeID();
                    $scope.lista_leilao.push($scope.leilao);
                    $scope.editarRegistro = false;
                    $scope.redir('/leiloes-abertos');
                };

                $scope.cancelarEdicao = function () {
                    $scope.editarRegistro = false;
                };

                $scope.cancelarLance = function () {
                    $scope.informacoes = false;
                };

                $scope.salvar = function () {
                    if (!$scope.leilao.categoria || !$scope.leilao.leilao.descricao || !$scope.leilao.dataHoraInicio || !$scope.leilao.dataHoraFinal
                    || !$leilao.dataHoraExecucao || $scope.leilao.endereco) {
                        alert('Campos obrigatórios não foram preenchidos!');
                        return;
                    }

                    $scope.leilao.id = $scope.getFakeID();
                    $scope.lista_leilao.push($scope.leilao);
                    $scope.redir('/leiloes-abertos');
                };


            }]);