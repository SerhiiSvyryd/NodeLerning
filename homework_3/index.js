const express = require('express');
const app = express();

app.use(express.json());
const PORT = process.env.PORT || 3000;

// Масив з якого можемо додавати або видаляти елементи
let items = [
    { id: 1, name: 'Artur' },
    { id: 2, name: 'Olga' },
    { id: 3, name: 'Jack' },
];

// GET -- Отримати всі елементи
app.get('/items', (req, res) => {
    res.json(items);
});

// GET -- Отримати один елемент за ID
app.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find((item) => item.id === id);
    if (!item) {
        res.status(404).send('Не знайдено');
        return;
    }
    res.json(item);
});

// POST -- Додати елемент в масив
app.post('/items', (req, res) => {
    console.log('Додаємо:', req.body);
    const newItem = req.body;
    if (!newItem || !newItem.id || !newItem.name) {
        res.status(400).send('Невірно вказаний формат name або id');
        return;
    }
    items.push(newItem);
    res.status(201).send('Дані введено коректно');
});

// PUT
app.put('/items/:id', (req, res) => {
    console.log('Запит на зміну:', req.body);
    const id = parseInt(req.params.id);
    const putItem = req.body;

    const foundItem = items.findIndex((item) => item.id === id);
    if (foundItem === -1) {
        res.status(400).send('Не знайдено елемент за id');
        return;
    }
    items[foundItem] = { ...items[foundItem], ...putItem };
    res.json(items[foundItem]);
});

// DELETE -- Видалити елемент
app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const itemIndex = items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
        res.status(404).send('Item not found');
        return;
    }
    items.splice(itemIndex, 1);
    res.json({ message: 'Item deleted' });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
