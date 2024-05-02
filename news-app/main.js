const { app, BrowserWindow } = require('electron');
const config = require("dotenv");
const fetch = require('electron-fetch').default;

config.config();

let win;

const API_KEY = process.env.APIKEY;
const URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
let articles = [];

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true}})
      win.loadFile('index.html')
    }

const loadData = async () => {
  try {
    const res = await fetch(URL);
    resJSON = await res.json();
    articles = resJSON.articles
  } catch {
    console.error('Failed');
  }
  win.webContents.send('articlesData', articles);
}

loadData();
    
app.whenReady().then(() => {
  createWindow()
})