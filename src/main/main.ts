import {app, BrowserWindow} from 'electron';
import {GetIpcMain} from '../ipc/ipc';
import {Api} from './preload';
import path from "path";

const ipcMain = GetIpcMain<Api>();
let mainWindow: BrowserWindow | null = null;

function createMainWindow()
{
    if (mainWindow)
        return;

    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        },
        minWidth: 450,
        minHeight: 350,
        height: 800,
        width: 1600
    });

    mainWindow.loadURL(path.join(path.resolve(__dirname, '../'), './renderer/index/index.html'));
    mainWindow.on('close', () => mainWindow = null);

    mainWindow.webContents.openDevTools();

    mainWindow.webContents.once('dom-ready', () =>
    {
        if (mainWindow !== null)
            ipcMain.send(mainWindow, 'ipcMainToRender', 'This is message from main process to renderer process');
    });
}

app.on('ready', () =>
{
    createMainWindow();
});

app.on('window-all-closed', () =>
{
    if (process.platform !== 'darwin')
    {
        app.quit();
    }
});

app.on('activate', () =>
{
    createMainWindow();
});

ipcMain.handle('ipcRenderToMain', async (_, message) =>
{
    console.log(message);
})
