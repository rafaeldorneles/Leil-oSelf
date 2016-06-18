var Avaliacao = require("./../model/bean/Avaliacao");
var AvaliacaoDAO = require("./../model/dao/AvaliacaoDAO");
var Avaliacao = require("./../model/bean/Avaliacao");
var AvaliacaoRN = require("./../model/rn/AvaliacaoRN");
var AvaliacaoDAO = require("./../model/dao/AvaliacaoDAO");
var errorHandler = require("./../util/errorHandler");
var ErrorGenerator = require("./../util/ErrorGenerator");

module.exports = function (router)
{
    //Método de Cadastro
    router.post('/avaliacao', function (request, response)
    {
        //Declaração de objetos e recepção de dados do request
        var rn = new AvaliacaoRN();
        var dao = new AvaliacaoDAO();
        var avaliacao = new Avaliacao();
        var data = request.body;
        //var session = request.session;

        //Popula Bean do leilão para validação e persistência
        avaliacao.popularAvaliacao(data);
        console.log("Qualquer merda - avaliacao");

        //Monta o escopo onde os dados estarão disponíveis, através de callback e executa o cadastro
        rn.cadastrar(avaliacao, dao,  function (err, dbResponse)
        {
            
            if (err)
            {
                errorHandler(err, response);
                console.log("erro");
                
            } else
            {
                response.location("http://" + request.hostname + "/avaliacao/" + dbResponse);
                response.status(201).send({message: "Avaliacao registrada com sucesso!"});
                console.log("sucesso");
            }
        });
    });

    //Método de Listagem
    router.get('/avaliacao', function (request, response)
    {
        //Declaração de objetos
        var rn = new AvaliacaoRN();
        var dao = new AvaliacaoDAO();

        //Execução do método que lista
        rn.listar(dao, function (err, lista)
        {
            if (err)
            {
                errorHandler(err, response);
            } else
            {
                response.status(200).send({lista: lista});
            }
        });
    });
};