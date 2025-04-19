# Gmail Checker App

Una pequeña aplicación para MacOS de escritorio construida con [Electron](https://www.electronjs.org/) que permite abrir múltiples pestañas de cuentas de correo (como Gmail, Yahoo, Yandex, etc.), revisar automáticamente si hay correos no leídos, y notificar al usuario mediante rebotes en el dock (macOS).

---

## 📌 ¿Qué es esta app?

**Gmail Checker App** permite visualizar varias cuentas de correo en pestañas separadas dentro de una misma ventana. Además, detecta correos nuevos revisando el título de la pestaña, y si hay correos no leídos, lanza una notificación visual en el dock.

### Características:
- Pestañas para múltiples servicios de correo (Gmail, Yahoo, Yandex…).
- Detección automática de nuevos correos mediante el título de la página.
- Rebote configurable en el dock (macOS).
- Icono de aplicación personalizado.
- Se inicia con la última pestaña activa destacada.

---

## ⚙️ Requisitos e instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/lytves/gmail-checker-app.git
cd gmail-checker-app
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar en modo desarrollo

```bash
npm start
```

### 4. Empaquetar la app (macOS)

Puedes empaquetar la app para diferentes arquitecturas:

✅ Para Mac con chip Apple Silicon (M1, M2, M3, M4), esto generará una app compatible solo con Macs Apple Silicon:
```bash
npx electron-packager . gmail-checker-app \
  --platform=darwin \
  --arch=arm64 \
  --icon=assets/gmail.icns
```
✅ Para Mac con procesador Intel, esta versión funcionará solo en Macs Intel:
```bash
npx electron-packager . gmail-checker-app \
  --platform=darwin \
  --arch=x64 \
  --icon=assets/gmail.icns
```

✅ Para una app universal (funciona en ambos: Intel y Apple Silicon), genera una versión universal más pesada, pero compatible con cualquier Mac moderno:
```bash
npx electron-packager . gmail-checker-app \
  --platform=darwin \
  --arch=universal \
  --icon=assets/gmail.icns
```

## 🛠️ Personalización

Puedes modificar fácilmente el comportamiento de la app editando el archivo main.js.

✅ Número de pestañas

Busca este fragmento y añade/quita cuentas según necesites:
```js
const profiles = ['gmail_profile_1', 'gmail_profile_2', 'yandex_profile_3', 'yahoo_profile_4'];
const urls = [
  'https://mail.google.com/mail/u/0/',
  'https://mail.google.com/mail/u/1/',
  'https://mail.yahoo.com/',
  'https://mail.yandex.com/'
];
```

> Asegúrate de que los arrays profiles y urls tengan el mismo tamaño.

✅ Icono de la aplicación

El icono se define en main.js:
```js
icon: path.join(__dirname, 'assets/gmail.icns')
```
> Simplemente reemplaza el archivo assets/gmail.icns con tu icono personalizado.

✅ Intervalo de comprobación de correos

El chequeo de nuevos correos ocurre cada 15 segundos por defecto. Puedes modificar este valor en main.js:
```js
setInterval(() => {
    // ... lógica
}, 15000); // <-- modifica este valor (en milisegundos)
```

✅ Rebote del dock (macOS)

Para cambiar cuántas veces rebota el icono del dock cuando hay correos no leídos, modifica este bloque:
```js
let bounceCount = 0;
const bounceLimit = 2; // Número de rebotes
const bounceInterval = setInterval(() => {
  if (bounceCount < bounceLimit) {
    app.dock.bounce('informational');
    bounceCount++;
  } else {
    clearInterval(bounceInterval);
  }
}, 500);
```

📄 Licencia

Este proyecto está licenciado bajo la MIT License.
Eres libre de usar, modificar, distribuir o integrar este código en otros proyectos, con o sin fines comerciales, siempre que mantengas el aviso de copyright.
