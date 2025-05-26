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
    localStorage.setItem('cart', JSON.stringify([...cart, book]));
  };

//   const getTotal = () => {
//     return cart.reduce((sum, b) => sum + b.price, 0);
//   };

//   const handleOrder = async () => {
//     const amount = getTotal();
//     const res = await fetch('http://localhost:3001/orders', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ amount }),
//     });
//     const data = await res.json();
//     setResponse(data);
//     setCart([]); 
//   };

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
    </div>
  );
}

export default Bookstore;
