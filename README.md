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

### 2. Instalar dependencias

```bash
npm install
