module.exports = function (request, err, response, status)
{
    var param;

    if (isNaN(err.errno) && err.errno)
        param = err.errno;
    else if (isNaN(err.code) && err.code)
        param = err.code;
    else
        param = err.name


    switch (param)
    {
        case "ECONNREFUSED":
            if (status)
                response.status(status).send({menus: request.menus, errorMessage: "Erro ao conectar ao banco de dados", error: err});
            else
                response.status(500).send({menus: request.menus, errorMessage: "Erro ao conectar ao banco de dados", error: err});
            break;
        case "ERR_NUMBER_FIELD":
            if (status)
                response.status(status).send({menus: request.menus, errorMessage: "Erro ao realizar persistência, problemas de vínculo do campo: " + err.field, error: err});
            else
                response.status(400).send({menus: request.menus, errorMessage: "Erro ao realizar persistência, problemas de vínculo do campo: " + err.field, error: err});
            break;
        case "ERR_NULL_FIELD":
            if (status)
                response.status(status).send({menus: request.menus, errorMessage: "Erro ao realizar persistência, problemas de vínculo do campo: " + err.field, error: err});
            else
                response.status(400).send({menus: request.menus, errorMessage: "Erro ao realizar persistência, problemas de vínculo do campo: " + err.field, error: err});
            break;
        case "ERR_DATE_FIELD":
            if (status)
                response.status(status).send({menus: request.menus, errorMessage: "Erro ao realizar persistência, problemas de vínculo do campo: " + err.field, error: err});
            else
                response.status(400).send({menus: request.menus, errorMessage: "Erro ao realizar persistência, problemas de vínculo do campo: " + err.field, error: err});
            break;
        case "ERR_VALIDATION":
            if (status)
                response.status(status).send({menus: request.menus, errorMessage: err.message, error: err});
            else
                response.status(400).send({menus: request.menus, errorMessage: err.message, error: err});
            break;
        case "ERR_RESOURCE_NOT_FOUND":
            if (status)
                response.status(status).send({menus: request.menus, errorMessage: "Recurso não encontrado!", error: err});
            else
                response.status(404).send({menus: request.menus, errorMessage: "Recurso não encontrado!", error: err});
            break;
        case "ERR_RESOURCE_CONFLICT":
            if (status)
                response.status(status).send({menus: request.menus, errorMessage: "Id informado não confere com o objeto enviado", error: err});
            else
                response.status(500).send({menus: request.menus, errorMessage: "Id informado não confere com o objeto enviado", error: err});
            break;
        case "ERR_NOT_AUTHORIZED":
            if (status)
                response.status(status).send({menus: request.menus, errorMessage: "Você não pode acessar esta área, por favor realize login.", error: err});
            else
                response.status(403).send({menus: request.menus, errorMessage: "Você não pode acessar esta área, por favor realize login.", error: err});
            break;
        default:
            if (status)
                response.status(status).send({menus: request.menus, errorMessage: "Erro Indefinido", error: err});
            else
                response.status(500).send({menus: request.menus, errorMessage: "Erro Indefinido", error: err});
            break;
    }
};