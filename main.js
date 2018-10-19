const electron = require("electron");
const url = require("url");
const path = require("path");
const fs = require("fs");

const {
  app,
  BrowserWindow,
  Menu,
  ipcMain
} = electron;

const userDataPath = app.getPath('userData');
listPath = path.join(userDataPath, 'savedList.json');

let mainWindow;
let dbWindow;

var database = [];
// database.push('WTF IS GOING ON?')


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
  // TOTEST: contents.loadFile(filePath)
  dbWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app', 'database', 'dbWindow.html'),
    protocol: 'file',
    slashes: true
  }));
  dbWindow.webContents.on('did-finish-load', function() {
    readJson();
  })
  // Garbage colection
  dbWindow.on('close', function() {
    dbWindow = null;
  })

};

//Catch item:add
ipcMain.on('item:add', function(e, item) {
  database.push(item)
  console.log(database)
  writeJson(database, item);
});

ipcMain.on('item:createdbWindow', function(e) {
  createdbWindow();
});

//Reading json
function readJson() {
  fs.readFile(listPath, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      try {
        console.log((JSON.parse(data)));
        database = JSON.parse(data);
        console.log(database);
      } catch (e) {}
      dbWindow.webContents.send('data:json', database);
    }
  });
}

function writeJson(database, item) {
  fs.writeFile(listPath, JSON.stringify(database), function(err) {
    if (err) {
      console.log('Couldnt save')
    } else {
      console.log('Saved!');
      dbWindow.webContents.send('item:add', item);
    }
  });
}

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