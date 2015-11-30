var listNames = ["AF","AF-PVC","AF-VF","AF-VT","AF-ashman","Aft","Aft-VT","NSVT","PAC","PAC-VF","PVC","SVT","SVT-Wenkebach","SVT-Wenkebach-PVC","SickSinus","VF","VT","VT-PAC","VT-retrograde"];
var fileData = [];


exports.setFileList = function(filename, path){
	var ct = fileData.length;
	var index = parseInt(filename.substring(filename.lastIndexOf("-")+1, filename.length))-1;
	var senario = listNames[index];
	if(filename.indexOf("EGM") != -1)
		fileData.push({"filename": ""+filename+"","senario": ""+senario+""});
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

exports.convert2CSV = function(data,isInt){
	isInt = isInt || false;
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
			if(!isInt)
				t[i][j] = calFigure(t[i][j]);
			else
				t[i][j] = calFigure(t[i][j],true);
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

function calFigure(num,isInt){
	isInt = isInt || false;
	if(num != undefined){
	var tmp = num.split("e");
	if(!isInt)
		return (tmp[0] * Math.pow(10,tmp[1])).toFixed(5);
	else
		return (tmp[0] * Math.pow(10,tmp[1])).toFixed(0);
	}
	return num;
 }

