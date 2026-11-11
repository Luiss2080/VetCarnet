# Especificación del MVP — VetCarnet

> Documento vivo. Si una decisión cambia, se actualiza acá primero y después en el código.

## 1. Resumen

**Propuesta de valor:** Que cada mascota tenga su carnet de vacunas al día y que nadie olvide la próxima dosis.

**Problema:** Las vacunas y consultas se anotan en carnets de papel que se pierden; la veterinaria no sabe a quién avisar y los dueños olvidan las fechas.

**Cómo se resuelve hoy:** Carnets de papel, fichas en cuaderno y llamadas.

**Usuario objetivo:** Veterinaria pequeña o veterinario independiente con 50 a 500 pacientes, y dueños que quieren su carnet siempre a mano.

**Métricas de éxito del MVP:**

- Registrar una vacuna con su próxima dosis en menos de 30 segundos.
- Ver qué mascotas tienen vacunas por vencer esta semana.
- Compartir el carnet de una mascota en PDF.

## 2. Alcance del MVP

### Incluido

- Dueños y mascotas con especie, raza y fecha de nacimiento.
- Carnet de vacunas con fecha de aplicación y próxima dosis.
- Historial de consultas, tratamientos y costos.
- Recordatorios de próxima vacuna por notificación y WhatsApp.
- Carnet de la mascota en PDF para compartir.

### Fuera del MVP

- Cuentas de usuario, inicio de sesión y multiusuario.
- Servidor propio, nube o sincronización entre dispositivos.
- Pagos en línea o pasarelas de cobro.
- Publicación en App Store (iOS).
- Cualquier servicio de pago o con costo recurrente.

## 3. Reglas de negocio

Reglas que el código **debe** cumplir. Cada una se cubre con pruebas automáticas cuando es lógica pura.

- **RN-01** Una mascota pertenece a un dueño; un dueño puede tener varias mascotas.
- **RN-02** Cada vacuna guarda la fecha de aplicación y, opcionalmente, la fecha de la próxima dosis.
- **RN-03** Una vacuna está «por vencer» a 15 días de la próxima dosis y «vencida» si la fecha ya pasó.
- **RN-04** La edad de la mascota se calcula desde su fecha de nacimiento (años y meses).
- **RN-05** El historial de consultas nunca se borra; se puede anular una consulta con motivo.
- **RN-06** El costo acumulado de una mascota es la suma del costo de sus consultas.

## 4. Historias de usuario y criterios de aceptación

Formato: **Dado** un contexto, **Cuando** el usuario hace algo, **Entonces** pasa algo verificable.

### HU-01 — Registrar dueños y mascotas

**Como** veterinario **quiero** cargar el dueño con sus mascotas **para** tener la ficha completa.

**Fase:** 2 — Dueños y mascotas

**Criterios de aceptación:**

1. **Dado:** un dueño nuevo. **Cuando:** agrego una mascota con especie y raza. **Entonces:** queda en su ficha con la edad calculada.
2. **Dado:** una mascota sin fecha de nacimiento. **Cuando:** la guardo. **Entonces:** se guarda y muestra «edad desconocida».

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-02 — Llevar el carnet de vacunas

**Como** veterinario **quiero** registrar vacunas con fecha y próxima dosis **para** no olvidar ninguna.

**Fase:** 3 — Carnet de vacunas

**Criterios de aceptación:**

1. **Dado:** una mascota. **Cuando:** registro rabia hoy con próxima dosis en 1 año. **Entonces:** queda en el carnet con ambas fechas.
2. **Dado:** una próxima dosis anterior a la fecha de aplicación. **Cuando:** intento guardar. **Entonces:** la app lo rechaza.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-03 — Historial de consultas y costos

**Como** veterinario **quiero** anotar consultas, tratamientos y costo **para** tener el historial clínico.

**Fase:** 4 — Consultas e historial

**Criterios de aceptación:**

1. **Dado:** una consulta nueva. **Cuando:** anoto motivo, diagnóstico, tratamiento y 80 Bs. **Entonces:** se agrega al historial y suma al costo acumulado.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-04 — Recordatorios de próxima vacuna

**Como** veterinario **quiero** recibir avisos y mandar recordatorio al dueño **para** que vuelvan a tiempo.

**Fase:** 5 — Recordatorios y PDF

**Criterios de aceptación:**

1. **Dado:** una vacuna que vence en 7 días. **Cuando:** abro Pendientes. **Entonces:** aparece con el botón «Avisar al dueño».
2. **Dado:** toco «Avisar al dueño». **Cuando:** el dueño tiene teléfono. **Entonces:** se abre WhatsApp con el mensaje prellenado.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-05 — Carnet en PDF

**Como** veterinario **quiero** generar el carnet de la mascota en PDF **para** entregarlo al dueño.

**Fase:** 5 — Recordatorios y PDF

**Criterios de aceptación:**

1. **Dado:** una mascota con vacunas. **Cuando:** toco «Carnet PDF». **Entonces:** se genera un PDF con datos de la mascota, dueño y vacunas con fechas.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

## 5. Pantallas y navegación

| Pantalla | Qué muestra | Acciones principales |
|---|---|---|
| Inicio | Vacunas por vencer y vencidas, buscador de mascotas | Buscar, ver pendientes |
| Dueños y mascotas | Lista con búsqueda por nombre o teléfono | Crear dueño o mascota |
| Ficha de mascota | Datos, edad, pestañas Vacunas y Consultas | Agregar vacuna o consulta, PDF |
| Formulario de vacuna | Vacuna, fecha de aplicación, próxima dosis | Guardar |
| Formulario de consulta | Fecha, motivo, diagnóstico, tratamiento, costo | Guardar |
| Pendientes | Lista de próximas dosis con urgencia | Avisar por WhatsApp |

**Navegación:** la pantalla de inicio es el punto de partida; desde ahí se llega a cada sección con un toque y se vuelve con el botón atrás. Las acciones frecuentes (nuevo registro) están siempre a la vista. La navegación se implementa con Expo Router (rutas por archivo en `app/`).

## 6. Modelo de datos

Base SQLite local versionada con `PRAGMA user_version`. Las fechas se guardan como texto ISO 8601 y los montos como números reales (en bolivianos).

### `duenos`

Dueños con su teléfono.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `nombre` | TEXT | Obligatorio |
| `telefono` | TEXT | Opcional |

### `mascotas`

Pacientes con especie, raza y fecha de nacimiento.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `dueno_id` | INTEGER | Obligatorio; Referencia a duenos (se borra en cascada) |
| `nombre` | TEXT | Obligatorio |
| `especie` | TEXT | Obligatorio |
| `raza` | TEXT | Opcional |
| `nacimiento` | TEXT | Opcional |

### `vacunas`

Carnet de vacunas con próxima dosis.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `mascota_id` | INTEGER | Obligatorio; Referencia a mascotas (se borra en cascada) |
| `nombre` | TEXT | Obligatorio |
| `fecha` | TEXT | Obligatorio |
| `proxima` | TEXT | Opcional |

### `consultas`

Historial de consultas, tratamientos y costos.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `mascota_id` | INTEGER | Obligatorio; Referencia a mascotas (se borra en cascada) |
| `fecha` | TEXT | Obligatorio |
| `motivo` | TEXT | Obligatorio |
| `tratamiento` | TEXT | Opcional |
| `costo` | REAL | Obligatorio; Por defecto 0 |

Detalle de la política de migraciones: nunca editar una migración publicada; agregar una nueva al final de la lista en `src/db/schema.ts`.

## 7. Casos borde a contemplar

- Dueño con teléfono repetido en dos fichas: avisar y ofrecer unirlas.
- Mascota fallecida: marcar como inactiva y quitar sus recordatorios.
- Vacuna aplicada en otra veterinaria: permitir marcar origen «externa».
- Cachorro sin fecha exacta: permitir fecha aproximada.

## 8. Requisitos no funcionales

- **Offline total:** ninguna función del MVP requiere internet.
- **Rendimiento:** la app abre en menos de 2 segundos; las listas responden de inmediato con cientos de registros (consultas con índices y listas virtualizadas).
- **Privacidad:** los datos nunca salen del teléfono, salvo lo que el usuario comparte a propósito.
- **Idioma y formato:** español de Bolivia, montos en bolivianos (Bs) con dos decimales, fechas día/mes/año.
- **Usabilidad:** botones grandes, formularios cortos y flujos de pocos toques; pensado para usarse de pie y con una mano.
- **Accesibilidad básica:** contraste suficiente, etiquetas de accesibilidad en botones y tamaño de texto que respeta el ajuste del sistema.
- **Calidad:** `npm run lint`, `npx tsc --noEmit` y `npm test` pasan en cada commit (CI en GitHub Actions).
- **Compatibilidad:** Android 8 o superior (probado con Expo Go y con el APK).

### Capacidades de Expo que usa

| Paquete | Para qué | Permiso |
|---|---|---|
| `expo-notifications` | Recordatorios locales (programados en el teléfono, sin servidor) | Notificaciones |
| `expo-print` | Generar PDF desde HTML | — |
| `expo-sharing` | Compartir PDF, CSV o respaldos con otras apps | — |

## 9. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Datos clínicos mal cargados | Campos obligatorios mínimos y edición con historial. |
| Mensajes a un teléfono equivocado | Mostrar el número antes de abrir WhatsApp. |
| Cambios de esquema que rompan datos | Migraciones con `PRAGMA user_version`; nunca editar una migración publicada |
| El alcance crece | Todo lo que no esté en la sección 2 va a «Después del MVP» en el [ROADMAP](ROADMAP.md) |

## 10. Criterios para lanzar el MVP (v1.0.0)

- [ ] Todas las historias de la sección 4 cumplen sus criterios de aceptación.
- [ ] Todas las reglas de negocio de la sección 3 tienen pruebas o verificación manual.
- [ ] Probado en un teléfono Android real, en modo avión.
- [ ] APK generado con `npm run build:apk` e instalado en un teléfono limpio.
- [ ] README con capturas de pantalla y CHANGELOG actualizado.
- [ ] Release v1.0.0 publicado con el APK adjunto.

## 11. Glosario

| Término | Significado en VetCarnet |
|---|---|
| `duenos` | Dueños con su teléfono. |
| `mascotas` | Pacientes con especie, raza y fecha de nacimiento. |
| `vacunas` | Carnet de vacunas con próxima dosis. |
| `consultas` | Historial de consultas, tratamientos y costos. |
| `mascotas.especie` | Valores: perro, gato, otro |

## 12. Mensajes estándar

| Situación | Mensaje |
|---|---|
| Campo obligatorio vacío | Completá este campo |
| Número inválido | Ingresá un número válido |
| Monto cero o negativo | El monto debe ser mayor a 0 |
| Fecha inválida | Fecha no válida |
| Guardado correcto | Guardado |
| Error al guardar | No se pudo guardar. Intentá de nuevo |
| Confirmar borrado | ¿Borrar «{nombre}»? No se puede deshacer |
| Lista vacía | Todavía no hay nada acá. Tocá «+» para empezar |

## 13. Trazabilidad

| Historia | Fase | Casos de prueba |
|---|---|---|
| HU-01 Registrar dueños y mascotas | 2 | CP-01-1, CP-01-2 |
| HU-02 Llevar el carnet de vacunas | 3 | CP-02-1, CP-02-2 |
| HU-03 Historial de consultas y costos | 4 | CP-03-1 |
| HU-04 Recordatorios de próxima vacuna | 5 | CP-04-1, CP-04-2 |
| HU-05 Carnet en PDF | 5 | CP-05-1 |

## 14. Documentos relacionados

- [DATOS.md](DATOS.md) · [PANTALLAS.md](PANTALLAS.md) · [PRUEBAS.md](PRUEBAS.md) · [BACKLOG.md](BACKLOG.md) · [ROADMAP.md](ROADMAP.md) · [PLANNING.md](PLANNING.md)
