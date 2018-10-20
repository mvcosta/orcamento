const electron = require('electron');
const {
  ipcRenderer
} = electron;

$(document).ready(function() {
  $('.preco').mask('000.000.000,00');
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