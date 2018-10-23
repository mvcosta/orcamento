console.log("working")

const url = require("url");
const path = require("path");
const electron = require('electron');
const {
  ipcRenderer,
  remote
} = electron;
const {
  BrowserWindow
} = remote

let addWindow;

ipcRenderer.on('item:add', function(e, item) {
  addWindow.close();
  $('#mainTable > tbody:last-child').append(
    `<tr><td class="trash"><span id ="${item.obra}" class="delete"> <i class="far fa-trash-alt"></i> </span></td><td>${item.obra}</td><td>${item.empresa}</td><td>${item.valor}</td><td class="arrow"><span id ="${item.obra}" class="more"> <i class="fas fa-arrow-circle-down"></i> </span></tr><tr class="info"><th> - </th><th> Obra </th><th> Empresa </th><th> Valor </th><th> - </th></tr>`
  );
});

ipcRenderer.on('data:json', function(e, database) {
  $.each(database, function(index, item) {
    $('#mainTable > tbody:last-child').append(
      `<tr><td class="trash"><span id ="${item.obra}" class="delete"> <i class="far fa-trash-alt"></i> </span></td><td>${item.obra}</td><td>${item.empresa}</td><td>${item.valor}</td><td class="arrow"><span id ="${item.obra}" class="more"> <i class="fas fa-arrow-circle-down"></i> </span></tr><tr class="info"><th> - </th><th> Obra </th><th> Empresa </th><th> Valor </th><th> - </th></tr>`
    );
  })
});


// Add nova obra
$('button').click(createaddWindow);

// Delete Obra
$(document).on('click', 'span.delete', function() {
  console.log("Span clicked!")
  item = this.id
  $(this).parent().parent().fadeOut(250, function() {
    $(this).remove();
  });
  ipcRenderer.send("item:delete", item)
});

// View more
$(document).on('click', 'span.more', function() {
  $(".info").toggle()
});

//Handle createaddWindow
function createaddWindow() {
  //Create new window
  addWindow = new BrowserWindow({
    width: 600,
    height: 500,
    title: 'Lista de Obras'
    // parent: dbWindow
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