# Backlog de issues — VetCarnet

> Lista lista para pasar a GitHub Issues, con milestones, etiquetas, estimaciones y trazabilidad a las historias. Se puede crear todo de una vez con [crear-issues.sh](crear-issues.sh).

## 1. Milestones

| Milestone | Fase | Días | Tareas | Horas est. |
|---|---|---|---|---|
| Fase 1 — Estructura base y navegación | 1 | 2 | 6 | 12 |
| Fase 2 — Dueños y mascotas | 2 | 3 | 7 | 17.5 |
| Fase 3 — Carnet de vacunas | 3 | 4 | 7 | 24.5 |
| Fase 4 — Consultas e historial | 4 | 3 | 7 | 17.5 |
| Fase 5 — Recordatorios y PDF | 5 | 4 | 7 | 24.5 |

Total: **34 tareas**, ~96 horas (16 días a 6 horas efectivas).

## 2. Etiquetas

| Etiqueta | Uso |
|---|---|
| ui | Pantallas y componentes |
| datos | Tablas, consultas y migraciones |
| lógica | Reglas de negocio y cálculos |
| pruebas | Pruebas automáticas y manuales |
| integración | Cámara, notificaciones, PDF, compartir |
| tarea | Otras tareas |
| bug | Errores |
| mejora | Ideas para v1.1+ |

## 3. Issues del MVP

### Fase 1 — Estructura base y navegación

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F1-T1` | Instalar dependencias y abrir la app en Expo Go | — | tarea | Alta | 2 |
| `F1-T2` | Verificar creación y migración de la base | — | datos | Alta | 2 |
| `F1-T3` | Definir la navegación principal | — | ui | Alta | 2 |
| `F1-T4` | Aplicar tema y componente Pantalla | — | ui | Alta | 2 |
| `F1-T5` | Pantalla de inicio con accesos | — | ui | Alta | 2 |
| `F1-T6` | Confirmar CI en verde | — | tarea | Alta | 2 |

### Fase 2 — Dueños y mascotas

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F2-T1` | CRUD de dueños y mascotas. | HU-01 | tarea | Alta | 2.5 |
| `F2-T2` | Función de edad (años y meses) con pruebas. | HU-01 | lógica, pruebas | Alta | 2.5 |
| `F2-T3` | Búsqueda por nombre del dueño, de la mascota o teléfono. | HU-01 | tarea | Alta | 2.5 |
| `F2-T4` | Ficha de mascota con datos básicos. | HU-01 | ui | Alta | 2.5 |
| `F2-T5` | Validaciones, estados vacíos y mensajes en español | HU-01 | lógica | Alta | 2.5 |
| `F2-T6` | Pruebas automáticas y verificación manual de criterios | HU-01 | pruebas | Alta | 2.5 |
| `F2-T7` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-01 | pruebas | Alta | 2.5 |

### Fase 3 — Carnet de vacunas

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F3-T1` | Catálogo base de vacunas por especie (perro, gato). | HU-02 | datos | Alta | 3.5 |
| `F3-T2` | Formulario de vacuna con próxima dosis y validación de fechas. | HU-02 | ui, lógica | Alta | 3.5 |
| `F3-T3` | Pestaña Vacunas con estado por semáforo. | HU-02 | tarea | Alta | 3.5 |
| `F3-T4` | Función pura de estado de vacuna con pruebas. | HU-02 | lógica, pruebas | Alta | 3.5 |
| `F3-T5` | Validaciones, estados vacíos y mensajes en español | HU-02 | lógica | Alta | 3.5 |
| `F3-T6` | Pruebas automáticas y verificación manual de criterios | HU-02 | pruebas | Alta | 3.5 |
| `F3-T7` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-02 | pruebas | Alta | 3.5 |

### Fase 4 — Consultas e historial

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F4-T1` | CRUD de consultas con costo. | HU-03 | datos | Media | 2.5 |
| `F4-T2` | Anulación con motivo en lugar de borrado. | HU-03 | tarea | Media | 2.5 |
| `F4-T3` | Costo acumulado por mascota. | HU-03 | tarea | Media | 2.5 |
| `F4-T4` | Pestaña Consultas ordenada por fecha. | HU-03 | datos | Media | 2.5 |
| `F4-T5` | Validaciones, estados vacíos y mensajes en español | HU-03 | lógica | Media | 2.5 |
| `F4-T6` | Pruebas automáticas y verificación manual de criterios | HU-03 | pruebas | Media | 2.5 |
| `F4-T7` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-03 | pruebas | Media | 2.5 |

### Fase 5 — Recordatorios y PDF

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F5-T1` | Pantalla Pendientes ordenada por urgencia. | HU-04, HU-05 | ui | Media | 3.5 |
| `F5-T2` | Notificaciones locales para el veterinario. | HU-04, HU-05 | integración | Media | 3.5 |
| `F5-T3` | Mensaje de WhatsApp prellenado al dueño. | HU-04, HU-05 | integración | Media | 3.5 |
| `F5-T4` | Plantilla HTML del carnet y exportación con expo-print. | HU-04, HU-05 | integración | Media | 3.5 |
| `F5-T5` | Validaciones, estados vacíos y mensajes en español | HU-04, HU-05 | lógica | Media | 3.5 |
| `F5-T6` | Pruebas automáticas y verificación manual de criterios | HU-04, HU-05 | pruebas | Media | 3.5 |
| `F5-T7` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-04, HU-05 | pruebas | Media | 3.5 |

## 4. Orden recomendado de ataque

1. Terminá cada fase completa antes de abrir la siguiente; dentro de la fase, de arriba hacia abajo.
2. Las tareas `lógica` y `datos` van antes que las `ui` que las usan.
3. Cada issue se cierra con un commit o PR que lo mencione (`Cierra #N`).
4. Nada de abrir issues de v1.1 hasta tener el APK de la v1.0.0.

## 5. Ideas para después del MVP

| Idea | Esfuerzo | Valor |
|---|---|---|
| Modo oscuro | Bajo | Medio |
| Búsqueda y filtros avanzados | Medio | Alto |
| Estadísticas y gráficos simples en inicio | Medio | Medio |
| Respaldo y restauración de la base | Medio | Alto |
| Publicación en Google Play | Bajo | Alto |
| Sincronización opcional entre dispositivos | Alto | Depende de demanda |
