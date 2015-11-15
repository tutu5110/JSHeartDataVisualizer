var fileData = [];
exports.setFileList = function(filename, path){
	fileData.push("{filename:"+filename+",path:"+path+"}");
}
exports.getFileList = function(){
	return fileData;
}
exports.fetchData = function(data) {
	
	var tmp = data.split("\n");
	var len = tmp.length;
	var t = {};

	for(var i = 0 ; i < len; i ++){
		t[i] = tmp[i].trim().split("   ");
		// sanitize counter
		t[i][0] = parseFloat(t[i][0].substring(0, t[i][0].length - 4)).toFixed(2);
		for(var j = 1; j<4; j++)
			t[i][j] = calFigure(t[i][j]);
	}
    return t;
}

exports.convert2CSV = function(data){
	var tmp = data.split("\n");
	var len = tmp.length;
	var t = {};
	var strBuilder = "";
	for(var i = 0 ; i < len ; i ++){
		t[i] = tmp[i].trim().split(/\s+/);

		// sanitize counter
		t[i][0] =i;
		strBuilder = strBuilder + t[i][0]+",";
		for(var j = 1; j<4; j++){
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