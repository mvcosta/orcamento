console.log("working")

const url = require("url");
const path = require("path");
const electron = require('electron');
const {ipcRenderer , remote} = electron;
const {BrowserWindow} = remote

let addWindow;


ipcRenderer.on('item:add', function(e, item){
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
function createaddWindow(){
  //Create new window
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Lista de Obras'
  });
  // Load html into mainWindow
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'addWindow.html'),
    protocol: 'file',
    slashes: true
  }));
  // Garbage colection
  addWindow.on('close', function(){
    addWindow = null;
  })
};
