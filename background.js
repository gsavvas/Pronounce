//background page for chrome extension

var word = ""; //word to play (may actually be a paragraph, etc)
var audio = new Audio; //audio channel
var current = 0; //current character we're on
//var len = 0;

init();


function init(){
/*	audio = $('#audio');
	current = $('#current');
	len = $('#len');*/
	
	audio.addEventListener('ended', function(e){
		current++;
		if (current >= word.length ){
		 return "True";
		}
		letter = word[current];
		audio.src = file_from_letter(letter);
		audio.play();
	
	}
	);

}


function file_from_letter(letter){
	//var base_url = "chrome-extension://" + chrome.i18n.getMessage("@@extension_id") +"/"
	//var sound =  base_url + "/sounds/beep.mp3";
	//var sound = base_url + "sounds/boop.wav";
	var sound = chrome.extension.getURL("sounds/boop.wav")
	return sound;
}

function play_word(mword){
	var chars = mword.split("") //string becomes array of characters
	var sound = new Audio;
	for ( i = 0; i < chars.length; i++) {
	//document.write(chars[i])
		var sound = new Audio(file_from_letter(chars[i])) ;
		sound.play();
		document.write(file_from_letter(chars[i]));
		document.write("<br>");
		
		
	}

}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "play_word"){
		//play_word(request.word);
		word = request.word;
		current = 0;
		audio.src = file_from_letter(word[current]);
		audio.play();
      sendResponse({success: 'True' });
	  }
    else{
      sendResponse({}); // snub them.
	  }
});