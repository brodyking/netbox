// Variables

function terminalSubmit() { // terminal command subbmitted
  document.getElementById('terminalinput').addEventListener('keyup', function (evt) {
      if (evt.keyCode === 13) { // if enter key pressed
        commandLookup(); // starts command lookup
      } // end
    }); // end
  }

function terminal() {
popupCreate("terminal",'<div id="terminline"><span id="terminaloutput"></span><span id="preinput">root@netbox $ </span><span contenteditable="true" id="terminalinput" onclick="selectText(this.id)">_</span></div><div id="termblock"></div>');
// checking if you submitted a command // starts the listner for enter key pressed. function above.
}
// Highlight Script
function selectText(id) { 
  var sel, range;
  var el = document.getElementById(id); //get element id
  if (window.getSelection && document.createRange) { //Browser compatibility
    sel = window.getSelection();
    if (sel.toString() == '') { //no text selection
      window.setTimeout(function () {
        range = document.createRange(); //range object
        range.selectNodeContents(el); //sets Range
        sel.removeAllRanges(); //remove all ranges from selection
        sel.addRange(range);//add Range to a Selection.
      }, 1);
    }
  } else if (document.selection) { //older ie
    sel = document.selection.createRange();
    if (sel.text == '') { //no text selection
      range = document.body.createTextRange();//Creates TextRange object
      range.moveToElementText(el);//sets Range
      range.select(); //make selection.
    }
  }
}


// close popup
function popupClose(title) { // start of function
	document.getElementById(title).remove(); // removes the window
} // end

// create popup
var popupCurrentlyFocused = "netbox";
// creates currently focused menu
function popupCreate(title, body) { // start function
	// generates post:
	if (document.getElementById(title) == null) {
    //if (title == "terminal") {
    //  document.body.innerHTML += '<div id="' + title + '" style="top: 30px; left: 5px;" class="popup" onmouseenter="terminalSubmit();dragElement(document.getElementById(' + "'" + title + "'" + '));popupCurrentlyFocused = ' + "'" + title + "'" + '"><div class="top" id="' + title + 'top">' + title + '<button style="float: right;margin-left: 3px;" class="popupCloseButton" onclick="popupClose(' + "'" + title + "'" + ')">x</button></div><div class="popupbody">' + body + '</div></div>';
    //} else {
		document.body.innerHTML += '<div id="' + title + '" style="top: 30px; left: 5px;" class="popup" onmouseenter="dragElement(document.getElementById(' + "'" + title + "'" + '));popupCurrentlyFocused = ' + "'" + title + "'" + '"><div class="top" id="' + title + 'top">' + title + '<button style="float: right;margin-left: 3px;" class="popupCloseButton" onclick="popupClose(' + "'" + title + "'" + ')">x</button></div><div class="popupbody">' + body + '</div></div>';
    //}
  }
  terminalSubmit()
}

// Terminal Inline
function terminline(text) { // start of function
	document.getElementById("terminaloutput").innerHTML += text + "<br>"; // writes to term
} // end

// Terminal Fullscreen
function termblock(text) { // start of function
	document.getElementById("terminline").style.display = "none"; // Hides inline.
	document.getElementById("termblock").style.display = "block"; // Shows fullscreen.
	document.getElementById("termblock").innerHTML = text; // Sets the body.
}

// Return to inline mode
function termreturn() { // start of function
	document.getElementById("terminline").style.display = "block"; // Shows inline.
	document.getElementById("termblock").style.display = "none"; // Hides fullscreen.
	document.getElementById("termblock").innerHTML = ""; // Resets the fullscreen bdoy
}



//Make the DIV element draggagle:

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "top")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "top").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

var appsCurrentlyInstalled = 0;

// Command Database
const commands = []; // creates the db
commands["help"] = "termblock('<termhead><u style=" + '"' + "float: left" + '"' + "onclick=" + '"' + "termreturn()" + '"' + ">return</u>Command List</termhead><ul style=" + '"' + "list-style: none;margin: 0px;" + '"' + "><li>help <highlight>shows help commands</highlight></li><li>echo [text] <highlight> lets you echo text</highlight></li><li>clear <highlight> clears the terminal</highlight></li><li>js [command] <highlight> run js commands</highlight></li><li>version <highlight> shows system info</highlight></li><li>cf [name] <highlight> lets you create files</highlight></li><li>ef [name] <highlight> lets you edit files</highlight></li><li>rf [name] <highlight> lets you read files</highlight><li><li>df [name] <highlight> lets you delete files</highlight></li><li>install [full package url] <highlight> install packages onto your system</highlight></li><li>reboot <highlight> lets you reboot the system</highlight></li></ul>');";
commands["echo"] = "terminline(document.getElementById('terminalinput').textContent.slice(4,Infinity))";
commands["clear"] = "document.getElementById('terminaloutput').innerHTML = ''";
commands["js"] = "eval(document.getElementById('terminalinput').textContent.slice(3,Infinity));terminline('<highlight> ' + document.getElementById('terminalinput').textContent.slice(3,Infinity) + '</highlight> was run by the OS.')";
commands["version"] = "terminline('<b>user: </b>root@netbox<br><b>window-manager: </b>" + wm + "<br><b>version: </b> 0.5<br><b>last-updated: </b> 03/18/2022')";

function commandLookup() { // looks at the list of commands
	document.getElementById("terminaloutput").innerHTML += "<highlight>root@netbox  $ " + document.getElementById("terminalinput").textContent + "</highlight><br>";
	if (commands[document.getElementById('terminalinput').textContent.split(' ').shift()] == undefined) { // checks if it is unset
		terminline(document.getElementById("terminalinput").textContent + " is not a valid command.") // tells the user it is not real
	} else { // if it is a command
		eval(commands[document.getElementById('terminalinput').textContent.split(' ').shift()]); // it will run the command
	} 
	document.getElementById("terminalinput").innerHTML = "_"; // resets the terminal input
	selectText('terminalinput');
	var elem = document.getElementById('terminline');
    elem.scrollTop = elem.scrollHeight;
}

// Saving Files
function filesCreate() {
	if (localStorage.getItem(document.getElementById("terminalinput").textContent.slice(3,Infinity)) == null) {
		localStorage.setItem(document.getElementById("terminalinput").textContent.slice(3,Infinity),'_');
		if (localStorage.getItem('ls') == null) {
			localStorage.setItem("ls","<span id='" + document.getElementById("terminalinput").textContent.slice(3,Infinity) + "ls'>" +  document.getElementById("terminalinput").textContent.slice(3,Infinity) + "</span><br>")
		} else {
			localStorage.setItem("ls",localStorage.getItem('ls') + "<span id='" + document.getElementById("terminalinput").textContent.slice(3,Infinity) + "ls'>" +  document.getElementById("terminalinput").textContent.slice(3,Infinity) + "</span><br>")
		}
		terminline(document.getElementById('terminalinput').textContent.slice(2,Infinity) + " was created.");
	} else {
		terminline("That file already exsists!")
	}
}
commands["cf"] = "filesCreate()";

// File Editor 
function filesSave() {
  localStorage.setItem(document.getElementById('openfile').textContent,document.getElementById('keditinput').textContent);
}

function filesEdit() { // start of function
  if (document.getElementById("terminalinput").textContent.slice(2,Infinity) == "") { // if there is no specified file
    terminline("You must enter a specified file.") // give error
  } else { // if there is a file
    termblock("<termhead><u style=" + '"' + "float: left" + '"' + "onclick=" + '"' + "filesSave()" + '"' + ">save</u> <span style='float: left'> &nbsp; </span> <u style=" + '"' + "float: left" + '"' + "onclick=" + '"' + "termreturn()" + '"' + ">return</u>" + document.getElementById("terminalinput").textContent.slice(3, Infinity) + "</termhead><span style='display:none;' id='openfile'>" + document.getElementById("terminalinput").textContent.slice(3, Infinity) + "</span>" + '<span contenteditable="true" id="keditinput" onclick="selectText(' + "'keditinput'" +')">' +  localStorage.getItem(document.getElementById("terminalinput").textContent.slice(3, Infinity)) + '</span>',"true","600px","350px");
    terminline("<highlight>" + document.getElementById("openfile").textContent + "</highlight> was opened in ef (kedit).");
  }
}
commands["ef"] = "filesEdit()"

// Read File
function filesRead() { // start of function
  if (document.getElementById("terminalinput").textContent.slice(2,Infinity) == "") { // if there is no specified file
    terminline("You must enter a specified file.") // give error
  } else { // if there is a file
    terminline(localStorage.getItem(document.getElementById("terminalinput").textContent.slice(3, Infinity)));
  }
}
commands["rf"] = "filesRead()"

// Delete File
function filesDelete() { // start of function
  if (document.getElementById("terminalinput").textContent.slice(2,Infinity) == "") { // if there is no specified file
    terminline("You must enter a specified file.") // give error
  } else { // if there is a file
    localStorage.removeItem(document.getElementById("terminalinput").textContent.slice(3, Infinity));
    terminline(document.getElementById("terminalinput").textContent.slice(3, Infinity) + " was deleted.");
  }
}
commands["df"] = "filesDelete()"

var appsAutorunPrev;

function appsInstaller() {
  var appsBeingInstalled = document.getElementById('terminalinput').textContent.slice(8,Infinity);
  fetch(appsBeingInstalled)
  .then(response => response.text())
  .then((data) => {
    termblock("The following was installed:<br> <span style='color: white;background-color: black;' id='appsSourceCodeRaw'></span><br><span style='color: green'> if you see this, the package has installed correctly</span>");
    document.getElementById('appsSourceCodeRaw').innerHTML = data;
    localStorage.setItem(appsBeingInstalled,data);
    if (localStorage.getItem("autorun") == null) {
      localStorage.setItem("autorun","/* WELCOME TO AUTORUN. This file lets you run javascript at boot. This is also where programs are installed */                  " + document.getElementById('appsSourceCodeRaw').textContent);
    } else {
      appsAutorunPrev = localStorage.getItem("autorun");
      localStorage.setItem("autorun",appsAutorunPrev + document.getElementById('appsSourceCodeRaw').textContent);
    }
    termreturn();
    terminline("The appsInstaller successfully finished. Please reboot to see the chagnes.");
  })

}

commands["install"] = "appsInstaller()";

commands["reboot"] = "location.reload();";

if (localStorage.getItem("autorun") == null) {
  // Do Nothing
} else {
  eval(localStorage.getItem("autorun"))
}

// Terminal Keybind
document.addEventListener("keyup", function(event) {
    if (event.keyCode === 18) {
        terminal();
    }
});
