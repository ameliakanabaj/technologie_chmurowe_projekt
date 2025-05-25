const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API działa!');
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
