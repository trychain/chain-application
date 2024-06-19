const electron = require("electron");
const path = require("node:path");

function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 500,
    height: 800,
    menubar: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.ENVIRONMENT === "DEVELOPMENT") {
    mainWindow.loadURL("http://localhost:3000/");
    mainWindow.webContents.openDevTools();

    return;
  }

  mainWindow.loadFile(path.join(__dirname, "../../../build/index.html"));
}

module.exports = {
  createWindow,
  electron,
};
