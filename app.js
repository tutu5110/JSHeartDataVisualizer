var express = require('express');
var app = express();
var hbs = require('hbs');
var fs = require('fs');
var path = require("path");
var fl = require('./fileLoader');
var Func = require('./Functions');
var f = "";
var p = "./data/";
var fn = "haha";

//var graph = require('dygraphs');

fs.readdir(p,function (err, files){
		if(err){
			console.log("unable to find");
			throw err;
		}

		files.map(function (file) {
        return path.join(p, file);
	    }).filter(function (file) {
	        return fs.statSync(file).isFile();
	    }).forEach(function (file) {
	        console.log("%s (%s)", file, path.extname(file));
	        f = file;
	        var tmp = file.match("data(.*)txt");
	        if(tmp.length > 1)
	        	fn = tmp[1].substring(1, tmp[1].length-1);	
	        else
	        	fn = "NA";
	        Func.setFileList(fn, f);
	     	

	    });
}) ;

app.use(express.static('public'));
app.use('/images', express.static('public'));
app.use('/js', express.static('public'));

app.use(express.static('files'));

app.set('view engine', 'html');
app.engine('html', hbs.__express);
var bodyParser = require('body-parser'); 
app.use(bodyParser()); 


app.get('/', function(req, res) {
	
    res.render('index',{title:"My Blog", entries:fl.getBlogEntries(), list:f,fname:fn, fileList:Func.getFileList()});
});
 
app.get('/about', function(req, res) {
    res.render('about', {title:"About Me"});
});

app.get('/images/mlab_logo_bw.png', function(req, res) {
    res.sendfile(__dirname + '/images/mlab_logo_bw.png');
});

app.get('/images/UPenn_logo_white.png', function(req, res) {
    res.sendfile(__dirname + '/images/UPenn_logo_white.png');
});

app.get('/images/heart.png', function(req, res) {
    res.sendfile(__dirname + '/images/heart.png');
});

app.get('/js/jquery-1.11.3.min.js', function(req, res) {
    res.sendfile(__dirname + '/js/jquery-1.11.3.min.js');
});

app.get('/css/style.css', function(req, res) {
    res.sendfile(__dirname + '/css/style.css');
});

app.get('/js/Chart.js', function(req, res) {
    res.sendfile(__dirname + '/js/Chart.js');
});

app.get('/graph/:fname', function(req, res) {
    var filename = req.params.fname;
    var fileLoader = req.query.fileLoader || 'EGM1-1-1';
	var fcolor = req.query.color || 'black';
	var call = req.query.call || '-1';
	//get last digits
	var series = fileLoader+"";
	series = series.substring(series.lastIndexOf("-")+1,series.length);
	console.log(series);
	var readyState = 0;
	var t = {};
	var node = {};
	var path = {};
	console.log(call);
	if(call == 1){

		var exec = require('child_process').exec;
		// make sure to enter a relative path (which your exe must be in the root folder)
		// or an absolute path!
		var cmd = 'BOCNET_Client.exe';
		console.log("got here");
		exec(cmd, function(error, stdout, stderr) {
		  // command output is in stdout
		  console.log("ok!");
		  console.log(error);

		});
	}
    fs.readFile('./data/EGM1-1-'+series+'.txt', 'utf8', function (err,data) {
		  if (err) {
		    return console.log(err);
		  }
		  	
		  	
		  	t = Func.convert2CSV(data);
		  //	console.log(t);
			//res.render('graph', {LABELS:Func.getMerged(t,"label",arrLen),DATA:Func.getMerged(t,"data",arrLen)});	  

			readyState ++;
			console.log(readyState);
	});

	fs.readFile('./data/Path1-1-'+series+'.txt', 'utf8', function (err,data) {
		if (err) {
		    return console.log(err);
		  }
		  var arrLen = data.split("\n").length;
		  path = Func.convert2CSV(data,true);
		  readyState++;
		  console.log(readyState);
	});

	fs.readFile('./data/Node1-1-'+series+'.txt', 'utf8', function (err,data) {
		if (err) {
		    return console.log(err);
		  }
		  var arrLen = data.split("\n").length;
		  node = Func.convert2CSV(data,true);
		  readyState++;
		  console.log(readyState);
	});


    var intervalID = setInterval(function(){


	   	if(readyState == 3){
			res.render('graph', {CSV:t,PATH:path,NODE:node,color:fcolor,fileList:Func.getFileList(),list:f,fname:fn});	 
			clearInterval(intervalID);
			console.log("its done!!!!!!");

		} 

    }, 100);

    
});

 
app.get('/article/:id', function(req, res) {
    var entry = fl.getBlogEntry(req.params.id);
    res.render('article',{title:entry.title, blog:entry});
});
 
app.listen(3000);