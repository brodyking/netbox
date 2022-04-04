var wm = 'iwm'

function iwmbg() {
    var iwmBackgroundURL = document.getElementById("terminalinput").textContent.slice(5, Infinity);
    document.body.style.backgroundImage = "url('" + changebgurl + "')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    localStorage.setItem("iwm.bg",iwmBackgroundURL)
    terminline("Background changed to <aqua>" + iwmBackgroundURL + "</aqua>.");
}



// This is the startup stuff. This creates the terminal.

document.body.innerHTML += "<div class='iwmnav'><iwmlink style='float: left' onclick='terminal()'>[term]</iwmlink><p style='float: right;margin: 0px;' id='datetime'>asdf</p></div>"

// Clock
// Get time function
function currentTime() {
    var today = new Date();
    var datetd = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";
  
    if (hh === 0) {
      hh = 12;
    }
    if (hh > 12) {
      hh = hh - 12;
      session = "PM";
    }
  
    mm = (mm < 10) ? "0" + mm : mm;
    ss = (ss < 10) ? "0" + ss : ss;
  
    let time = hh + ":" + mm + " " + session;
  
    document.getElementById("datetime").innerHTML = datetd + ' ' + time;
    let t = setTimeout(function () { currentTime() }, 1000);
  }
  currentTime();


// Create new link Element
var link = document.createElement('link'); 

// set the attributes for link element
link.rel = 'stylesheet'; 

link.type = 'text/css';

link.href = 'iwm.css'; 

// Get HTML head element to append 
// link element to it 
document.getElementsByTagName('HEAD')[0].appendChild(link); 
