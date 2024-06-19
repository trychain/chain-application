const ElectronHelper = require("./src/helpers/common/electron.helper");
const DotenvHelper = require("./src/helpers/common/dotenv.helper");

DotenvHelper.configureDotenv();

ElectronHelper.electron.app.whenReady().then(() => {
  ElectronHelper.createWindow();

  ElectronHelper.electron.BrowserWindow.app.on("activate", () => {
    if (ElectronHelper.window.getAllWindows().length === 0) {
      ElectronHelper.createWindow();
    }
  });
});

ElectronHelper.electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    ElectronHelper.electron.app.quit();
  }
});
