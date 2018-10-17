console.log("working")

const electron = require('electron');
const {ipcRenderer} = electron;
const remote = require('remote')


ipcRenderer.on('item:add', function(e, item){
  $('#new').append($("<td></td>").text(item.obra));
  $('#new').append($("<td></td>").text(item.empresa));
  $('#new').append($("<td></td>").text(item.valor));
});


// const Menu = remote.require('menu')
//
// const dbMenuTemplate = [
//   {
//     label:'File',
//     submenu:[
//       {
//         label: 'Adicionar Obra',
//         click(){
//           createaddWindow();
//         }
//       },
//       {
//         label: 'Quit',
//         accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
//         click(){
//           app.quit();
//         }
//       },
//     ]
//   }
// ];
//
// //If mac, add empty object to Menu
// if(process.platform = 'darwin'){
//   dbMenuTemplate.unshift({});
// }
//
// //Add developer tools item if not in prod
// if(process.env.NODE_ENV !== 'production'){
//   dbMenuTemplate.push({
//     label: 'Developer Tools',
//     submenu:[
//       {
//         label: 'Toggle DevTools',
//         accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
//         click(item, focusedWindow){
//           focusedWindow.toggleDevTools();
//         }
//       },
//       {
//         role: 'reload'
//       }
//     ]
//   });
// }
//
// // Build menu from template
// const dbMenu = Menu.buildFromTemplate(dbMenuTemplate);
// // Insert Menu
// Menu.setApplicationMenu(dbMenu);
