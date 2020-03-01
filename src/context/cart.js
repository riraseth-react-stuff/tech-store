import React, { useState, createContext, useEffect } from 'react';
import localCart from '../utils/localCart';
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(localCart);
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState(0);
  // console.log(cart);
  // console.log([...cart]);
  useEffect(() => {
    // local storage

    // cart items
    let newCartItems = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount);
    }, 0);
    setCartItems(newCartItems);

    // cart total
    let newTotal = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount * cartItem.price);
    }, 0);

    newTotal = parseFloat(newTotal).toFixed(2);
    setTotal(newTotal);
  }, [cart]);
  // move item
  const removeItem = id => setCart([...cart].filter(item => item.id !== id));
  // increase amount
  const increaseAmount = id =>
    setCart(
      [...cart].map(item => {
        return item.id === id
          ? { ...item, amount: item.amount + 1 }
          : { ...item };
      })
    );
  // decrease amount
  const decreaseAmount = (id, amount) => {
    if (amount === 1) {
      removeItem(id);
    } else {
      setCart(
        [...cart].map(item => {
          return item.id === id
            ? { ...item, amount: item.amount - 1 }
            : { ...item };
        })
      );
    }
  };
  // add to cart
  const addToCart = product => {
    const {
      id,
      image: { url },
      title,
      price,
      amount
    } = product;
    const item = [...cart].find(item => item.id === id);
    if (item) {
      increaseAmount(id);
      return;
    } else {
      const newItem = { id, image: url, title, price, amount: 1 };
      const newCart = [...cart, newItem];
      setCart(newCart);
    }
  };
  // clear cart
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        cartItems,
        removeItem,
        increaseAmount,
        decreaseAmount,
        addToCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
