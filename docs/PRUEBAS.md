# Plan de pruebas — VetCarnet

> Qué probar, cuándo y cómo. Cada historia y cada regla de negocio tiene casos concretos. Complementa a [SPEC.md](SPEC.md).

## 1. Estrategia

| Nivel | Herramienta | Qué cubre | Cuándo |
|---|---|---|---|
| Unitarias | jest-expo (`npm test`) | Lógica pura de `src/lib/` (cálculos, validaciones, formatos) | En cada commit (CI) |
| Manuales por historia | Teléfono con Expo Go | Criterios de aceptación de SPEC (casos CP-) | Al cerrar cada tarea de pantalla |
| Regresión por fase | Teléfono real | Lo ya terminado sigue andando | Al cerrar cada fase |
| Aceptación final | APK en teléfono limpio, modo avión | Criterios de lanzamiento | Antes de v1.0.0 |

Meta de cobertura: **100 % de las reglas de negocio** con prueba automática o caso manual, y **100 % de los criterios de aceptación** ejecutados al menos una vez en un teléfono real.

## 2. Pruebas unitarias por regla de negocio

Crear un archivo `src/lib/<tema>.test.ts` por tema. Una prueba por regla como mínimo; agregar los bordes de la sección 4.

| ID | Regla | Tipo de prueba | Casos mínimos |
|---|---|---|---|
| RN-01 | Una mascota pertenece a un dueño; un dueño puede tener varias mascotas. | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-02 | Cada vacuna guarda la fecha de aplicación y, opcionalmente, la fecha de la próxima dosis. | Unitaria (fechas) | Hoy, mañana, fin de mes, año bisiesto |
| RN-03 | Una vacuna está «por vencer» a 15 días de la próxima dosis y «vencida» si la fecha ya pasó. | Unitaria (fechas) | Hoy, mañana, fin de mes, año bisiesto |
| RN-04 | La edad de la mascota se calcula desde su fecha de nacimiento (años y meses). | Unitaria (cálculo) | Valor típico, cero, redondeo a 2 decimales, valor grande |
| RN-05 | El historial de consultas nunca se borra; se puede anular una consulta con motivo. | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-06 | El costo acumulado de una mascota es la suma del costo de sus consultas. | Unitaria (cálculo) | Valor típico, cero, redondeo a 2 decimales, valor grande |

## 3. Casos manuales por historia

Formato: ejecutar en el teléfono, marcar ✔ o ✘ y anotar la fecha. Si falla, abrir un issue con el ID del caso.

### HU-01 — Registrar dueños y mascotas (fase 2)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-01-1 | un dueño nuevo | agrego una mascota con especie y raza | queda en su ficha con la edad calculada | ☐ |
| CP-01-2 | una mascota sin fecha de nacimiento | la guardo | se guarda y muestra «edad desconocida» | ☐ |

Casos transversales: **CP-01-T1** modo avión · **CP-01-T2** cerrar y reabrir la app (persistencia) · **CP-01-T3** texto del sistema en tamaño grande.

### HU-02 — Llevar el carnet de vacunas (fase 3)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-02-1 | una mascota | registro rabia hoy con próxima dosis en 1 año | queda en el carnet con ambas fechas | ☐ |
| CP-02-2 | una próxima dosis anterior a la fecha de aplicación | intento guardar | la app lo rechaza | ☐ |

Casos transversales: **CP-02-T1** modo avión · **CP-02-T2** cerrar y reabrir la app (persistencia) · **CP-02-T3** texto del sistema en tamaño grande.

### HU-03 — Historial de consultas y costos (fase 4)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-03-1 | una consulta nueva | anoto motivo, diagnóstico, tratamiento y 80 Bs | se agrega al historial y suma al costo acumulado | ☐ |

Casos transversales: **CP-03-T1** modo avión · **CP-03-T2** cerrar y reabrir la app (persistencia) · **CP-03-T3** texto del sistema en tamaño grande.

### HU-04 — Recordatorios de próxima vacuna (fase 5)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-04-1 | una vacuna que vence en 7 días | abro Pendientes | aparece con el botón «Avisar al dueño» | ☐ |
| CP-04-2 | toco «Avisar al dueño» | el dueño tiene teléfono | se abre WhatsApp con el mensaje prellenado | ☐ |

Casos transversales: **CP-04-T1** modo avión · **CP-04-T2** cerrar y reabrir la app (persistencia) · **CP-04-T3** texto del sistema en tamaño grande.

### HU-05 — Carnet en PDF (fase 5)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-05-1 | una mascota con vacunas | toco «Carnet PDF» | se genera un PDF con datos de la mascota, dueño y vacunas con fechas | ☐ |

Casos transversales: **CP-05-T1** modo avión · **CP-05-T2** cerrar y reabrir la app (persistencia) · **CP-05-T3** texto del sistema en tamaño grande.

## 4. Casos borde

| ID | Caso | Resultado esperado | Resultado |
|---|---|---|---|
| CB-01 | Dueño con teléfono repetido en dos fichas: avisar y ofrecer unirlas. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-02 | Mascota fallecida: marcar como inactiva y quitar sus recordatorios. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-03 | Vacuna aplicada en otra veterinaria: permitir marcar origen «externa». | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-04 | Cachorro sin fecha exacta: permitir fecha aproximada. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |

## 5. Pruebas de datos y migraciones

| ID | Prueba | Esperado |
|---|---|---|
| CD-01 | Primer arranque en teléfono limpio | La base se crea con todas las tablas y `user_version` queda en 1 |
| CD-02 | Actualizar de una versión anterior con datos cargados | Las migraciones nuevas se aplican y no se pierde ningún registro |
| CD-03 | Borrar un registro padre | Los hijos se borran o se bloquea con mensaje, según el esquema |
| CD-04 | Intentar guardar con campos obligatorios vacíos | No se inserta nada y se marcan los campos |
| CD-05 | Cargar 1.000 registros de prueba | Las listas siguen fluidas (scroll sin trabas) y abren en menos de 2 s |

## 6. Regresión al cerrar cada fase

**Fase 1 — Estructura base y navegación**

- [ ] La app abre y navega sin errores

**Fase 2 — Dueños y mascotas**

- [ ] Busco una mascota por el nombre del dueño.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 3 — Carnet de vacunas**

- [ ] Una vacuna con próxima dosis cambia de estado según la fecha.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 4 — Consultas e historial**

- [ ] El costo acumulado coincide con la suma de consultas no anuladas.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 5 — Recordatorios y PDF**

- [ ] El carnet en PDF se comparte desde un teléfono real.
- [ ] Los criterios de las fases anteriores siguen funcionando

## 7. Matriz de dispositivos

| Dispositivo | Android | Qué se verifica |
|---|---|---|
| Gama baja (2–3 GB de RAM) | 8–10 | Fluidez de listas, tiempo de arranque |
| Gama media | 11–13 | Flujo completo y APK |
| Pantalla pequeña (5") | cualquiera | Que nada quede cortado ni oculto por el teclado |
| Texto del sistema grande | cualquiera | Que los formularios sigan siendo usables |

## 8. Lista de verificación para el lanzamiento (v1.0.0)

- [ ] Todas las historias ejecutadas en teléfono real (casos CP-)
- [ ] Todos los casos borde (CB-) ejecutados
- [ ] Pruebas de datos (CD-) ejecutadas
- [ ] APK instalado en un teléfono limpio sin Expo Go
- [ ] Probado en modo avión durante todo el flujo principal
- [ ] Rotación de pantalla no pierde datos del formulario
- [ ] Permisos solicitados solo cuando se necesitan y con explicación
- [ ] Sin errores en la consola durante un recorrido completo
- [ ] README con capturas y CHANGELOG al día

## 9. Informe de errores

```
Título: [Bug] <qué pasó>
ID de caso: CP-XX-X
Pasos: 1... 2... 3...
Esperado: ...
Obtenido: ...
Dispositivo / Android: ...
Captura o video: ...
```
