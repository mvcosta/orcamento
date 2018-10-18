const electron = require("electron");
const url = require("url");
const path = require("path");

const {
  app,
  BrowserWindow,
  Menu,
  ipcMain
} = electron;

let mainWindow;
let dbWindow;

//Listen for the app to be ready
app.on('ready', function() {
  //Create new window
  mainWindow = new BrowserWindow({});
  // Load html into mainWindow
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app', 'mainWindow.html'),
    protocol: 'file',
    slashes: true
  }));
  // Quit app when close
  mainWindow.on('closed', function() {
    app.quit();
  });
  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert Menu
  Menu.setApplicationMenu(mainMenu);
});

//Handle createdbWindow
function createdbWindow() {
  //Create new window
  dbWindow = new BrowserWindow({
    width: 600,
    height: 500,
    title: 'Lista de Obras'
  });
  // Load html into dbWindow
  dbWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app', 'database', 'dbWindow.html'),
    protocol: 'file',
    slashes: true
  }));
  // Garbage colection
  dbWindow.on('close', function() {
    dbWindow = null;
  })
};

//Catch item:add
ipcMain.on('item:add', function(e, item) {
  dbWindow.webContents.send('item:add', item);
})

ipcMain.on('item:createdbWindow', function(e) {
  createdbWindow();
});

const mainMenuTemplate = [{
  label: 'File',
  submenu: [{
      label: 'Lista das Obras',
      click() {
        createdbWindow();
      }
    },
    {
      label: 'Quit',
      accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
      click() {
        app.quit();
      }
    },
  ]
}];

//If mac, add empty object to Menu
if (process.platform = 'darwin') {
  mainMenuTemplate.unshift({});
}

//Add developer tools item if not in prod
if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [{
        label: 'Toggle DevTools',
        accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  });
}