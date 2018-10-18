console.log("working")

const url = require("url");
const path = require("path");
const fs = require("fs")
const electron = require('electron');
const {
  ipcRenderer,
  remote
} = electron;
const {
  BrowserWindow
} = remote

let addWindow;

//Reading json

fs.readFile("C:/Users/MVcos/AppData/Roaming/orcamentos/savedList.json", function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log("This is the data");
    console.log(data);
    database = data
  }
});

ipcRenderer.on('item:add', function(e, item) {
  addWindow.close();
  $('#mainTable > tbody:last-child').append(
    "<tr>",
    "<td>" + item.obra + "</td>",
    "<td>" + item.empresa + "</td>",
    "<td>" + item.valor + "</td>",
    "</tr>"
  );
});

$('button').click(createaddWindow);

//Handle createaddWindow
function createaddWindow() {
  //Create new window
  addWindow = new BrowserWindow({
    width: 600,
    height: 500,
    title: 'Lista de Obras'
  });
  // Load html into mainWindow
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'addWindow.html'),
    protocol: 'file',
    slashes: true
  }));
  // Garbage colection
  addWindow.on('close', function() {
    addWindow = null;
  })
};