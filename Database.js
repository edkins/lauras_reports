import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

export function ensureExists() {
  console.log('Ensuring database exists...');
  db.transaction(tx => {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS reports (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT,
          date TEXT NOT NULL,
          comments TEXT
      );`
    );
    tx.executeSql(`CREATE TABLE IF NOT EXISTS pictures (
          id INTEGER PRIMARY KEY NOT NULL,
          report_id INTEGER NOT NULL,
          date TEXT NOT NULL,
          uri TEXT UNIQUE NOT NULL,
          comments TEXT,
          FOREIGN KEY(report_id) REFERENCES reports(id)
      );`
    );
  });
}

export function getReports() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM reports ORDER BY date DESC;`,
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
}

export function addReport(name) {
  const date = new Date().toISOString();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO reports (name, date) VALUES (?, ?);`,
        [name, date],
        (_, { insertId }) => resolve({id: insertId, name, date}),
        (_, error) => reject(error)
      );
    });
  });
}
