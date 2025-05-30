import { useEffect, useState } from 'react';
import './OrdersList.css';

function OrdersList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/orders')
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
                <strong>#{order.id}</strong><br />
                {order.titles.join(', ')}<br />
                {Number(order.original_amount).toFixed(2)} zł → {Number(order.final_amount).toFixed(2)} zł<br />
                {new Date(order.created_at).toLocaleString('pl-PL')}
                </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default OrdersList;
