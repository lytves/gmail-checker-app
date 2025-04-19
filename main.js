const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let views = [];
let currentTab = 0;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1300,
        height: 900,
        icon: path.join(__dirname, 'assets/gmail.icns'), // ruta a tu icono
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile('index.html');

    const profiles = ['gmail_profile_1', 'gmail_profile_2', 'yandex_profile_3', 'yahoo_profile_4'];
    const urls = [
      'https://mail.google.com/mail/u/0/',
      'https://mail.google.com/mail/u/1/',
      'https://mail.yahoo.com/',
      'https://mail.yandex.com/'
    ];

    for (let i = 0; i < urls.length; i++) {
        const view = new BrowserView({
            webPreferences: {
                partition: `persist:${profiles[i]}`,
                contextIsolation: false,
                nodeIntegration: false
            }
        });
        view.webContents.loadURL(urls[i]);
        view.webContents.setWindowOpenHandler(({ url }) => {
            require('electron').shell.openExternal(url);
            return { action: 'deny' };
        });

        view.webContents.on('new-window', (event, url) => {
            event.preventDefault();
            require('electron').shell.openExternal(url);
        });

        views.push(view);
    }

    // Muestra la primera vista
    setTimeout(() => {
        showTab(0);
    }, 2000); // Espera para asegurar que index.html ha cargado

    // Maneja cambio de pestaña
    ipcMain.on('switch-tab', (_, index) => {
        showTab(index);
    });
}

function showTab(index) {
    if (!mainWindow) return;
    currentTab = index;
    const view = views[index];

    // Remueve la vista anterior y añade la nueva
    for (const v of views) mainWindow.removeBrowserView(v);
    mainWindow.addBrowserView(view);
    mainWindow.webContents.send('tab-switched', index);

    // Función para ajustar tamaño de vista al tamaño de ventana
    const updateBounds = () => {
        const [width, height] = mainWindow.getContentSize();
        view.setBounds({ x: 0, y: 40, width, height: height - 40 });
        view.setAutoResize({ width: true, height: true });
    };

    updateBounds();
    mainWindow.on('resize', updateBounds);
}

app.whenReady().then(createWindow);
// Revisa correo nuevo cada 15 segundos en las dos primeras pestañas
setInterval(() => {
    [0, 1].forEach(i => {
        const view = views[i];
        if (view && view.webContents) {
            view.webContents.executeJavaScript('document.title')
                .then(title => {
                    // console.log(`[TAB ${i}] Título actual:`, title);
                    // Verificar si el título contiene un número dentro de paréntesis
                    const hasUnreadEmails = /\(\d+\)/.test(title);
                    if (hasUnreadEmails) {
                        app.dock.bounce('informational');
                    }
                })
                .catch((error) => {
                    console.log(`[TAB ${i}] Error al obtener el título:`, error);
                });
        }
    });
}, 15000);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
