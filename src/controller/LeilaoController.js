var Leilao = require("./../model/bean/Leilao");
var LeilaoRN = require("./../model/rn/LeilaoRN");
var LeilaoDAO = require("./../model/dao/LeilaoDAO");
var errorHandler = require("./../util/errorHandler");
var ErrorGenerator = require("./../util/ErrorGenerator");

module.exports = function (router)
{
    //Método de Cadastro
    router.post('/leiloes', function (request, response)
    {
        //Declaração de objetos e recepção de dados do request
        var rn = new LeilaoRN();
        var dao = new LeilaoDAO();
        var leilao = new Leilao();
        var data = request.body;
        var session = request.session;

        //Popula Bean do leilão para validação e persistência
        leilao.popularLeilao(data);

        //Monta o escopo onde os dados estarão disponíveis, através de callback e executa o cadastro
        rn.cadastrar(leilao, dao, session, function (err, dbResponse)
        {
            
            if (err)
            {
                errorHandler(err, response);
            } else
            {
                response.location("https://" + request.host + "/leiloes/" + dbResponse.insertId);
                response.status(201).send({message: "Leilão cadastrado com sucesso!"});
            }
        });

    });

    //Método de Listagem
    router.get('/leiloes', function (request, response)
    {
        //Declaração de objetos
        var rn = new LeilaoRN();
        var dao = new LeilaoDAO();

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

    //Método de busca por id
    router.get('/leiloes/:id', function (request, response)
    {
        //Declaração de objetos e recepção de dados do request
        var rn = new LeilaoRN();
        var dao = new LeilaoDAO();
        var leilao = new Leilao();
        var id = request.params.id;

        leilao.setId(id);

        rn.buscar(dao, leilao, function (err, leilao)
        {
            if (err)
            {
                errorHandler(err, response);
            } else
            {
                response.status(200).send({leilao: leilao.retrieveLeilao()});
            }
        });

        //Execução do método que busca pelo id
    });

    router.get('/leiloes/dono/:id', function (request, response)
    {
        //Declaração de objetos e recepção de dados do request
        var rn = new LeilaoRN();
        var dao = new LeilaoDAO();
        var leilao = new Leilao();
        var id = request.params.id;


        leilao.setDono(id);

        rn.buscarPorDono(dao, leilao, function (err, lista)
        {
            if (err)
            {
                errorHandler(err, response);
            } else
            {
                response.status(200).send({lista: lista});
            }
        });

        //Execução do método que busca pelo id
    });

    //Método de Edição
    router.put('/leiloes/:id', function (request, response)
    {
        //Declaração de objetos e recepção de dados do request
        var rn = new LeilaoRN();
        var dao = new LeilaoDAO();
        var leilao = new Leilao();
        var data = request.body;
        var id = request.params.id;
        var errorGenerator = new ErrorGenerator();
        var session = request.session;

        //Popula Bean do leilão para validação e persistência
        leilao.popularLeilao(data);

        if (leilao.getId() != id)
        {
            var error = errorGenerator.getResourceConflictError("id");
            response.location("https://" + request.host + "/leiloes/" + leilao.getId());
            errorHandler(error, response, 403);
            return;
        }

        //Execução do método de edição
        rn.editar(leilao, dao, session, function (err, dbResponse)
        {
            if (err)
            {
                errorHandler(err, response, 304);
            } else
            {
                response.location("https://" + request.host + "/leiloes/" + request.params.id);
                response.status(200).send({message: "Leilão editado com sucesso!"});
            }
        });

    });

    //Método de exclusão
    router.delete('/leiloes/:id', function (request, response)
    {
        //Declaração de objetos e recepção de dados do request
        var rn = new LeilaoRN();
        var dao = new LeilaoDAO();
        var leilao = new Leilao();
        var data = JSON.parse(request.query.leilao);
        var id = request.params.id;
        var errorGenerator = new ErrorGenerator();
        var session = request.session;

        //Popula Bean do leilão para validação e persistência
        leilao.popularLeilao(data);

        if (leilao.getId() != id)
        {
            var error = errorGenerator.getResourceConflictError("id");
            response.location("https://" + request.host + "/leiloes/" + leilao.getId());
            errorHandler(error, response, 403);
            return;
        }

        //Método que executa a exclusão dos dados
        rn.deletar(leilao, dao, session, function (err)
        {
            if (err)
                errorHandler(err, response);
            else
                response.status(200).send();
        });

    });

};