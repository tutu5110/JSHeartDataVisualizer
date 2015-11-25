var fileData = [];
var w = [
{"id":1, "title":"Hello World!", "body":"This is the body of my blog entry. Sooo exciting.", "published":"6/2/2013"},
{"id":2, "title":"Eggs for Breakfast", "body":"Today I had eggs for breakfast. Sooo exciting.", "published":"6/3/2013"},
{"id":3, "title":"Beer is Good", "body":"News Flash! Beer is awesome!", "published":"6/4/2013"},
{"id":4, "title":"Mean People Suck", "body":"People who are mean aren't nice or fun to hang around.", "published":"6/5/2013"},
{"id":5, "title":"I'm Leaving Technology X and You Care", "body":"Let me write some link bait about why I'm not using a particular technology anymore.", "published":"6/10/2013"},
{"id":6, "title":"Help My Kickstarter", "body":"I want a new XBox One. Please fund my Kickstarter.", "published":"6/12/2013"}];
 

exports.setFileList = function(filename, path){
	var ct = fileData.length;
	fileData.push({"filename": ""+filename+""});
}
exports.getFileList = function(){
		return fileData;
}
exports.fetchData = function(data) {
	
	var tmp = data.split("\n");
	var len = tmp.length;
	var t = {};

	for(var i = 0 ; i < len; i ++){
		t[i] = tmp[i].trim().split(/\s+/);
		// sanitize counter
		t[i][0] = parseFloat(t[i][0].substring(0, t[i][0].length - 4)).toFixed(2);
		for(var j = 1; j<3; j++)
			t[i][j] = calFigure(t[i][j]);
	}
    return t;
}

exports.convert2CSV = function(data){
	var tmp = data.split("\n");
	var len = tmp.length;
	var t = {};
	var numrols = 0;
	var strBuilder = "";
	for(var i = 0 ; i < len ; i ++){
		t[i] = tmp[i].trim().split(/\s+/);

		// sanitize counter
	
		if(numrols == 0)
			numrols = t[i].length;
		for(var j = 0; j<numrols; j++){
			t[i][j] = calFigure(t[i][j]);
			strBuilder += t[i][j]+",";
		}
		strBuilder = strBuilder.substring(0,strBuilder.length-1);
		strBuilder+=";";
	}
	return strBuilder;
}

exports.getMerged = function(data,type,len){
	var str = "";
	switch(type){
		case "label":
		for(var i = 0 ; i < len; i ++){
			str = str + data[i][0]+",";
		}
		break;

		case "data":
		for(var i = 0 ; i < len; i ++){
			str = str + data[i][1]+",";
		}
		break;

		default:
		break;

	}

	return str.substring(0,str.length-1);
}

function calFigure(num){
	if(num != undefined){
	var tmp = num.split("e");
	return (tmp[0] * Math.pow(10,tmp[1])).toFixed(5);
	}
	return num;
 }