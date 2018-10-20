const electron = require('electron');
const {
  ipcRenderer
} = electron;

$(document).ready(function() {
  $('.preco').mask('00.000.000,00', {
    reverse: true
  });
});

$('form').submit(function(e) {
  e.preventDefault();
  const item = {
    obra: $('#Obra').val(),
    empresa: $('#Empresa').val(),
    valor: $('#Valor').val()
  }
  ipcRenderer.send('item:add', item);
})