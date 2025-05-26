import Bookstore from './Bookstore';
import Cart from './Cart';
import OrdersList from './OrdersList';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  
  const handleClickCart = () => {
    navigate('/koszyk');
  }
  
  const handleClickOrders = () => {
    navigate('/zamowienia');
  }

  const handleClickHome = () => {
    navigate('/');
  }
  
  return (

    <div className='app-container'>
      <div className='bookstore-container'>
        <button onClick={handleClickHome} className='home'>strona główna</button>
        <h1>Bookstore</h1>
        <button onClick={handleClickCart} className='cart'>koszyk</button>
        <button onClick={handleClickOrders} className='orders'>zamowienia</button>
      </div> 
      <Routes>
        <Route path="/" element={<Bookstore />} />
        <Route path="/koszyk" element={<Cart />} />
        <Route path="/zamowienia" element={<OrdersList />} />
      </Routes>
    </div>
  );
}

export default App;
