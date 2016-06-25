module.exports = function (request, response, next)
{
	require("./SecurityMenuInterceptor")(request, response);
	require("./AuthenticationInterceptor")(request, response);
	next();
};