var SessionManager = require("./../util/SessionManager");

var perfil =
{
	href: "#/perfil",
	icon: false,
	text: "Perfil",
	src: "img/user.svg"
};

var meusLeiloes =
{
	href: "#/leiloes-leiloes",
	icon: false,
	text: "Meus Leilões",
	src: "img/meus-lances.svg"
};

var lances =
{
	href: "#/meus-lances",
	icon: false,
	text: "Meus Lances",
	src: "img/meus-lances.svg"
};

var leiloesAbertos =
{
	href: "#leiloes-abertos",
	icon: false,
	text: "Leilões Abertos",
	src: "img/leiloes-abertos.svg"
};

var leilaoNovo =
{
	href: "#/leiloes-novo",
	icon: false,
	text: "Leilão Novo",
	src: "img/new-file.svg"
};

var sobre =
{
	href: "#/sobre",
	icon: false,
	text: "Sobre",
	src: "img/info.svg"
};

module.exports = function (request, response, next)
{
	var sessionManager = new SessionManager();
	var menus = [];
	if(sessionManager.isLogged(request.session) || (process.env.NODE_ENV == "development" && process.env.SESSION == "false"))
	{
		menus.push(perfil);
		menus.push(meusLeiloes);
		menus.push(lances);
		menus.push(leiloesAbertos);
		menus.push(leilaoNovo);
		menus.push(sobre);
	}
	else
	{
		menus.push(leiloesAbertos);
		menus.push(sobre);
	}

	request.menus = menus;
};


