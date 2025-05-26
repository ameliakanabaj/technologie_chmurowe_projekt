import { useEffect, useState } from 'react';
import './OrdersList.css';

function OrdersList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error('Błąd podczas pobierania zamówień:', err));
  }, []);

  return (
    <div className="orders-list">
      <h2>Historia zamówień</h2>
      {orders.length === 0 ? (
        <p>Brak zamówień do wyświetlenia.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <strong>#{order.id}</strong> — 
              oryginalnie: {Number(order.original_amount).toFixed(2)} zł, 
              po rabacie: {Number(order.final_amount).toFixed(2)} zł
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrdersList;
