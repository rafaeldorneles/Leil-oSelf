var method = SessionManager.prototype;


function SessionManager()
{

}

method.isLogged = function (session)
{
    if (!session.get("user"))
        return false;

    return true;
};

method.logar = function (session, usuario)
{
    session.put("user", usuario);
};

method.getUser = function (session)
{
	return session.get("user");
};

module.exports = SessionManager;