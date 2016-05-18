module.exports = function(date)
{
	var stringDate = date.getFullYear() + "-" 
	if(date.getMonth().length < 2)
		stringDate += "0";
	
	stringDate +=  date.getMonth() + "-";
	
	if(date.getDay().length < 2)
		stringDate += "0";
	
	stringDate += date.getDate() + " ";
	
	if(date.getHours().length < 2)
		stringDate += "0";
	
	stringDate += date.getHours() + ":" 
	
	if(date.getMinutes().length < 2)
		stringDate += "0";
	
	stringDate += date.getMinutes() + ":00";
	
	return stringDate;
}