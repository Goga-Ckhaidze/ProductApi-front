import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleIconClick = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = '#021526';
    } else {
      document.body.style.backgroundColor = '#fff';
    }
  }, [isDarkMode]);

  return (
    <div className='navbarContainer'>
      <div className='flex'>
        <Link to={"/"} className='link'>
        <h1 className='navbarTitle'>PRODUCT STORE 🛒</h1>
        </Link>
        
        <div>
          <div className='plusIconDiv'>
          <Link to={'/create'} className='link'>
          <h1 className='plusIcon icon'>➕</h1>
      </Link>
          </div>
          <div className='sunIconDiv'>
            <h1 className='sunIcon icon' onClick={handleIconClick}>
              {isDarkMode ? '🌙' : '☀︎'}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;