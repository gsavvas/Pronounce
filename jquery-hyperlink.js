/* modified version of a highlight function for jquery, original developed by Johann Bukard; alterations done by Adam Savvas
MIT license also applies to modified version

*/

//original credit that went with highlight
/*
highlight v3
Highlights arbitrary terms.
<http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html>
MIT license.
Johann Burkard
<http://johannburkard.de>
<mailto:jb@eaio.com>

*/

var linkRuns = 0

jQuery.fn.makeLink = function(pat, mcolor) {
 function innerLink(node, pat) {
  var skip = 0;
  linkRuns = linkRuns + 1;
  if (linkRuns > 100){ return false;}
  if (node.nodeType == 3) {
   var match = pat.exec(node.data);
   //var pos = node.data.toUpperCase().indexOf(pat);
   var pos = node.data.indexOf(match);
   //var pos = pat.lastIndex;
   //if (pos >= 0) {
   if (pat.test(node.data)) {
    console.log("Found match:" + match);
    //var spannode = document.createElement('span');
	var spannode = document.createElement('a');
    //spannode.className = 'highlight';
	//spannode.style.color = '66C';
	//spannode.href=mcolor;
	spannode.href = "javascript:void window.postMessage({ type:'play_word', text:'" + match + "'}, '*');";
	//spannode.text = "<a href='www.example.com'>" + spannode.text + "</a>";
    var middlebit = node.splitText(pos);
    var endbit = middlebit.splitText(match.length);
    var middleclone = middlebit.cloneNode(true);
	//middleclone.data = "<a href='www.example.com'>" + middleclone.data + "</a>";
	//middleclone.href = "http://example.com";
	console.log("data:" + middleclone.data +", link: " + spannode.href);
    spannode.appendChild(middleclone);
	//console.log(spannode.data);
    middlebit.parentNode.replaceChild(spannode, middlebit);
    skip = 1;
   }
  }
  else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
   for (var i = 0; i < node.childNodes.length; ++i) {
    i += innerLink(node.childNodes[i], pat);
	console.log("child node" + i);
   }
  }
  
  
  return skip;
 }
 return this.each(function() {
  innerLink(this, pat);
 });
};
