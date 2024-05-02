const { app, BrowserWindow } = require('electron');
const config = require("dotenv");
const fetch = require('electron-fetch').default;

config.config();

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true}})
      win.loadFile('index.html')
    }

    
app.whenReady().then(() => {
  createWindow()
})