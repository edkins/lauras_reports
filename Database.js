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
    /*tx.executeSql(`CREATE TABLE IF NOT EXISTS activereport (
        report_id INTEGER NOT NULL,
        FOREIGN KEY(report_id) REFERENCES reports(id)
      );
    `);*/
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

export function addReport(name, comments) {
  const date = new Date().toISOString();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO reports (name, comments, date) VALUES (?, ?, ?);`,
        [name, comments, date],
        (_, { insertId }) => resolve(insertId),
        (_, error) => reject(error)
      );
    });
  });
}

export function updateReport(id, name, comments) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE reports SET name = ?, comments = ? WHERE id = ?;`,
        [name, comments, id],
        (_, { rowsAffected }) => resolve(id),
        (_, error) => reject(error)
      );
    });
  });
}

export function saveReport(report) {
  if (report.id) {
    return updateReport(report.id, report.name, report.comments);
  } else {
    return addReport(report.name, report.comments);
  }
}

export function deleteReport(id) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM reports WHERE id = ?;`,
        [id],
        (_, { rowsAffected }) => resolve({rowsAffected}),
        (_, error) => reject(error)
      );
    });
  });
}

/*
export function setActiveReport(id) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM activereport;`,
        [],
        (_, { rows }) => {
          if (rows.length > 0) {
            tx.executeSql(
              `UPDATE activereport SET report_id = ?;`,
              [id],
              (_, { rowsAffected }) => resolve({ rowsAffected }),
              (_, error) => reject(error)
            );
          } else {
            tx.executeSql(
              `INSERT INTO activereport (report_id) VALUES (?);`,
              [id],
              (_, { insertId }) => resolve({ id: insertId }),
              (_, error) => reject(error)
            );
          }
        },
        (_, error) => reject(error)
      );
    });
  });
}

export function getActiveReport() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM activereport;`,
        [],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(rows._array[0]);
          } else {
            resolve(null);
          }
        },
        (_, error) => reject(error)
      );
    });
  });
}
*/