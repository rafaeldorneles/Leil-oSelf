var method = SessionManager.prototype;


function SessionManager()
{

}

method.isLogged = function (session)
{
    if (!session.user)
        return false;

    return true;
};


module.exports = SessionManager;