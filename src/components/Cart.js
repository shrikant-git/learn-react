import { useDispatch, useSelector } from 'react-redux';

import { clearCart } from '../utils/cartSlice';
import ItemList from './ItemList';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  const handleClearCart = (item) => {
    // Dispatch an action
    dispatch(clearCart());
  };

  return (
    <div className="text-center m-4 p-4 ">
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="w-6/12 m-auto">
        <button className="m-2 p-2 bg-black text-white rounded-lg" onClick={handleClearCart}>
          Clear Cart
        </button>
        {cartItems.length === 0 && <h1>Add items to your cart</h1>}
        <ItemList items={cartItems} />
      </div>
    </div>
  );
};

export default Cart;
