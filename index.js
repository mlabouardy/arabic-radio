var express=require('express');
var fs=require('fs');
var bodyParser = require('body-parser')
var async = require('async');
var JSFtp = require("jsftp");
var app=express();



var Ftp = new JSFtp({
  host: "server",
  port: 21, // defaults to 21
  user: "", // defaults to "anonymous"
  pass: "" // defaults to "@anonymous"
});

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



function update(data){
	var calls = [];
	data.forEach(function(tmp){
	    calls.push(function(callback) {
	    	var country=tmp.name;
			country=country.toLowerCase();
			country=country.replace(/ /g, '-');
			var path='./models/'+country+'.json';
	    	fs.readFile(path, function (err, data) {
	    		if (err)
	                return callback(err);
	            console.log('count '+tmp.name);
	            var data={
	            	name:tmp.name,
	            	flag:tmp.flag,
	            	total:JSON.parse(data).length
	            }
	            callback(null, data);
	    	})
	    })
	});
	async.parallel(calls, function(err, result) {
	    if (err)
	        return console.log(err);
	    fs.writeFile('./models/countries.json', JSON.stringify(result, null, 4), function(err) {
		    if(err) {
		        return console.log(err);
		    }
		    console.log("updated !");
		});
	});
}


app.get('/upload/:name',function(req,res){
	var name=req.params.name.toLowerCase();
	name=name.replace(/ /g, '-');
	var path='models/'+name+'.json';
	fs.readFile(path, function(err, buffer) {
     if(err) {
         console.error(err);
     }
     else {
         Ftp.put(buffer, '/public_html/radio/arabic/'+name+'.json', function(err) {
             if (err) {
                 console.error(err);
             }
             else {
             	 console.error(name+" uploaded successfuly");
             }
         });
         res.send(200);
     }
 });
});

app.get('/update',function(req,res){
	fs.readFile('./models/countries.json', function (err, data) {
	  if (err) throw err;
	  data=JSON.parse(data);
	  update(data);
	  res.send(200);
	});
});


app.get('/init',function(req,res){
	fs.readFile('./models/countries.json', function (err, data) {
	  if (err) throw err;
	  data=JSON.parse(data);
	  console.log(data.length);
	  for(var i=0;i<data.length;i++){
	  	var country=data[i].name;
		country=country.toLowerCase();
		country=country.replace(/ /g, '-');
	  	var path='./models/'+country+'.json';
		fs.writeFile(path, "[]", function(err) {
		    if(err) {
		        return console.log(err);
		    }
		    console.log(country+".json was saved!");
		}); 
	  }
	});
	
});

app.get('/countries',function(req,res){
	fs.readFile('./models/countries.json', function (err, data) {
	  if (err) throw err;
	  res.send(data.toString());
	});
});

app.get('/country/:name',function(req,res){
	var country=req.params.name;
	country=country.toLowerCase();
	country=country.replace(/ /g, '-');
	var path='./models/'+country+'.json';
	fs.readFile(path, function (err, data) {
	  if (err) throw err;
	  console.log(country+".json parsed!");
	  res.send(data.toString());
	});
});

app.post('/country/:name',function(req,res){
	var country=req.params.name;
	country=country.toLowerCase();
	country=country.replace(/ /g, '-');
	var path='./models/'+country+'.json';
	var data=req.body;
	fs.writeFile(path, JSON.stringify(data, null, 4), function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log(country+".json was saved!");
	}); 
	res.status(200);
});

app.listen(3000,function(){
	console.log('Listening !');
});
