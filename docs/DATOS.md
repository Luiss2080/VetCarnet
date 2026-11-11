# Modelo de datos — VetCarnet

> Diseño detallado de la base SQLite: campos, validaciones, consultas y migraciones. Complementa la sección 6 de [SPEC.md](SPEC.md).

## 1. Convenciones

- Base local `SQLite` con `expo-sqlite`; versión del esquema en `PRAGMA user_version`.
- Claves primarias `INTEGER AUTOINCREMENT` llamadas `id`.
- Fechas como texto ISO `AAAA-MM-DD` (y `AAAA-MM-DDTHH:MM` cuando hay hora). Nunca se guardan textos como «hoy».
- Montos como `REAL` en bolivianos; se redondean a 2 decimales al guardar y se formatean al mostrar.
- Booleanos como `INTEGER` 0/1.
- Los textos se guardan sin espacios sobrantes (`trim()`).
- Todas las consultas usan parámetros (`?`), nunca concatenan texto del usuario.
- Las claves foráneas se activan con `PRAGMA foreign_keys = ON` al abrir la base.

## 2. Relaciones

| Campo | Apunta a | Comportamiento |
|---|---|---|
| `mascotas.dueno_id` | `duenos` | Al borrar el padre se borran los hijos |
| `vacunas.mascota_id` | `mascotas` | Al borrar el padre se borran los hijos |
| `consultas.mascota_id` | `mascotas` | Al borrar el padre se borran los hijos |

```
duenos  ──<  mascotas
mascotas  ──<  vacunas, consultas
vacunas
consultas
```

## 3. Detalle por tabla

### 3.1 `duenos`

Dueños con su teléfono.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `nombre` | TEXT → `string` | Texto | Obligatorio; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí nombre» |
| `telefono` | TEXT → `string \| null` | Teléfono | Opcional; Solo dígitos, 7 a 15 caracteres (se ignoran espacios y guiones) | «Teléfono no válido» |

**Consultas base** (en `src/db/duenos.ts`):

```ts
listar(): Promise<Dueno[]>            // SELECT * FROM duenos ORDER BY id DESC
obtener(id: number): Promise<Dueno | null>   // SELECT * FROM duenos WHERE id = ?
crear(datos: NuevoDueno): Promise<number>   // INSERT INTO duenos (nombre, telefono) VALUES (?, ?)
actualizar(id: number, datos: NuevoDueno): Promise<void>   // UPDATE duenos SET nombre = ?, telefono = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM duenos WHERE id = ?
```

### 3.2 `mascotas`

Pacientes con especie, raza y fecha de nacimiento.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `dueno_id` | INTEGER → `number` | Selector de duenos | Obligatorio; Debe existir en `duenos` | «Elegí un registro» |
| `nombre` | TEXT → `string` | Texto | Obligatorio; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí nombre» |
| `especie` | TEXT → `string` | Selector / fichas | Obligatorio; Uno de: `perro`, `gato`, `otro` | «Elegí una opción» |
| `raza` | TEXT → `string \| null` | Texto | Opcional; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí raza» |
| `nacimiento` | TEXT → `string \| null` | Fecha | Opcional; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_mascotas_dueno_id ON mascotas(dueno_id);
```

**Consultas base** (en `src/db/mascotas.ts`):

```ts
listar(): Promise<Mascota[]>            // SELECT * FROM mascotas ORDER BY id DESC
obtener(id: number): Promise<Mascota | null>   // SELECT * FROM mascotas WHERE id = ?
crear(datos: NuevoMascota): Promise<number>   // INSERT INTO mascotas (dueno_id, nombre, especie, raza, nacimiento) VALUES (?, ?, ?, ?, ?)
actualizar(id: number, datos: NuevoMascota): Promise<void>   // UPDATE mascotas SET dueno_id = ?, nombre = ?, especie = ?, raza = ?, nacimiento = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM mascotas WHERE id = ?
listarPorDueno(dueno_id: number): Promise<Mascota[]>   // WHERE dueno_id = ?
```

### 3.3 `vacunas`

Carnet de vacunas con próxima dosis.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `mascota_id` | INTEGER → `number` | Selector de mascotas | Obligatorio; Debe existir en `mascotas` | «Elegí un registro» |
| `nombre` | TEXT → `string` | Texto | Obligatorio; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí nombre» |
| `fecha` | TEXT → `string` | Fecha | Obligatorio; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |
| `proxima` | TEXT → `string \| null` | Fecha | Opcional; Fecha real en formato AAAA-MM-DD; No anterior a la fecha de inicio/aplicación si ambas existen | «Fecha no válida» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_vacunas_mascota_id ON vacunas(mascota_id);
CREATE INDEX IF NOT EXISTS idx_vacunas_fecha ON vacunas(fecha);
CREATE INDEX IF NOT EXISTS idx_vacunas_proxima ON vacunas(proxima);
```

**Consultas base** (en `src/db/vacunas.ts`):

```ts
listar(): Promise<Vacuna[]>            // SELECT * FROM vacunas ORDER BY id DESC
obtener(id: number): Promise<Vacuna | null>   // SELECT * FROM vacunas WHERE id = ?
crear(datos: NuevoVacuna): Promise<number>   // INSERT INTO vacunas (mascota_id, nombre, fecha, proxima) VALUES (?, ?, ?, ?)
actualizar(id: number, datos: NuevoVacuna): Promise<void>   // UPDATE vacunas SET mascota_id = ?, nombre = ?, fecha = ?, proxima = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM vacunas WHERE id = ?
listarPorMascota(mascota_id: number): Promise<Vacuna[]>   // WHERE mascota_id = ?
```

### 3.4 `consultas`

Historial de consultas, tratamientos y costos.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `mascota_id` | INTEGER → `number` | Selector de mascotas | Obligatorio; Debe existir en `mascotas` | «Elegí un registro» |
| `fecha` | TEXT → `string` | Fecha | Obligatorio; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |
| `motivo` | TEXT → `string` | Texto largo | Obligatorio; Hasta 280 caracteres | «Máximo 280 caracteres» |
| `tratamiento` | TEXT → `string \| null` | Texto | Opcional; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí tratamiento» |
| `costo` | REAL → `number` | Numérico decimal | Obligatorio; Mayor o igual a 0; Hasta 2 decimales; Valor inicial `0` | «Ingresá un número válido» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_consultas_mascota_id ON consultas(mascota_id);
CREATE INDEX IF NOT EXISTS idx_consultas_fecha ON consultas(fecha);
```

**Consultas base** (en `src/db/consultas.ts`):

```ts
listar(): Promise<Consulta[]>            // SELECT * FROM consultas ORDER BY id DESC
obtener(id: number): Promise<Consulta | null>   // SELECT * FROM consultas WHERE id = ?
crear(datos: NuevoConsulta): Promise<number>   // INSERT INTO consultas (mascota_id, fecha, motivo, tratamiento, costo) VALUES (?, ?, ?, ?, ?)
actualizar(id: number, datos: NuevoConsulta): Promise<void>   // UPDATE consultas SET mascota_id = ?, fecha = ?, motivo = ?, tratamiento = ?, costo = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM consultas WHERE id = ?
listarPorMascota(mascota_id: number): Promise<Consulta[]>   // WHERE mascota_id = ?
```

## 4. Tipos TypeScript

Copiar a `src/db/tipos.ts`:

```ts
export interface Dueno {
  id: number;
  nombre: string;
  telefono: string | null;
}
export type NuevoDueno = Omit<Dueno, 'id'>;

export interface Mascota {
  id: number;
  dueno_id: number;
  nombre: string;
  especie: string;
  raza: string | null;
  nacimiento: string | null;
}
export type NuevoMascota = Omit<Mascota, 'id'>;

export interface Vacuna {
  id: number;
  mascota_id: number;
  nombre: string;
  fecha: string;
  proxima: string | null;
}
export type NuevoVacuna = Omit<Vacuna, 'id'>;

export interface Consulta {
  id: number;
  mascota_id: number;
  fecha: string;
  motivo: string;
  tratamiento: string | null;
  costo: number;
}
export type NuevoConsulta = Omit<Consulta, 'id'>;

```

## 5. Valores permitidos (enumeraciones)

SQLite no tiene tipo enumerado: se valida en la capa de datos y se muestra con la etiqueta de la tabla.

**`mascotas.especie`**

| Valor guardado | Etiqueta en pantalla |
|---|---|
| `perro` | Perro |
| `gato` | Gato |
| `otro` | Otro |

```ts
export const MASCOTAS_ESPECIE = ['perro', 'gato', 'otro'] as const;
```

## 6. Migraciones

Migración 1 = esquema inicial (ya en `src/db/schema.ts`). Cada cambio posterior es una migración nueva al final de la lista; nunca se edita una ya publicada.

| Versión | Fase | Motivo |
|---|---|---|
| 2 | 2 | Marcar mascotas fallecidas como inactivas sin borrar su historial. |
| 3 | 5 | Plantilla del recordatorio al dueño y datos de la veterinaria para el carnet. |

**Migración 2** (fase 2)

```sql
ALTER TABLE mascotas ADD COLUMN activa INTEGER NOT NULL DEFAULT 1;
```

**Migración 3** (fase 5)

```sql
CREATE TABLE ajustes (clave TEXT PRIMARY KEY, valor TEXT NOT NULL);
```

## 7. Esquema inicial completo

```sql
CREATE TABLE duenos (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, telefono TEXT);
CREATE TABLE mascotas (id INTEGER PRIMARY KEY AUTOINCREMENT, dueno_id INTEGER NOT NULL REFERENCES duenos(id) ON DELETE CASCADE, nombre TEXT NOT NULL, especie TEXT NOT NULL, raza TEXT, nacimiento TEXT);
CREATE TABLE vacunas (id INTEGER PRIMARY KEY AUTOINCREMENT, mascota_id INTEGER NOT NULL REFERENCES mascotas(id) ON DELETE CASCADE, nombre TEXT NOT NULL, fecha TEXT NOT NULL, proxima TEXT);
CREATE TABLE consultas (id INTEGER PRIMARY KEY AUTOINCREMENT, mascota_id INTEGER NOT NULL REFERENCES mascotas(id) ON DELETE CASCADE, fecha TEXT NOT NULL, motivo TEXT NOT NULL, tratamiento TEXT, costo REAL NOT NULL DEFAULT 0);
```

## 8. Reglas de integridad que NO delega a la base

- **RN-01** Una mascota pertenece a un dueño; un dueño puede tener varias mascotas.
- **RN-02** Cada vacuna guarda la fecha de aplicación y, opcionalmente, la fecha de la próxima dosis.
- **RN-03** Una vacuna está «por vencer» a 15 días de la próxima dosis y «vencida» si la fecha ya pasó.
- **RN-04** La edad de la mascota se calcula desde su fecha de nacimiento (años y meses).
- **RN-05** El historial de consultas nunca se borra; se puede anular una consulta con motivo.
- **RN-06** El costo acumulado de una mascota es la suma del costo de sus consultas.

Estas reglas se implementan en `src/lib/` como funciones puras y se prueban de forma automática (ver [PRUEBAS.md](PRUEBAS.md)).
