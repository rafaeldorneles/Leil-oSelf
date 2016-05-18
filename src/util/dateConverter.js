module.exports = function(date)
{
	if(date != undefined)
	{
		try
		{
			var dataHoraInicio = date.split(' ');
			var data = dataHoraInicio[0].split('-');
			var hora = dataHoraInicio[1].split(':');
			var dObject = new Date(data[0], (data[1] - 1), data[2], hora[0], hora[1], hora[2]);
			return dObject;
		}
		catch(err)
		{
			return null;
		}
	}
	else
		return null;
}