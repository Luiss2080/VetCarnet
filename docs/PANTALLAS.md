# Pantallas y flujos — VetCarnet

> Guía de interfaz para construir cada pantalla: ruta, contenido, estados y bosquejo. Complementa la sección 5 de [SPEC.md](SPEC.md).

## 1. Mapa de rutas

| Pantalla | Archivo (Expo Router) | Tipo |
|---|---|---|
| Inicio | `app/index.tsx` | Inicio |
| Dueños y mascotas | `app/duenos-y-mascotas.tsx` | Lista / vista |
| Ficha de mascota | `app/ficha-de-mascota.tsx` | Detalle |
| Formulario de vacuna | `app/formulario-de-vacuna.tsx` | Formulario |
| Formulario de consulta | `app/formulario-de-consulta.tsx` | Formulario |
| Pendientes | `app/pendientes.tsx` | Lista / vista |

**Convenciones de interfaz**

- Una acción principal por pantalla, en un botón grande abajo o en un botón flotante.
- Los formularios se abren como pantalla completa, validan al enviar y muestran el error junto al campo.
- Toda lista tiene estado vacío con una frase y un botón que lleva a la acción.
- Las acciones que borran piden confirmación explícita con el nombre del registro.
- El botón atrás nunca pierde datos sin avisar: si el formulario tiene cambios, se pregunta antes de salir.
- Textos en español de Bolivia (voseo opcional, siempre claros); montos como `Bs 1.250,00`.

## 2. Detalle por pantalla

### 2.1 Inicio

- **Archivo:** `app/index.tsx`
- **Qué muestra:** Vacunas por vencer y vencidas, buscador de mascotas
- **Acciones:** Buscar, ver pendientes

**Bosquejo**

```
┌──────────────────────────────┐
│ VetCarnet                    │
├──────────────────────────────┤
│ [ Resumen y alertas ]        │
│                              │
│  ▸ Dueños y mascotas        │
│  ▸ Ficha de mascota         │
│  ▸ Pendientes               │
│                              │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Vacunas por vencer y vencidas, buscador de mascotas |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.2 Dueños y mascotas

- **Archivo:** `app/duenos-y-mascotas.tsx`
- **Qué muestra:** Lista con búsqueda por nombre o teléfono
- **Acciones:** Crear dueño o mascota
- **Historias relacionadas:** HU-01, HU-04, HU-05 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Dueños y mascotas           │
├──────────────────────────────┤
│ nombre · dueno_id            │
│ nombre · dueno_id            │
│ nombre · dueno_id            │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay mascotas. Tocá «Crear dueño o mascota» para empezar. |
| Con datos | Lista con búsqueda por nombre o teléfono |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.3 Ficha de mascota

- **Archivo:** `app/ficha-de-mascota.tsx`
- **Qué muestra:** Datos, edad, pestañas Vacunas y Consultas
- **Acciones:** Agregar vacuna o consulta, PDF
- **Historias relacionadas:** HU-01, HU-02, HU-03, HU-04, HU-05 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Ficha de mascota            │
├──────────────────────────────┤
│ nombre                       │
│ Resumen / totales            │
├──────────────────────────────┤
│ • registro 1                 │
│ • registro 2                 │
│ • registro 3                 │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay mascotas. Tocá «Agregar vacuna o consulta» para empezar. |
| Con datos | Datos, edad, pestañas Vacunas y Consultas |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.4 Formulario de vacuna

- **Archivo:** `app/formulario-de-vacuna.tsx`
- **Qué muestra:** Vacuna, fecha de aplicación, próxima dosis
- **Acciones:** Guardar
- **Historias relacionadas:** HU-02, HU-04 (sugerido por coincidencia de temas; confirmar al construir).

**Campos del formulario**

| Campo | Control | Obligatorio | Validación |
|---|---|---|---|
| mascota id | Selector de mascotas | Sí | Debe existir en `mascotas` |
| nombre | Texto | Sí | Texto de 1 a 80 caracteres sin espacios sobrantes |
| fecha | Fecha | Sí | Fecha real en formato AAAA-MM-DD |
| proxima | Fecha | No | Fecha real en formato AAAA-MM-DD; No anterior a la fecha de inicio/aplicación si ambas existen |

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Formulario de vacuna        │
├──────────────────────────────┤
│ mascota id                   │
│ [____________________]       │
│ nombre                       │
│ [____________________]       │
│ fecha                        │
│ [____________________]       │
│ proxima                      │
│ [____________________]       │
│                              │
│ [        Guardar        ]    │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay vacunas. Tocá «Guardar» para empezar. |
| Con datos | Vacuna, fecha de aplicación, próxima dosis |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.5 Formulario de consulta

- **Archivo:** `app/formulario-de-consulta.tsx`
- **Qué muestra:** Fecha, motivo, diagnóstico, tratamiento, costo
- **Acciones:** Guardar
- **Historias relacionadas:** HU-02, HU-03 (sugerido por coincidencia de temas; confirmar al construir).

**Campos del formulario**

| Campo | Control | Obligatorio | Validación |
|---|---|---|---|
| mascota id | Selector de mascotas | Sí | Debe existir en `mascotas` |
| fecha | Fecha | Sí | Fecha real en formato AAAA-MM-DD |
| motivo | Texto largo | Sí | Hasta 280 caracteres |
| tratamiento | Texto | No | Texto de 1 a 80 caracteres sin espacios sobrantes |
| costo | Numérico decimal | Sí | Mayor o igual a 0; Hasta 2 decimales |

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Formulario de consulta      │
├──────────────────────────────┤
│ mascota id                   │
│ [____________________]       │
│ fecha                        │
│ [____________________]       │
│ motivo                       │
│ [____________________]       │
│ tratamiento                  │
│ [____________________]       │
│ costo                        │
│ [____________________]       │
│                              │
│ [        Guardar        ]    │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay consultas. Tocá «Guardar» para empezar. |
| Con datos | Fecha, motivo, diagnóstico, tratamiento, costo |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.6 Pendientes

- **Archivo:** `app/pendientes.tsx`
- **Qué muestra:** Lista de próximas dosis con urgencia
- **Acciones:** Avisar por WhatsApp
- **Historias relacionadas:** HU-02, HU-04 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Pendientes                  │
├──────────────────────────────┤
│ nombre · fecha               │
│ nombre · fecha               │
│ nombre · fecha               │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Lista de próximas dosis con urgencia |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

## 3. Flujos principales

**HU-01 — Registrar dueños y mascotas**

```
agrego una mascota con especie y raza  →  queda en su ficha con la edad calculada
```

**HU-02 — Llevar el carnet de vacunas**

```
registro rabia hoy con próxima dosis en 1 año  →  queda en el carnet con ambas fechas
```

**HU-03 — Historial de consultas y costos**

```
anoto motivo, diagnóstico, tratamiento y 80 Bs  →  se agrega al historial y suma al costo acumulado
```

**HU-04 — Recordatorios de próxima vacuna**

```
abro Pendientes  →  aparece con el botón «Avisar al dueño»
```

**HU-05 — Carnet en PDF**

```
toco «Carnet PDF»  →  se genera un PDF con datos de la mascota, dueño y vacunas con fechas
```
