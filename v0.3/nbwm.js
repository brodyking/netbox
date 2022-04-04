// This is the startup stuff. This creates the terminal.

document.body.innerHTML += "<div class='nav'><button style='float: left' onclick='terminal()'>>_</button></div>"

// Create new link Element
var link = document.createElement('link'); 

// set the attributes for link element
link.rel = 'stylesheet'; 

link.type = 'text/css';

link.href = 'nbwm.css'; 

// Get HTML head element to append 
// link element to it 
document.getElementsByTagName('HEAD')[0].appendChild(link); 
