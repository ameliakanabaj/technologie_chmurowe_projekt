import Bookstore from './Bookstore';
import Cart from './Cart';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/koszyk');
  }
  return (

    <div className='app-container'>
      <div className='bookstore-container'>
        <h1>Bookstore</h1>
        <button onClick={handleClick} className='cart'>koszyk</button>
      </div> 
      <Routes>
        <Route path="/" element={<Bookstore />} />
        <Route path="/koszyk" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
