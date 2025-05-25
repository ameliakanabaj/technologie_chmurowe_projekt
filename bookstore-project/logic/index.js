const express = require('express');
const app = express();
const PORT = 3002;

app.use(express.json());

app.post('/calculate', (req, res) => {
    const { amount } = req.body;
    let final = amount;

    if (amount > 100) {
        final = amount * 0.9; 
    }

    res.json({ original: amount, final });
});

app.listen(PORT, () => {
    console.log(`Logic service listening on port ${PORT}`);
});
