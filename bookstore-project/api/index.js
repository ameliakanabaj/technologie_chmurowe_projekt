const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

app.post('/orders', async (req, res) => {
  const { amount } = req.body;

  try {
    const fetchResponse = await fetch('http://logic:3002/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });

    const result = await fetchResponse.json();

    res.json({
      message: 'Zamówienie przetworzone',
      original: result.original,
      final: result.final,
    });
  } catch (error) {
    console.error('Błąd przy komunikacji z logic:', error.message);
    res.status(500).json({ error: 'Coś poszło nie tak przy obliczeniach.' });
  }
});

app.get('/', (req, res) => {
  res.send('API działa!');
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
