<div align="center">

<img src="docs/assets/logo.svg" alt="VetCarnet" width="96" height="96">

# VetCarnet

**Ficha de mascotas y carnet de vacunas digital, con recordatorio de la próxima dosis.** Pensado para veterinarias pequeñas y dueños de mascotas, offline.

[🚀 Características](#-características) · [🧰 Stack](#-stack) · [📂 Estructura](#-estructura) · [🔧 Configuración](#-configuración) · [🧪 Pruebas](#-pruebas) · [🤝 Contribuir](#-contribuir) · [📄 Licencia](#-licencia)

</div>

---

## 🚀 Características

- Dueños y mascotas con especie, raza y fecha de nacimiento.
- Carnet de vacunas con fecha de aplicación y próxima dosis.
- Historial de consultas, tratamientos y costos.
- Recordatorios de próxima vacuna por notificación y WhatsApp.
- Carnet de la mascota en PDF para compartir.

> Sin servidores, sin suscripciones y sin servicios de pago: todos los datos viven en el dispositivo (SQLite).

## 🧰 Stack

| Capa | Tecnología |
|---|---|
| App | React Native + Expo (TypeScript) |
| Datos | SQLite local (expo-sqlite) |
| Navegación | Expo Router |
| Recordatorios | Notificaciones locales (expo-notifications) |
| PDF | Generación de PDF (expo-print) |
| Compartir | Hoja de compartir del sistema (expo-sharing), WhatsApp incluido |
| Distribución | APK / EAS Build local |

### Modelo de datos

- `duenos` (id, nombre, telefono)
- `mascotas` (id, dueno_id, nombre, especie, raza, nacimiento)
- `vacunas` (id, mascota_id, nombre, fecha, proxima)
- `consultas` (id, mascota_id, fecha, motivo, tratamiento, costo)

El detalle de cada tabla y la política de migraciones están en [docs/ARQUITECTURA.md](docs/ARQUITECTURA.md).

## 🗺️ Roadmap

1. Estructura base y navegación
2. Dueños y mascotas
3. Carnet de vacunas
4. Consultas e historial
5. Recordatorios y PDF

> Detalle fase por fase: [docs/ROADMAP.md](docs/ROADMAP.md) · [docs/SPEC.md](docs/SPEC.md) · [docs/PLANNING.md](docs/PLANNING.md) · [docs/DATOS.md](docs/DATOS.md) · [docs/PANTALLAS.md](docs/PANTALLAS.md) · [docs/PRUEBAS.md](docs/PRUEBAS.md) · [docs/BACKLOG.md](docs/BACKLOG.md)

## 📂 Estructura

```
VetCarnet/
├── app/            # Pantallas y rutas (Expo Router)
├── src/
│   ├── db/         # Esquema, migraciones y consultas SQLite
│   ├── components/ # Componentes reutilizables
│   └── lib/        # Utilidades (formato, CSV)
├── docs/assets/    # Logo y recursos del README
└── .github/        # Plantillas, CI y Dependabot
```

## 🔧 Configuración

**Requisitos:** Node.js 20+ y la app Expo Go (o un emulador).

```bash
git clone https://github.com/Luiss2080/VetCarnet.git
cd VetCarnet
npm install
npx expo start
```

Escaneá el QR con Expo Go para abrir la app en tu teléfono. La base local se crea sola en el primer arranque.

El repositorio está en fase inicial: la estructura, la base de datos y la documentación están listas y la app se construye siguiendo el roadmap.

## 🧪 Pruebas

```bash
npm test
npm run lint
npx tsc --noEmit
```

## 🤝 Contribuir

Leé la [guía de contribución](CONTRIBUTING.md) y el [código de conducta](CODE_OF_CONDUCT.md). Para reportar vulnerabilidades consultá la [política de seguridad](SECURITY.md); para dudas, [SUPPORT.md](SUPPORT.md).

## 📄 Licencia

Distribuido bajo licencia MIT. Consultá [LICENSE](LICENSE).

---

<div align="center">

Hecho por [Luiss2080](https://github.com/Luiss2080)

</div>
