const electron = require('electron');
const {
  ipcRenderer
} = electron;

$('form').submit(function(e) {
  e.preventDefault();
  const item = {
    obra: $('#Obra').val(),
    empresa: $('#Empresa').val(),
    valor: $('#Valor').val()
  }
  console.log(item)
  ipcRenderer.send('item:add', item);
})