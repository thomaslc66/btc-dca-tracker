import { type SQLiteDatabase } from 'expo-sqlite';

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 2;
  const result = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const currentVersion = result?.user_version ?? 0;

  console.log('[DB] current user_version =', currentVersion);

  if (currentVersion >= DATABASE_VERSION) return;

  if (currentVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS purchases (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            boughtAt TEXT NOT NULL,
            amountChf REAL NOT NULL,
            buyPriceChf REAL NOT NULL,
            btcAmount REAL NOT NULL,
            feeChf REAL NOT NULL DEFAULT 0,
            note TEXT
          );
    `);

    await db.runAsync(
      'INSERT INTO purchases (boughtAt, amountChf, buyPriceChf, btcAmount, feeChf, note) VALUES (?, ?, ?, ?, ?, ?)',
      '2025-01-20T12:00:00.000Z',
      4000,
      99692.32,
      0.04012345,
      5,
      'Achat exemple'
    );
  }

  if (currentVersion < 2) {
    await db.execAsync(`
      ALTER TABLE purchases RENAME COLUMN amountChf TO amount;
      ALTER TABLE purchases RENAME COLUMN buyPriceChf TO buyPrice;
      ALTER TABLE purchases RENAME COLUMN feeChf TO fee;
    `);
    await db.execAsync(
      `ALTER TABLE purchases ADD COLUMN currency TEXT NOT NULL DEFAULT 'CHF';`
    );
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
    `);
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
