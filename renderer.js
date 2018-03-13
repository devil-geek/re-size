// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// In the main process.
//const {BrowserWindow} = require('electron')

// Or use `remote` from the renderer process.
const { BrowserWindow } = require('electron').remote

const devices = [
  {
    name: "Mobile",
    width: 320,
    height: 480,
    disabled: true
  },
  {
    name: "Tablet",
    width: 768,
    height: 1024,
    disabled: true
  },
  {
    name: "Desktop",
    width: 1024,
    height: 768,
    disabled: true
  },
  {
    name: "Widescreen",
    width: 1280,
    height: 800,
    disabled: true
  },
  {
    name: "FullHD",
    width: 1440,
    height: 1024,
    disabled: true
  }
]

function getDevices(device) {
  const device_input = `
      <div class="field has-addons">
          <div class="control has-icons-left is-expanded">
            <input class="input" type="text" placeholder="Name / Id" value="${device.name}" disabled="${device.disabled}">
            <span class="icon is-left">
              <i class="fa fa-mobile"></i>
            </span>
          </div>
          <div class="control field has-addons">
            <p class="control">
              <div class="control has-icons-left is-expanded">
                <input class="input" type="number" placeholder="Width" value="${device.width}" disabled="${device.disabled}">
                <span class="icon is-left">
                  <i class="fa fa-expand"></i>
                </span>
              </div>
            </p>
            <p class="control">
              <a class="button is-static">
                px
              </a>
            </p>
          </div>
  
          <div class="control field has-addons">
              <p class="control">
                <div class="control has-icons-left is-expanded">
                  <input class="input" type="number" placeholder="Height" value="${device.height}" disabled="${device.disabled}">
                  <span class="icon is-left">
                    <i class="fa fa-expand"></i>
                  </span>
                </div>
              </p>
              <p class="control">
                <a class="button is-static">
                  px
                </a>
              </p>
            </div>
  
          <div class="control">
            <a class="button">
              <span class="icon">
                <i class="fa fa-pencil"></i>
              </span>
              <span>Edit</span>
            </a>
          </div>
          <div class="control">
            <a class="button is-info" onclick="Launch('${device.name}', ${device.width}, ${device.height})">
              <span class="icon">
                <i class="fa fa-rocket"></i>
              </span>
              <span>Launch</span>
            </a>
          </div>
        </div>`;

  return device_input;
}

function addDevices() {
  var container = document.getElementById("container");

  devices.map((device) => {
    var newcontent = document.createElement('div');
    newcontent.innerHTML = getDevices(device);
    container.appendChild(newcontent);
  })
}

function Launch(device, width, height) {

  let url = document.getElementById('url').value
  let protocol = document.getElementById('protocol').value

  let win = new BrowserWindow({
    title: device,
    width: width,
    height: height,
    resizable: false,
    fullscreen: false,
    fullscreenable: false,
    simpleFullscreen: false,
    webPreferences: { nodeIntegration: false }
  })
  win.on('closed', () => {
    win = null
  })
  win.loadURL(protocol + url)
  win.openDevTools()
}


document.addEventListener('DOMContentLoaded', function () {

  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }


  addDevices();


});