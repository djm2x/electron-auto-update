import { app, BrowserWindow, BrowserWindowConstructorOptions, ipcMain, IpcMessageEvent, remote } from 'electron';
import { autoUpdater } from 'electron-updater'

// electron main
// console.log(process.versions);
let mainWindow: BrowserWindow;

const isDev = process.argv.indexOf('dev') > -1 ? true : false;

console.log('is dev : ', isDev)

const options: BrowserWindowConstructorOptions = {
  width: 1000,
  height: 800,
  // backgroundColor: '#303030',
  transparent: false, // prod,
  titleBarStyle: 'customButtonsOnHover',
  frame: true, // dev,
  // show: false,
  // icon: __dirname + 'icon.png',
  webPreferences: {
    nodeIntegration: true
  }
}

function createWindow() {

  mainWindow = new BrowserWindow(options);

  // mainWindow.loadFile('index.html');

  if (isDev) {
    mainWindow.webContents.openDevTools();

    // require('electron-reload')(__dirname, {
    //   electron: require(`${__dirname}/node_modules/electron`)
    // });
  }

  mainWindow.loadURL(`file://${__dirname}/index.html`)


  mainWindow.on('closed', () => {
    mainWindow = null;
  });




  // mainWindow.webContents.once("did-finish-load", async () => { });

  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify()
  });
}
//>>>>>>>>>>>>
ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});


app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});


//>>>>>>>>>>>>>>>>>
function send(listningRoute: string, data: any) {
  ipcMain.on(listningRoute, (event, r) => {
    mainWindow.webContents.send('angular', data);
  });
}

// app.on('ready', createWindow);

app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
