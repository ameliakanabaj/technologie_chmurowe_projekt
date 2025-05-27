const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;
const { Client } = require('pg');

const db = new Client({
    host: 'db',
    user: 'postgres',
    password: 'postgres',
    database: 'bookstore',
  });
  
async function connectWithRetry() {
    try {
      await db.connect();
      console.log('Połączono z bazą danych PostgreSQL');
    } catch (err) {
      console.error('Baza danych nie jest gotowa');
    }
}
  
setTimeout(connectWithRetry, 7000);
  
app.use(cors());
app.use(express.json());

app.post('/orders', async (req, res) => {
    const { books } = req.body;
  
    const titles = books.map(b => b.title);
    const amount = books.reduce((sum, b) => sum + b.price, 0);
  
    try {
      const fetchResponse = await fetch('http://logic:3002/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });
  
      const result = await fetchResponse.json();
  
      await db.query(
        'INSERT INTO orders (titles, original_amount, final_amount) VALUES ($1, $2, $3)',
        [titles, result.original, result.final]
      );
  
      res.json({
        message: 'Zamówienie zapisane',
        titles,
        original: result.original,
        final: result.final,
      });
    } catch (error) {
      console.error('Błąd przy zamówieniu:', error);
      res.status(500).json({ error: 'Błąd podczas przetwarzania zamówienia' });
    }
});
  
app.get('/orders', async (req, res) => {
    const result = await db.query('SELECT * FROM orders');
    res.json(result.rows);
});
  
app.get('/', (req, res) => {
    res.send('API działa!');
});

app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});
