var wm = 'powerline'

function iwmbg() {
    var iwmBackgroundURL = document.getElementById("terminalinput").textContent.slice(5, Infinity);
    document.body.style.backgroundImage = "url('" + changebgurl + "')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    localStorage.setItem("iwm.bg",iwmBackgroundURL)
    terminline("Background changed to <aqua>" + iwmBackgroundURL + "</aqua>.");
}



// This is the startup stuff. This creates the terminal.

document.body.innerHTML += '<ul class="powerline"><li class="left">  <div><a href="#" onclick="terminal()">root@netbox</a></div>  <div class="endsection"></div>  <div><a href="#" onclick="location.reload()">reboot</a></div> <div class="endsection"></div></li><div class="center"><a href="#" id="powerlineCurrentlyFocused"> terminal </a></div><li class="right">  <div class="endsection"></div>  <div><a href="#" id="date">date</a></div>  <div class="endsection"></div>  <div><a href="#" id="time">Time</a></div></li></ul>'

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
    document.getElementById("date").innerHTML = datetd;
    document.getElementById("time").innerHTML = time;
    let t = setTimeout(function () { currentTime() }, 1000);
  }
  currentTime();


// Create new link Element
var link = document.createElement('link'); 

// set the attributes for link element
link.rel = 'stylesheet'; 

link.type = 'text/css';

link.href = 'powerline/powerline.css'; 

// Get HTML head element to append 
// link element to it 
document.getElementsByTagName('HEAD')[0].appendChild(link); 

var intervalId = window.setInterval(function(){
  document.getElementById('powerlineCurrentlyFocused').innerHTML = popupCurrentlyFocused;
}, 10);