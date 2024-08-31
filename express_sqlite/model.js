/**
 * описание взаимодействия с бд
 *
 */

import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err.message);
    } else {
        console.log('Подключение к базе данных успешно!');
    }
});

/** Создать таблицу */
const createTable = (tableName, payload) => {
    const tableParams = Object.entries(payload).map(([key, value]) => `${key} ${value.toUpperCase()}`).join(', ');
    db.run(`CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ${tableParams}
    )`);
};

/** Получить все записи таблицы */
const getAllItems = (tableName, callback) => {
    db.all(`SELECT * FROM ${tableName}`, [], callback);
};

/** Получить определенную запись таблицы */
const getItem = (tableName, id, callback) => {
    db.all(`SELECT * FROM ${tableName} WHERE id = ?`, [id], callback);
};

/** Добавить запись в таблицу */
const addItem = (tableName, params, callback) => {
    const keys = Object.keys(params);
    const values = Object.values(params);
    const placeholders = keys.map(() => '?').join(', ');
    const sql = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders})`;
    db.run(sql, values, callback);
};

/** Обновить запись из таблицы по id */
const updateItem = (tableName, id, updates, callback) => {
    const columns = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    values.push(id);
    const sql = `UPDATE ${tableName} SET ${columns} WHERE id = ?`;
    db.run(sql, values, callback);
};

/** Удалить запись из таблицы по id */
const deleteItem = (tableName, id, callback) => {
    const sql = `DELETE FROM ${tableName} WHERE id = ?`;
    db.run(sql, [id], callback);
};

/** Удалить таблицу */
const deleteTable = (tableName) => {
    db.run(`DROP TABLE ${tableName}`);
};

export { createTable, getAllItems, addItem, deleteItem, updateItem, getItem, deleteTable };

