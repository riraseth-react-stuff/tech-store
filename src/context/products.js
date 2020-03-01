import React, { createContext } from 'react';

export const ProductContext = createContext();

//provider

const ProductProvider = ({ children }) => {
  const greeting = 'hello';
  const product = {
    id: 1,
    title: 'samsung'
  };
  return (
    <ProductContext.Provider value={{ greeting, ...product }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
