const express = require('express');
const app = express();

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
        res.status(404).send('Item not found');
        return;
    }
    res.json(item);
});

// POST
app.post('/items', (req, res) => {
    res.json('Server post');
});

// PUT
app.put('/items/:id', (req, res) => {
    res.json('Server put');
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
