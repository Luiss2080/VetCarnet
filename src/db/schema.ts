// Cada elemento es una migración. Para cambiar el esquema, AGREGÁ uno nuevo al final;
// nunca edites uno ya publicado.
export const MIGRACIONES: string[] = [
  `CREATE TABLE duenos (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, telefono TEXT);
CREATE TABLE mascotas (id INTEGER PRIMARY KEY AUTOINCREMENT, dueno_id INTEGER NOT NULL REFERENCES duenos(id) ON DELETE CASCADE, nombre TEXT NOT NULL, especie TEXT NOT NULL, raza TEXT, nacimiento TEXT);
CREATE TABLE vacunas (id INTEGER PRIMARY KEY AUTOINCREMENT, mascota_id INTEGER NOT NULL REFERENCES mascotas(id) ON DELETE CASCADE, nombre TEXT NOT NULL, fecha TEXT NOT NULL, proxima TEXT);
CREATE TABLE consultas (id INTEGER PRIMARY KEY AUTOINCREMENT, mascota_id INTEGER NOT NULL REFERENCES mascotas(id) ON DELETE CASCADE, fecha TEXT NOT NULL, motivo TEXT NOT NULL, tratamiento TEXT, costo REAL NOT NULL DEFAULT 0);`,
];

export const TABLAS = ['duenos', 'mascotas', 'vacunas', 'consultas'] as const;
