import { useState } from 'react';
import './Bookstore.css';

const books = [
  { id: 1, title: 'Wiedźmin: Ostatnie życzenie', price: 49.99 },
  { id: 2, title: 'Lalka', price: 39.5 },
  { id: 3, title: 'Harry Potter', price: 59.9 },
  { id: 4, title: 'Zbrodnia i kara', price: 44.4 },
  { id: 5, title: '1984', price: 33.33 },
];

function Bookstore() {
  const [cart, setCart] = useState([]);
  const [response, setResponse] = useState(null);

  const addToCart = (book) => {
    setCart([...cart, book]);
    setResponse(null);
  };

  const getTotal = () => {
    return cart.reduce((sum, b) => sum + b.price, 0);
  };

  const handleOrder = async () => {
    const amount = getTotal();
    const res = await fetch('http://localhost:3001/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });
    const data = await res.json();
    setResponse(data);
    setCart([]); 
  };

  return (
    <div className='bookstore'>
      <h2>Książki:</h2>
      <ul>
        {books.map(book => (
          <li key={book.id} >
            <b>{book.title} — {book.price.toFixed(2)} zł</b>
            <button
              onClick={() => addToCart(book)}
            >
              Dodaj do koszyka
            </button>
          </li>
        ))}
      </ul>

      <h2>Koszyk:</h2>
      {cart.length === 0 ? (
        <p>Twój koszyk jest pusty</p>
      ) : (
        <>
          <ul>
            {cart.map((book, index) => (
              <li key={index}>
                {book.title} — {book.price.toFixed(2)} zł
              </li>
            ))}
          </ul>
          <p>Suma: {getTotal().toFixed(2)} zł</p>
          <button onClick={handleOrder} className="button-modern">
            Zamów
          </button>
        </>
      )}

      {response && (
        <div className="final-price">
          <p>Kwota oryginalna: {Number(response.original).toFixed(2)} zł</p>
          <p>Kwota po rabacie: {Number(response.final).toFixed(2)} zł</p>
        </div>
      )}
    </div>
  );
}

export default Bookstore;
