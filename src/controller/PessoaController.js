var Pessoa = require("./../model/bean/Pessoa");
var PessoaRN = require("./../model/rn/PessoaRN");
var PessoaDAO = require("./../model/dao/PessoaDAO");
var errorHandler = require("./../util/errorHandler");
var ErrorGenerator = require("./../util/ErrorGenerator");

module.exports = function (router)
{
    //Método de Cadastro
    router.post('/pessoas', function (request, response)
    {
        //Declaração de objetos e recepção de dados do request
        var rn = new PessoaRN();
        var dao = new PessoaDAO();
        var pessoa = new Pessoa();
        var data = request.body;
        //var session = request.session;
        //Popula Bean da Pessoa para validação e persistência
        pessoa.popularPessoa(data);

        //Monta o escopo onde os dados estarão disponíveis, através de callback e executa o cadastro
        rn.cadastrar(pessoa, dao, function (err, dbResponse)
        {
            
            if (err)
            {
                errorHandler(err, response);
            } else
            {
                response.location("http://" + request.hostname + "/pessoas/" + dbResponse);
                response.status(201).send({message: "Pessoa cadastrado com sucesso!"});
            }
        });

    });
    
    //Método de Listagem
    router.get('/pessoas', function (request, response)
    {
        //Declaração de objetos
        var rn = new PessoaRN();
        var dao = new PessoaDAO();

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
    
    
     //Métodologin
    router.post('/pessoas/login', function (request, response)
    {
        //Declaração de objetos e recepção de dados do request
        var rn = new PessoaRN();
        var dao = new PessoaDAO();
        var pessoa = new Pessoa();
        var data = request.body;

       pessoa.popularPessoa(data);
       
       console.log(pessoa);
        rn.login(dao, pessoa, function (err, pessoa)
        {
            if (err)
            {
                errorHandler(err, response);
            } else
            {
                response.status(200).send({pessoa: pessoa});
            }
        });
    });
     //Método de busca por id
    router.get('/pessoas/:id', function (request, response)
    {
        console.log("entrei");
        //Declaração de objetos e recepção de dados do request
        var rn = new PessoaRN();
        var dao = new PessoaDAO();
        var pessoa = new Pessoa();
        var id = request.params.id;
        
        
        pessoa.setId(id);
        

        rn.buscar(dao, pessoa, function (err, pessoa)
        {
            if (err)
            {
                errorHandler(err, response);
            } else
            {
                response.status(200).send({pessoa: pessoa});
            }
        });
    });
    
     //Método de Edição
    router.put('/pessoas/:id', function (request, response)
    {
        //Declaração de objetos e recepção de dados do request
        var rn = new PessoaRN();
        var dao = new PessoaDAO();
        var pessoa = new Pessoa();
        var data = request.body;
        var id = request.params.id;
        var errorGenerator = new ErrorGenerator();
        var session = request.session;

        //Popula Bean do leilão para validação e persistência
        pessoa.popularPessoa(data);

        if (pessoa.getId() != id)
        {
            var error = errorGenerator.getResourceConflictError("id");
            response.location("http://" + request.host + "/pessoas/" + pessoa.getId());
            errorHandler(error, response, 403);
            return;
        }

        //Execução do método de edição
        rn.editar(pessoa, dao,function (err, dbResponse)
        {
            if (err)
            {
                errorHandler(err, response, 304);
            } else
            {
                response.location("http://" + request.host + "/pessoas/" + request.params.id);
                response.status(200).send({message: "Pessoa editada com sucesso!"});
            }
        });

    });

     //Método de exclusão
    router.delete('/pessoas/:id', function (request, response)
    {
        //Declaração de objetos e recepção de dados do request
        var rn = new PessoaRN();
        var dao = new PessoaDAO();
        var pessoa = new Pessoa();
        var data = JSON.parse(request.query.pessoa);
        var id = request.params.id;
        var errorGenerator = new ErrorGenerator();
        var session = request.session;

        //Popula Bean do pessoa para validação e persistência
        pessoa.popularPessoa(data);

        if (pessoa.getId() != id)
        {
            var error = errorGenerator.getResourceConflictError("id");
            response.location("http://" + request.host + "/pessoas/" + pessoa.getId());
            errorHandler(error, response, 403);
            return;
        }
        //Método que executa a exclusão dos dados
        rn.deletar(pessoa, dao, function (err)
        {
            if (err)
                errorHandler(err, response);
            else
                response.status(200).send();
        });

    });
};