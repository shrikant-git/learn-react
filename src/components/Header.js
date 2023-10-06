import { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { LOGO_URL } from '../utils/constants';
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContext from '../utils/userContext';

const Header = () => {
  // const btnName = 'Login';
  const [btnName, setBtnName] = useState('Login');

  const onlineStatus = useOnlineStatus();

  const { loggedInUser } = useContext(UserContext);

  //Subscribing to the store using selector
  const cartItems = useSelector((store) => store.cart.items);

  // If no dependency array, useEffect is called on every render
  useEffect(() => {
    console.log('this is called everytime header component is rendered');
  });

  // If dependency array is present and empty = [], useEffect is called only on initial render and just once when component is called for the first time
  useEffect(() => {
    console.log('this is called only on initial render');
  }, []);

  return (
    <div className="flex justify-between bg-pink-100 shadow-lg">
      <div className="logo-container ">
        <img className="w-17 h-24" src={LOGO_URL} />
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4">Online Status: {onlineStatus ? '✅' : '🔴'}</li>
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-4">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-4">
            <Link to="/cart">Cart ({cartItems.length} items)</Link>
          </li>
          <button
            className="login"
            onClick={() => (btnName === 'Login' ? setBtnName('Logout') : setBtnName('Login'))}
          >
            {btnName}
          </button>
          <li className="font-bold px-4">{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
