const express = require('express');
const databaseService = require('./services/databaseService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// POST -- Додати елемент в масив
app.post('/items', (req, res) => {
    // console.log('Додаємо:', req.body);
    const { name } = req.body;
    databaseService.createItem(name, (err, result) => {
        if (err) {
            res.status(500).send('Невірно вказаний формат name або id'); // тут залишив
            return;
        }
        res.json(result);
    });
});

// GET -- Отримати всі елементи
app.get('/items', (req, res) => {
    // const { name } = req.body;
    databaseService.getItems((err, result) => {
        if (err) {
            res.status(404).send('Не знайдено'); // тут залишив
            return;
        }
        res.json(result);
    });
});

// GET -- Отримати один елемент за ID
app.get('/items/:id', (req, res) => {
    const { id } = req.params;
    databaseService.getItems(id, (err, result) => {
        if (err) {
            res.status(404).send('Не знайдено'); // тут залишив
            return;
        }
        res.json(result);
    });
});

// PUT
app.put('/items/:id', (req, res) => {
    console.log('Запит на зміну:', req.body);
    const { id } = req.params;
    const { name } = req.body;
    databaseService.updateItem(id, name, (err, result) => {
        if (err) {
            res.status(400).send('Не знайдено елемент за id');
            return;
        }
        res.json(result);
    });
});

// DELETE -- Видалити елемент
app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    databaseService.deleteItem(id, (err, result) => {
        if (err) {
            res.status(404).send('Item not found');
            return;
        }
        res.json(result);
    });
});

app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

module.exports = app;
