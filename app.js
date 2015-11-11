var express = require('express');
var app = express();
var hbs = require('hbs');
var fs = require('fs');
var path = require("path");
var fl = require('./fileLoader');
var f = "";
var p = "./data/";
var fn = "haha";
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
	    });
}) ;


app.set('view engine', 'html');
app.engine('html', hbs.__express);
var bodyParser = require('body-parser'); 
app.use(bodyParser()); 
 
app.get('/', function(req, res) {
    res.render('index',{title:"My Blog", entries:fl.getBlogEntries(), list:f,fname:fn});
});
 
app.get('/about', function(req, res) {
    res.render('about', {title:"About Me"});
});

app.get('/graph/:fname', function(req, res) {
    var fname = fl.getBlogEntry(req.params.fname);
    res.render('graph');
});

 
app.get('/article/:id', function(req, res) {
    var entry = fl.getBlogEntry(req.params.id);
    res.render('article',{title:entry.title, blog:entry});
});
 
app.listen(3000);