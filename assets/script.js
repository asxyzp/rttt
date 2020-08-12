//Client-side script for rttt to provide interactivity & send/get requests
//Created by asxyzp (Aashish Loknath Panigrahi)

let randomCharArr = [];		//Stores A-Z
let randomNumArr = [];		//Stores 0-9

/*
	Function : generateArrElements()
	Functionality : Adds elements to the arrays randomCharArr & randomNumArr
	Parameters : NONE
	Return value : NONE
*/
let generateArrElements = () =>{
	//Adding 0-9 & A-Z to the randomNumArr & randomCharArr respectively
	//String.fromCharCode() converts number to string 
	for(let i=0;i<=9;i++)
		randomNumArr.push(i);
	for(let i=65;i<=65+25;i++)
		randomCharArr.push(String.fromCharCode(i));
}
generateArrElements();

/*
	Function : generateRandomID()
	Functionality : Generates 7-digit random ID for the game
	Parameters : NONE
	Return value : SevenDigitRandomString -  A seven digit random string
*/
let generateRandomID = () => {
	let SevenDigitRandomString ='';		//Stores the seven digit pseudo-random ID
	for(let i=0;i<4;i++)
		SevenDigitRandomString+=randomCharArr[Math.floor(Math.random()*randomCharArr.length)];
	for(let i=0;i<3;i++)
		SevenDigitRandomString+=randomNumArr[Math.floor(Math.random()*randomNumArr.length)];
	return SevenDigitRandomString;
}


//Performing DOM operations using jQuery
$(document).ready(function(){
	//Message which shows temporary ID is hidden by default
	$('.tempID-msg').hide();
	
	//To handle request to the server when the "Generate Random ID" button is clicked & to show it generates random ID
	$('.tempID-button').click(function(){
		//Stores randomly generated ID everytime when the "Generate Random ID" button is clicked
		let randomID = generateRandomID();

		//Copies TenDigitRandomString to the clipboard
		navigator.clipboard.writeText(randomID);	

		$('.tempID-msg').show();			//Message which shows temporary ID is shown.
		$('.tempID-show').text(randomID);	//Box shows the temporary ID
		$('.send-request-form').css('display','flex');	//Form for sending game request is also shown when the button is clicked

		//Sending request to server that a new user has been added
		//Response could either be ERROR or SUCCESS
		fetch("/newUser?="+randomID+'/')
		.then(response=>response.text())
		.then(msg=>{

			//successTxt stores stores the text in success message.
			let successTxt =`🙌 Yass! You're now connected to the game server using temporary ID <strong>${randomID}</strong>.`;

			//successMsg is the message which will be displayed when a new temporary ID has been successfully generated 
			let successMsg =`
			<div class='alert alert-success' id='alert-server-connect-success' role='alert'>
				<span class='alert-text'>${successTxt}</span>
			</div>`;
			
			//Error text is the text in the error message
			let errorTxt = `😓 Whoops! You can't connect to the game server. Try again.`;
			
			//Error message contains the HTML tags which will be displayed when response is 'ERROR'
			let errorMsg = `
					<div class='alert alert-danger' id='alert-server-connect-error' role='alert'>
						<span class='alert-text'>
							${errorTxt}
						</span>
					</div>`;

			//When the user has successfully created a temporary ID then a message will be sent
			if(msg=="SUCCESS"){
				console.log(msg);
				$(".notification-box").append(successMsg);
			}
			else{
				console.log(msg);
				$(".notification-box").append(errorMsg);
			}
		});
	});

	//To change the text in the notfication toggle button
	window.setInterval(function(){
		$("#notification-btn").html($(".notification-box").children().length);
		//Changing the notification box color based on the number of notifications
		//When notification>0 then color of btn is red
		//No notification text will also be displayed depending on this count
		if($(".notification-box").children().length!=0){			 
			$("#notification-btn").removeClass("btn-primary");
			$("#notification-btn").addClass("btn-danger");
			$(".no-notification-txt").css('display','none');
		}
		//Otherwise the color of notification btn is blue 
		else{
			$("#notification-btn").removeClass("btn-danger");
			$("#notification-btn").addClass("btn-primary");
			$(".no-notification-txt").css('display','block');
		}
	},100);
	
	//Hiding the notification box by default
	$(".notification-div").hide();
	//Toggling the notification box 
	$("#notification-btn").click(function(){
		$(".notification-div").toggle();
	});
});