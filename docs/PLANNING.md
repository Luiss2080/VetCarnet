# Plan de desarrollo — VetCarnet

Guía para construir el MVP **fase por fase**. Complementa a [ROADMAP.md](ROADMAP.md) (qué y cuándo) y [SPEC.md](SPEC.md) (qué debe hacer la app).

## Forma de trabajo

1. **Una fase por rama:** `git checkout -b fase-N-nombre`.
2. **Un issue por tarea** (usá los títulos de abajo) y un milestone por fase en GitHub.
3. **Commits chicos** con prefijo: `feat:`, `fix:`, `test:`, `docs:`, `chore:`.
4. **Pull request al cerrar la fase** con la lista de criterios de salida marcada.
5. **Primero la lógica pura y sus pruebas** (en `src/lib/`), después la pantalla que la usa.
6. **Probá en el teléfono** al terminar cada tarea de pantalla, no solo al final de la fase.

### Definición de «terminado» (vale para toda tarea y fase)

- [ ] `npm run lint`, `npx tsc --noEmit` y `npm test` sin errores.
- [ ] Funciona en modo avión.
- [ ] Estados vacíos, de carga y de error resueltos, con textos en español.
- [ ] Los datos persisten al reiniciar la app.
- [ ] La regla de negocio correspondiente tiene prueba o verificación manual anotada.
- [ ] CHANGELOG actualizado al cerrar la fase.

## Calendario sugerido

| Fase | Nombre | Días | Acumulado |
|---|---|---|---|
| 1 | Estructura base y navegación | 2 | 2 |
| 2 | Dueños y mascotas | 3 | 5 |
| 3 | Carnet de vacunas | 4 | 9 |
| 4 | Consultas e historial | 3 | 12 |
| 5 | Recordatorios y PDF | 4 | 16 |

Total: **16 días** (~4 semanas). Si una fase se pasa del doble de lo estimado, recortá alcance dentro de la fase en lugar de saltar a la siguiente.

---

## Fase 1 — Estructura base y navegación

**Estimación:** 2 días.

**Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción. La estructura ya viene en el repositorio.

**Tareas**

- [ ] **F1-T1** `npm install` y `npx expo start`: la app abre en Expo Go.
- [ ] **F1-T2** Revisar `src/db/schema.ts`: la base se crea y migra sola al primer arranque (verificar en el teléfono).
- [ ] **F1-T3** Definir la navegación principal en `app/_layout.tsx` (inicio + una sección por entidad).
- [ ] **F1-T4** Aplicar el tema de `src/theme.ts` y el componente `Pantalla` a todas las rutas.
- [ ] **F1-T5** Pantalla de inicio con tarjetas de acceso a cada sección.
- [ ] **F1-T6** Confirmar que el CI de GitHub Actions pasa en verde.

**Criterio de salida:** la app abre, navega entre secciones vacías y no da errores; lint, tipos y tests en verde.

---

## Fase 2 — Dueños y mascotas

**Estimación:** 3 días. **Rama sugerida:** `fase-2-duenos-y-mascotas`.

**Objetivo:** Dueños y mascotas.

**Historias que se completan:** HU-01 (Registrar dueños y mascotas).

**Tareas**

- [ ] **F2-T1** CRUD de dueños y mascotas.
- [ ] **F2-T2** Función de edad (años y meses) con pruebas.
- [ ] **F2-T3** Búsqueda por nombre del dueño, de la mascota o teléfono.
- [ ] **F2-T4** Ficha de mascota con datos básicos.
- [ ] **F2-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F2-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F2-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-01 — un dueño nuevo → agrego una mascota con especie y raza → queda en su ficha con la edad calculada.
- [ ] HU-01 — una mascota sin fecha de nacimiento → la guardo → se guarda y muestra «edad desconocida».

**Criterio de salida:**

- [ ] Busco una mascota por el nombre del dueño.
- [ ] Definición de «terminado» cumplida.

---

## Fase 3 — Carnet de vacunas

**Estimación:** 4 días. **Rama sugerida:** `fase-3-carnet-de-vacunas`.

**Objetivo:** Carnet de vacunas.

**Historias que se completan:** HU-02 (Llevar el carnet de vacunas).

**Tareas**

- [ ] **F3-T1** Catálogo base de vacunas por especie (perro, gato).
- [ ] **F3-T2** Formulario de vacuna con próxima dosis y validación de fechas.
- [ ] **F3-T3** Pestaña Vacunas con estado por semáforo.
- [ ] **F3-T4** Función pura de estado de vacuna con pruebas.
- [ ] **F3-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F3-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F3-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-02 — una mascota → registro rabia hoy con próxima dosis en 1 año → queda en el carnet con ambas fechas.
- [ ] HU-02 — una próxima dosis anterior a la fecha de aplicación → intento guardar → la app lo rechaza.

**Criterio de salida:**

- [ ] Una vacuna con próxima dosis cambia de estado según la fecha.
- [ ] Definición de «terminado» cumplida.

---

## Fase 4 — Consultas e historial

**Estimación:** 3 días. **Rama sugerida:** `fase-4-consultas-e-historial`.

**Objetivo:** Consultas e historial.

**Historias que se completan:** HU-03 (Historial de consultas y costos).

**Tareas**

- [ ] **F4-T1** CRUD de consultas con costo.
- [ ] **F4-T2** Anulación con motivo en lugar de borrado.
- [ ] **F4-T3** Costo acumulado por mascota.
- [ ] **F4-T4** Pestaña Consultas ordenada por fecha.
- [ ] **F4-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F4-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F4-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-03 — una consulta nueva → anoto motivo, diagnóstico, tratamiento y 80 Bs → se agrega al historial y suma al costo acumulado.

**Criterio de salida:**

- [ ] El costo acumulado coincide con la suma de consultas no anuladas.
- [ ] Definición de «terminado» cumplida.

---

## Fase 5 — Recordatorios y PDF

**Estimación:** 4 días. **Rama sugerida:** `fase-5-recordatorios-y-pdf`.

**Objetivo:** Recordatorios y carnet en PDF.

**Historias que se completan:** HU-04 (Recordatorios de próxima vacuna), HU-05 (Carnet en PDF).

**Tareas**

- [ ] **F5-T1** Pantalla Pendientes ordenada por urgencia.
- [ ] **F5-T2** Notificaciones locales para el veterinario.
- [ ] **F5-T3** Mensaje de WhatsApp prellenado al dueño.
- [ ] **F5-T4** Plantilla HTML del carnet y exportación con expo-print.
- [ ] **F5-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F5-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F5-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-04 — una vacuna que vence en 7 días → abro Pendientes → aparece con el botón «Avisar al dueño».
- [ ] HU-04 — toco «Avisar al dueño» → el dueño tiene teléfono → se abre WhatsApp con el mensaje prellenado.
- [ ] HU-05 — una mascota con vacunas → toco «Carnet PDF» → se genera un PDF con datos de la mascota, dueño y vacunas con fechas.

**Criterio de salida:**

- [ ] El carnet en PDF se comparte desde un teléfono real.
- [ ] Definición de «terminado» cumplida.

---

## Lanzamiento del MVP (v1.0.0)

- [ ] Revisar todas las historias de [SPEC.md](SPEC.md) y marcar sus criterios.
- [ ] Capturas de pantalla para el README.
- [ ] Revisar textos, íconos y nombre de la app en `app.json`.
- [ ] `npm run build:apk` y probar el APK en un teléfono limpio, sin Expo Go y en modo avión.
- [ ] Publicar el release v1.0.0 con el APK adjunto.
- [ ] Pasar las ideas pendientes a issues para la versión 1.1.

## Plantilla de issue

Copiá esto al crear cada issue:

```
Título: [F2-T1] <descripción de la tarea>
Fase: N — <nombre>
Historia: HU-XX
Criterios:
- [ ] ...
Notas técnicas: ...
```

---

## Cronograma día por día

Guía para no perder el hilo: cada día tiene tareas concretas. Si un día se atrasa, mové la tarea al siguiente, no la saltees.

### Fase 1 — Estructura base y navegación

- **Día 1** (día 1 de la fase): `F1-T1` Instalar dependencias y abrir la app en Expo Go; `F1-T2` Verificar creación y migración de la base; `F1-T3` Definir la navegación principal.
- **Día 2** (día 2 de la fase): `F1-T4` Aplicar tema y componente Pantalla; `F1-T5` Pantalla de inicio con accesos; `F1-T6` Confirmar CI en verde.

### Fase 2 — Dueños y mascotas

- **Día 3** (día 1 de la fase): `F2-T1` CRUD de dueños y mascotas.; `F2-T2` Función de edad (años y meses) con pruebas.; `F2-T3` Búsqueda por nombre del dueño, de la mascota o teléfono..
- **Día 4** (día 2 de la fase): `F2-T4` Ficha de mascota con datos básicos.; `F2-T5` Validaciones, estados vacíos y mensajes en español; `F2-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 5** (día 3 de la fase): `F2-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 3 — Carnet de vacunas

- **Día 6** (día 1 de la fase): `F3-T1` Catálogo base de vacunas por especie (perro, gato).; `F3-T2` Formulario de vacuna con próxima dosis y validación de fechas..
- **Día 7** (día 2 de la fase): `F3-T3` Pestaña Vacunas con estado por semáforo.; `F3-T4` Función pura de estado de vacuna con pruebas..
- **Día 8** (día 3 de la fase): `F3-T5` Validaciones, estados vacíos y mensajes en español; `F3-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 9** (día 4 de la fase): `F3-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 4 — Consultas e historial

- **Día 10** (día 1 de la fase): `F4-T1` CRUD de consultas con costo.; `F4-T2` Anulación con motivo en lugar de borrado.; `F4-T3` Costo acumulado por mascota..
- **Día 11** (día 2 de la fase): `F4-T4` Pestaña Consultas ordenada por fecha.; `F4-T5` Validaciones, estados vacíos y mensajes en español; `F4-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 12** (día 3 de la fase): `F4-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 5 — Recordatorios y PDF

- **Día 13** (día 1 de la fase): `F5-T1` Pantalla Pendientes ordenada por urgencia.; `F5-T2` Notificaciones locales para el veterinario..
- **Día 14** (día 2 de la fase): `F5-T3` Mensaje de WhatsApp prellenado al dueño.; `F5-T4` Plantilla HTML del carnet y exportación con expo-print..
- **Día 15** (día 3 de la fase): `F5-T5` Validaciones, estados vacíos y mensajes en español; `F5-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 16** (día 4 de la fase): `F5-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

## Rutina diaria

1. Empezá releyendo la tarea del día en [BACKLOG.md](BACKLOG.md) y su regla o historia en [SPEC.md](SPEC.md).
2. Escribí primero la prueba de la lógica, después el código.
3. Probá en el teléfono antes de hacer commit.
4. Cerrá el día con un commit, el issue marcado y una línea en el CHANGELOG si corresponde.

## Qué hacer si te trabás

- Más de 2 horas sin avanzar: simplificá la tarea al caso mínimo y anotá lo que quedó fuera como issue `mejora`.
- Duda de alcance: la respuesta está en la sección 2 del [SPEC](SPEC.md); si no está, no entra al MVP.
- Duda de datos o validaciones: [DATOS.md](DATOS.md).
- Duda de pantallas: [PANTALLAS.md](PANTALLAS.md).
- Duda de cómo probar: [PRUEBAS.md](PRUEBAS.md).
