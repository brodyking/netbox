// This is the startup stuff. This creates the terminal.

document.body.innerHTML += "<div class='nav'><span onclick='terminal()' style='float: left;'>terminal</span>&nbsp;<span style='float: right;background-color: #800000; color: white;'>v0.1</span></div>"

// Create new link Element
var link = document.createElement('link'); 

// set the attributes for link element
link.rel = 'stylesheet'; 

link.type = 'text/css';

link.href = 'nbwm.css'; 

// Get HTML head element to append 
// link element to it 
document.getElementsByTagName('HEAD')[0].appendChild(link); 
