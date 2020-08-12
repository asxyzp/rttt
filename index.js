//Server program for handling tic-tac-toe game
//Created by asxyzp
let http = require('http');
let fs = require('fs');

//users object will store information about all the objects 
let users = {};

http.createServer((req,res)=>{
	//assets object will store location of HTML, CSS & JS file & other objects which will be sent as responses
	let assets={
		LOGO:"assets/rttt.png",
		HTML:"assets/index.html",
		CSS :"assets/style.css",
		JS  :"assets/script.js"
	}
	
	//When the browser requests the main (index.html) page
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

	//When the browser requests CSS file for the main page
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

	//When the browser requests JS file for the main page
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

	//When the user requests for the application LOGO
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

	//Handling all requests related to the game, including adding the new user ID to the users object
	if(req.url.indexOf("/newUser?=")!=-1){
		let newUserID = req.url.substring(
			req.url.indexOf("/newUser?=")+"/newUser?=".length,
			req.url.indexOf("/newUser?=")+"/newUser?=".length+7
		);
		if(newUserID in users == false){
			//Gets timestamp to be stored in the server
			let date = new Date();
			let timeStamp = date.getTime();

			//Storing the userID w/ timestamp in the users object
			users[newUserID]=timeStamp;
			
			//Sending response
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.write("SUCCESS");
			res.end();
			console.log("All users : ",users);
			return console.log('new user '+newUserID+' generated at '+timeStamp);
		}

		//For handling timeout
		if(req.url.indexOf("/timeout?=")!=-1){

			//Extracting user ID
			let userID = req.url.substring(
				req.url.indexOf("/timeout?=")+"/timeout?=".length,
				req.url.indexOf("/timeout?=")+"/timeout?=".length+7
			);

			//Checking if userID exists in users object
			//If yes then userID is deleted from the users object
			if(userID in users == true){
				delete users[userID];	//Delete userID from the user object
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.write("SUCCESS");	//Returning successful timeout response
				res.end();

				//Displaying information in console
				console.log("All users : ",users);
				return console.log('User '+userID+' timed out.');
			}
			//Else if the user ID is not in users object then ERROR msg. is sent
			else{
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.write("ERROR");
				res.end();
				return console.log('Whoops! '+userID+" is not in users object.");
			}
		}

		//Default
		else{
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.write("ERROR");
			res.end();
			return console.log('Whoops!');
		}
	}	
}).listen(5000);