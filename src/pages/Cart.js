import React from 'react';
import { CartContext } from '../context/cart';
import { UserContext } from '../context/user';
import { useContext } from 'react';
import EmptyCart from '../components/Cart/EmptyCart';
import CartItem from '../components/Cart/CartItem';
import { Link } from 'react-router-dom';
// import {UserContext} from '../context/user';
export default function Cart() {
  const { cart, total } = useContext(CartContext);
  const { user } = useContext(UserContext);
  if (cart.length === 0) {
    return <EmptyCart></EmptyCart>;
  }
  return (
    <section className="cart-items section">
      <h2>your cart</h2>
      {cart.map(item => {
        return <CartItem key={item.id} {...item}></CartItem>;
      })}
      <h2>total: ${total}</h2>
      {user.token ? (
        <Link to="/checkout" className="btn btn-primary btn-block">
          checkout
        </Link>
      ) : (
        <Link to="/login" className="btn btn-primary btn-block">
          login
        </Link>
      )}
    </section>
  );
}
