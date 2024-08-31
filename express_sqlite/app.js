/**
 * основной файл серверной части приложения
 *
 * с пометкой DEV - необязательные функции для отладки
 * отлаживать лучше в POSTMAN
 *
 */


import express from 'express'
import bodyParser from 'body-parser'

import { createTable, getAllItems, addItem, deleteItem, updateItem, getItem, deleteTable } from './model.js'
import { hostSchema, hostNicsSchema } from './db_schema.js'

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

/** DEV - удалить созданную таблицу */
// deleteTable('host2')


/** Таблицы бд **/
const tableList = [{
    name: 'host',
    schema: hostSchema
}, {
    name: 'host_nics',
    schema: hostNicsSchema
}];

/** Запуск сервера **/
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);

    // инициируем таблицы
    tableList.forEach(table => {
        // DEV для первого запуска - если таблицы нет, создаем пустую
        createTable(table.name, table.schema);

        /** Добавляем для таблицы GET метод **/
        app.get(`/${table.name}`, (req, res) => {
            getAllItems(table.name, (err, rows) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json(rows);
            });
        });

        /** GET конкретной записи */
        app.get(`/${table.name}/:id`, (req, res) => {
            getItem(table.name, req.params.id, (err, rows) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json(rows);
            });
        });

        /** Добавляем для таблицы POST метод **/
        app.post(`/${table.name}`, (req, res) => {
            const payload = Object.assign(table.schema);
            for (let key in payload) {
                payload[key] = req.body[key]
            }

            addItem(table.name, payload, function(err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ id: this.lastID });
            });
        });

        /** Добавляем для таблицы PUT метод **/
        app.put(`/${table.name}/:id`, (req, res) => {
            const payload = Object.assign(table.schema);
            for (let key in payload) {
                payload[key] = req.body[key]
            }
            updateItem(table.name, req.params.id, Object.fromEntries(Object.entries(payload).filter(([_, v]) => v != null)), (err, rows) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json(rows);
            });
        });

        /** Добавляем для таблицы DELETE метод **/
        app.delete(`/${table.name}/:id`, (req, res) => {
            deleteItem(table.name, req.params.id, (err, rows) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json(rows);
            });
        });
    })
});
