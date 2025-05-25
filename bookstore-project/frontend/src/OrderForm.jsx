import { useState } from 'react';
import './OrderForm.css';

function OrderForm() {
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3001/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: parseFloat(amount) }),
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div>
      <h2>Zamów książkę</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Kwota"
        />
        <button type="submit">Zamów</button>
      </form>

      {result && (
        <div className='final-price'>
            <p>Kwota oryginalna: {Number(result.original).toFixed(2)} zł</p>
            <p>Kwota po rabacie: {Number(result.final).toFixed(2)} zł</p>
        </div>
      )}
    </div>
  );
}

export default OrderForm;
