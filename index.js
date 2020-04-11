const electron = require("electron");
const ffmpeg = require("fluent-ffmpeg");

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on("video:submit", (event, path) => {
  ffmpeg.ffprobe(path, async (err, metadata) => {
    try {
      const duration = await metadata.format.duration;
      mainWindow.webContents.send("video:duration", duration);
    } catch {
      console.error(err.message);
    }
  });
});
