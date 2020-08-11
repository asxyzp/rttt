//Will be storing elements from which a 7-digit pseudo random character will be generated
let randomCharArr = [];
let randomNumArr = [];

//Adding 0-9 & A-Z to the randomArrElement
//String.fromCharCode() converts number to string 
for(let i=0;i<=9;i++)
	randomNumArr.push(i);
for(let i=65;i<=65+25;i++)
	randomCharArr.push(String.fromCharCode(i));

//Will store 7 digit random string
let generateRandomID = () => {
	let SevenDigitRandomString ='';
	for(let i=0;i<4;i++)
		SevenDigitRandomString+=randomCharArr[Math.floor(Math.random()*randomCharArr.length)];
	for(let i=0;i<3;i++)
		SevenDigitRandomString+=randomNumArr[Math.floor(Math.random()*randomNumArr.length)];
	return SevenDigitRandomString;
}


//Performing DOM operations using jQuery
$(document).ready(function(){
	$('.tempID-msg').hide();
	
	//To handle request to the server when the Generate Random ID button is clicked & to show the generates random ID
	$('.tempID-button').click(function(){
		//Generates & stores randomly generated ID everytime when the "Generate Random ID" button is clicked
		let randomID = generateRandomID();

		//Copies TenDigitRandomString to the clipboard
		navigator.clipboard.writeText(randomID);	

		$('.tempID-msg').show();
		$('.tempID-show').text(randomID);
		$('.send-request-form').css('display','flex');
		
		//Gets timestamp to be stored in the server
		let date = new Date();
		let timeStamp = date.getTime();

		//Sending request to server that a new user has been added
		fetch("/newUser?="+randomID+'&timeStamp?='+timeStamp+'/')
		.then(response=>response.text())
		.then(msg=>{
			//When the user has successfully created a temporary ID then a message will be sent.
			if(msg=="SUCCESS"){
				$(".notification-box").append("<div class='alert alert-success' id='alert-server-connect-success' role='alert'><span class='alert-text'>Yass! You're connected to the server.</span><span class='alert-dismiss'><button type='button' class='close' id='close-success' aria-label='Close'><span aria-hidden='true'>&times;</span></button></span></div>");
			}
			else{
				$(".notification-box").append("YASS");
			}
		});
	});

	//To close the messages in the notification box
	//To close the alert success box when conncected to the server
	$("#close-success").click(function(){
		$("#alert-server-connect-success").remove();
	});
	//To close the alert error box when conncected to the server
	$("#close-error").click(function(){
		$("#alert-server-connect-error").remove();
	});

	//To change the text in the notfication toggle button
	window.setInterval(function(){
		$("#notification-btn").html($(".notification-box").children().length);
		//Changing the notification box color based on the number of notifications
		//When notification>0 then color of btn is red
		if($(".notification-box").children().length!=0){			 
			$("#notification-btn").removeClass("btn-primary");
			$("#notification-btn").addClass("btn-danger");
		}
		//Otherwise the color of notification btn is blue 
		else{
			$("#notification-btn").removeClass("btn-danger");
			$("#notification-btn").addClass("btn-primary");
		}
	},100);
	
	//Hiding the notification box by default
	$(".notification-div").hide();
	//Toggling the notification box 
	$("#notification-btn").click(function(){
		$(".notification-div").toggle();
	});
});