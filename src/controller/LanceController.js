var errorHandler = require("./../util/errorHandler.js");
var Lance = require("./../model/bean/Lance.js");
var LanceRN = require("./../model/rn/LanceRN.js");

module.exports = function(router)
{
	router.post("/lances", function(request, response)
	{
		var data = request.body;
		var lance = new Lance();
		var rn = new LanceRN();
		
		lance.popularLance(data);
		
		
		
		
	
	});
};