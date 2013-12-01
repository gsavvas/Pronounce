//ipa letters:
/*
Consonants
p	pen, copy, happen
b	back, baby, job
t	tea, tight, button
d	day, ladder, odd
k	key, clock, school
g	get, giggle, ghost
tʃ	church, match, nature
dʒ	judge, age, soldier
f	fat, coffee, rough, photo
v	view, heavy, move
θ	thing, author, path
ð	this, other, smooth
s	soon, cease, sister
z	zero, music, roses, buzz
ʃ	ship, sure, national
ʒ	pleasure, vision
h	hot, whole, ahead
m	more, hammer, sum
n	nice, know, funny, sun
ŋ	ring, anger, thanks, sung
l	light, valley, feel
r	right, wrong, sorry, arrange
j	yet, use, beauty, few
w	wet, one, when, queen
ʔ	(glottal stop)
department, football
Vowels
ɪ	kit, bid, hymn, minute
e	dress, bed, head, many
æ	trap, bad
ɒ	lot, odd, wash
ʌ	strut, mud, love, blood
ʊ	foot, good, put
iː	fleece, sea, machine
eɪ	face, day, break
aɪ	price, high, try
ɔɪ	choice, boy
uː	goose, two, blue, group
əʊ	goat, show, no
aʊ	mouth, now
ɪə	near, here, weary
eə	square. fair, various
ɑː	start, father
ɔː	thought, law, north, war
ʊə	poor, jury, cure
ɜː	nurse, stir, learn, refer
ə	about, common, standard
i	happy, radiate. glorious
u	thank you, influence, situation
n̩	suddenly, cotton
l̩	middle, metal
ˈ	(stress mark)
*/

var chars = "pbtdkgtʃdʒfvθðszʃʒhmnŋlrjwʔɪeæɒʌʊiːeɪaɪɔɪuːəʊaʊɪəeəɑːɔːʊəɜːəiun̩l̩ˈ";
var ipa_special = "ʃʒθðsʃʒŋʔɪeæɒʌʊːɪɪɔɪːəʊaʊɪəeəɔːʊəɜəu̩lˈ";
var regex = "[" + ipa_special + "]+[" + chars + "]*";
window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;
  console.log("received event:" + event.data.type);
  if (event.data.type && (event.data.type == "play_word")) {
    //pass string to background page to play, can't play in the content script
    chrome.extension.sendRequest({method: "play_word", word: event.data.text }, function(response) {
      console.log("send request to play");

    } );  
    console.log("Content script received: " + event.data.text);
    //port.postMessage(event.data.text);
  }
}, false);

$('body').makeLink('a','http://example.com');

/*
//pass test string to background page to play
chrome.extension.sendRequest({method: "play_word", word: "abc efg"}, function(response) {
  console.log("send request to play");

 } );  
 */
