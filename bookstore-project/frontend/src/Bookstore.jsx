import { useState, useEffect } from 'react';
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
  const [added, setAdded] = useState(null);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (book) => {
    setCart([...cart, book]);
    localStorage.setItem('cart', JSON.stringify([...cart, book]));
    setAdded(book.id);
    setTimeout(() => {
        setAdded(null);
    }, 5000);
  };

  return (
    <div className='bookstore'>
        <div>RABAT 10%: Powyżej zamówienia o wartości 100zł</div>
        <h2>Książki:</h2>
        <ul>
            {books.map(book => (
            <li key={book.id} >
                <b>{book.title} — {book.price.toFixed(2)} zł</b>
                <div className='add'>
                    <button onClick={() => addToCart(book)}>
                    Dodaj do koszyka
                    </button>
                    {added === book.id && (
                        <div>dodano</div>
                    )}
                </div>
            </li>
            ))}
        </ul>
    </div>
  );
}

export default Bookstore;
