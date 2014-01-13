//background page for chrome extension

var word = ""; //word to play (may actually be a paragraph, etc)
var audio = new Audio; //audio channel
var playlist = [];
var current = 0; //current character we're on
//var len = 0;

//listed in the order we search for them; notably two character combos come before single characters
var supported_sounds = [
	'iː',	
	'ɜː',
	'eɪ',	
	'aɪ',	
	'ɔɪ',	
	'uː',	
	'əʊ',	
	'aʊ',	
	'ɪə',	
	'eə',	
	'ɑː',	
	'ɔː',	
	'ʊə',
	'n̩',	
	'l̩',
	'tʃ',
	'dʒ',
	'p',
	'b',
	't',
	'd',
	'k',
	'g',
	'f',
	'v',
	'θ',
	'ð',
	's',
	'z',
	'ʃ',
	'ʒ',
	'h',
	'm',
	'n',
	'ŋ',
	'l',
	'r',
	'j',
	'w',
	'ʔ',
	'ɪ',
	'e',
	'æ',
	'ɒ',
	'ʌ',
	'ʊ',
	'ə',
	'i',
	'u'			
	]


init();


function init(){
/*	audio = $('#audio');
	current = $('#current');
	len = $('#len');*/
	
	audio.addEventListener('ended', function(e){
		current++;
		if (current >= playlist.length ){
		 return "True";
		}
		//letter = word[current];
		audio.src = playlist[current]; //file_from_letter(letter);
		audio.play();
	
	}
	);

}


function file_from_letter(letter){

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

function playlist_from_word(mword){
	mword = mword.replace("'", ""); //can't handle stress marks
	if (mword.length == 0){
		return [];
	}
	var mlist = [];
	//check for matches with two characters
	if (mword.length > 1) {
		if (supported_sounds.indexOf(mword.substring(0,2)) > -1) {
			mlist.push( chrome.extension.getURL("sounds/" +  mword.substring(0,2) + '.wav') );
			return mlist.concat( playlist_from_word(mword.substring(2, mword.length) ) );
		
		}
	}
	//check for matches with one character list
	if (supported_sounds.indexOf(mword.substring(0,1)) > -1) {
		mlist.push( chrome.extension.getURL("sounds/" + mword.substring(0,1) + '.wav' ) );
		return mlist.concat( playlist_from_word(mword.substring(1, mword.length) ) );
	}
	//otherwise ignore first character and try again
	return playlist_from_word(mword.substring(1, mword.length) );
}
 
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "play_word"){
		//play_word(request.word);
		word = request.word;
		word = word.replace("ɛ", "e");
		
		current = 0;
		playlist = playlist_from_word(word);
		audio.src = playlist[current];//file_from_letter(word[current]);
		audio.play();
      sendResponse({success: 'True' });
	  }
    else{
      sendResponse({}); // snub them.
	  }
});