//Server program for handling tic-tac-toe game
//Created by asxyzp
let http = require('http');
let fs = require('fs');

http.createServer((req,res)=>{
	//assets object will store location of HTML, CSS & JS file which will be sent as responses
	let assets={
		LOGO:"assets/rttt.png",
		HTML:"assets/index.html",
		CSS :"assets/style.css",
		JS  :"assets/script.js"
	}
	let users = {};
	if(req.url=="/"){
		fs.readFile(assets.HTML,function(err,HTML){
			if(err){
				res.writeHead(404);
				res.write("Whoops! the file is not available");
				return console.error(err.message);
			}
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(HTML);
			res.end();
			return console.log('HTML file sent');
		});
	}
	if(req.url=="/style.css"){
		fs.readFile(assets.CSS,function(err,CSS){
			if(err){
				res.writeHead(404);
				return console.error(err.message);
			}
			res.writeHead(200, {'Content-Type': 'text/css'});
			res.write(CSS);
			res.end();
			return console.log('CSS file sent');
		});
	}
	if(req.url=='/script.js'){
		fs.readFile(assets.JS,function(err,JS){
			if(err){
				res.writeHead(404);
				return console.error(err.message);
			}
			res.writeHead(200, {'Content-Type': 'application/javascript'});
			res.write(JS);
			res.end();
			return console.log('JS file sent');
		});
	}
	if(req.url=='/rttt.png'){
		fs.readFile(assets.LOGO,function(err,LOGO){
			if(err){
				res.writeHead(404);
				return console.error(err.message);
			}
			res.writeHead(200, {'Content-Type': 'image/png'});
			res.write(LOGO);
			res.end();
			return console.log('LOGO image sent');
		});
	}
	if(req.url.indexOf("/newUser?=")!=-1){
		if(req.url.indexOf("=")==1){

		}
	}	
}).listen(5000);