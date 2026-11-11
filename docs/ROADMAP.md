# Roadmap de VetCarnet

> Que cada mascota tenga su carnet de vacunas al día y que nadie olvide la próxima dosis.

Ruta de desarrollo del MVP, fase por fase. Cada fase termina con algo que se puede **usar y probar en un teléfono**. Trabajá una fase a la vez y no pases a la siguiente hasta cumplir su criterio de salida.

## Resumen

- **Objetivo del MVP:** Ficha de mascotas y carnet de vacunas digital, con recordatorio de la próxima dosis.
- **Usuario:** Veterinaria pequeña o veterinario independiente con 50 a 500 pacientes, y dueños que quieren su carnet siempre a mano.
- **Duración estimada:** ~16 días de trabajo efectivo (~4 semanas a ritmo tranquilo).
- **Costo:** $0 (sin servidores, sin suscripciones, todo offline en SQLite).

## Línea de tiempo

| Fase | Nombre | Objetivo | Días | Semana acumulada |
|---|---|---|---|---|
| 1 | Estructura base y navegación | Verificar la base y dejar la navegación y el tema listos. | 2 | 1 |
| 2 | Dueños y mascotas | Dueños y mascotas. | 3 | 1 |
| 3 | Carnet de vacunas | Carnet de vacunas. | 4 | 2 |
| 4 | Consultas e historial | Consultas e historial. | 3 | 3 |
| 5 | Recordatorios y PDF | Recordatorios y carnet en PDF. | 4 | 4 |

## Hitos

### Hito 1 — Estructura base y navegación

**Demo:** La app abre en Expo Go, navega entre secciones vacías y el CI pasa en verde.

### Hito 2 — Dueños y mascotas

**Demo:** Busco una mascota por el nombre del dueño.

### Hito 3 — Carnet de vacunas

**Demo:** Una vacuna con próxima dosis cambia de estado según la fecha.

### Hito 4 — Consultas e historial

**Demo:** El costo acumulado coincide con la suma de consultas no anuladas.

### Hito 5 — Recordatorios y PDF

**Demo:** El carnet en PDF se comparte desde un teléfono real.

## Detalle por fase

### Fase 1 — Estructura base y navegación

- **Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción.
- **Historias cubiertas:** ninguna (infraestructura).
- **Depende de:** nada.
- **Criterio de salida:** la app abre, navega y el CI está en verde.

### Fase 2 — Dueños y mascotas

- **Objetivo:** Dueños y mascotas.
- **Historias cubiertas:** HU-01 Registrar dueños y mascotas
- **Depende de:** fase 1.
- **Duración:** 3 días.
- **Criterio de salida:**
  - Busco una mascota por el nombre del dueño.

### Fase 3 — Carnet de vacunas

- **Objetivo:** Carnet de vacunas.
- **Historias cubiertas:** HU-02 Llevar el carnet de vacunas
- **Depende de:** fase 2.
- **Duración:** 4 días.
- **Criterio de salida:**
  - Una vacuna con próxima dosis cambia de estado según la fecha.

### Fase 4 — Consultas e historial

- **Objetivo:** Consultas e historial.
- **Historias cubiertas:** HU-03 Historial de consultas y costos
- **Depende de:** fase 3.
- **Duración:** 3 días.
- **Criterio de salida:**
  - El costo acumulado coincide con la suma de consultas no anuladas.

### Fase 5 — Recordatorios y PDF

- **Objetivo:** Recordatorios y carnet en PDF.
- **Historias cubiertas:** HU-04 Recordatorios de próxima vacuna; HU-05 Carnet en PDF
- **Depende de:** fase 4.
- **Duración:** 4 días.
- **Criterio de salida:**
  - El carnet en PDF se comparte desde un teléfono real.

## Estado

- [ ] **Fase 1:** Estructura base y navegación
- [ ] **Fase 2:** Dueños y mascotas
- [ ] **Fase 3:** Carnet de vacunas
- [ ] **Fase 4:** Consultas e historial
- [ ] **Fase 5:** Recordatorios y PDF

## Dependencias y supuestos

- Un teléfono Android real para probar (Expo Go) y, al final, para instalar el APK.
- Node.js 20+ y la app Expo Go.
- Todo lo demás (cuentas, nube, pagos) queda fuera del MVP.

## Después del MVP (v1.1 en adelante)

- [ ] Modo oscuro.
- [ ] Búsqueda y filtros avanzados en las listas.
- [ ] Estadísticas y gráficos simples en la pantalla de inicio.
- [ ] Publicación en Google Play (cuenta de desarrollador, pago único de USD 25).
- [ ] Respaldo y restauración de la base de datos.
- [ ] Sincronización opcional entre dispositivos (solo si hay demanda real).

## Cómo usar este documento

1. [SPEC.md](SPEC.md) define **qué** debe hacer la app (historias, reglas, pantallas, datos).
2. [PLANNING.md](PLANNING.md) define **cómo** construirla fase por fase (tareas, pruebas, issues).
3. Al cerrar una fase: marcá el estado acá, actualizá el [CHANGELOG](../CHANGELOG.md) y fusioná la rama a `main`.

## Trazabilidad: historias por fase

| Historia | Fase | Entrega |
|---|---|---|
| HU-01 Registrar dueños y mascotas | 2 | Dueños y mascotas |
| HU-02 Llevar el carnet de vacunas | 3 | Carnet de vacunas |
| HU-03 Historial de consultas y costos | 4 | Consultas e historial |
| HU-04 Recordatorios de próxima vacuna | 5 | Recordatorios y PDF |
| HU-05 Carnet en PDF | 5 | Recordatorios y PDF |

## Indicadores de avance

| Indicador | Cómo se mide | Meta |
|---|---|---|
| Avance de tareas | Issues cerrados / 34 | 100 % al lanzar |
| Historias aceptadas | Casos CP- marcados ✔ / 8 | 100 % |
| Reglas cubiertas | RN con prueba / 6 | 100 % |
| Ritmo | Días reales vs estimados por fase | Desvío menor al 50 % |
| Calidad | Errores abiertos al cierre de fase | 0 críticos |

## Revisión de fin de fase

Antes de pasar a la siguiente fase respondé por escrito (5 minutos):

1. ¿Se cumplieron todos los criterios de salida?
2. ¿Cuántos días tomó realmente frente a lo estimado?
3. ¿Qué se recortó o se dejó para después?
4. ¿Hay algo que cambie el SPEC? Actualizalo antes de seguir.

## Documentos de apoyo

- [DATOS.md](DATOS.md): campos, validaciones, consultas y migraciones.
- [PANTALLAS.md](PANTALLAS.md): ruta, estados y bosquejo de cada pantalla.
- [PRUEBAS.md](PRUEBAS.md): casos de prueba por regla, historia y borde.
- [BACKLOG.md](BACKLOG.md): issues listos para GitHub con milestones y etiquetas.
