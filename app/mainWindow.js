console.log("working")

const url = require("url");
const path = require("path");
const electron = require('electron');
const {
  ipcRenderer,
} = electron;

$('button').click(function(e) {
  console.log("clicked")
  ipcRenderer.send('item:createdbWindow')
})