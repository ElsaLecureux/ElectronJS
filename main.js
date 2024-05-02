const {app, BrowserWindow, ipcMain, dialog, Menu} = require('electron')
const fs = require('fs');

let path = undefined;
let win;

const template = [
    ...(process.platform == 'darwin' ? [{
        label: app.getName(),
        submenu: [
            { role: 'about' }
        ]
    }] : []),
    {
        label: "Save",
        submenu: [
            {
                label: "Save",
                accelerator: "CommandOrControl+S",
                click: () => {
                    win.webContents.send('context-menu-command');
                }
            },
            {
                label: "SaveAs",
                accelerator: "CommandOrControl+Shift+S",
                click: () => {
                    path = undefined;
                    win.webContents.send('context-menu-command');
                }
            }
        ]
    },
    { role: "editMenu" },
    { role: "viewMenu" }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

app.on('ready', () => {
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    win.loadFile('index.html');
    console.log("app in launched");    
})

ipcMain.on('save', (event, text) => {
    console.log(`${text} from main process`)
    if (path === undefined) {
        dialog.showSaveDialog(win, {defaultPath: "text.txt"}, ( filePath ) => {
            if ( filePath ) {
                path = filePath;
                fs.writeFile(path, text, (err) => {
                    if (err) {
                        win.webContents.send('response', 'failure');
                        console.error(err);
                    } else {
                        win.webContents.send('response', 'success');
                        console.log('file written successfully first time or changed');
                    }
                });
            }
        });
    } else {
        fs.writeFile(path, text, (err) => {
            if (err) {
                win.webContents.send('response', 'failure');
                console.error(err);
            } else {
                win.webContents.send('response', 'success');
                console.log('file written successfully');
            }
        });
    }
    
}); 