import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import url from '../utils/URL';
export const ProductContext = createContext();

//provider

const ProductProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);
  useEffect(() => {
    axios.get(`${url}/products`).then(response => {
      setProducts(response.data);
    });
  }, []);
  return (
    <ProductContext.Provider value={{ products, loading, featured }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
