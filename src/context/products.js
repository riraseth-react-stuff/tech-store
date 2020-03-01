import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import url from '../utils/URL';
import { featuredProducts } from '../utils/helpers';
export const ProductContext = createContext();

//provider

const ProductProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios.get(`${url}/products`).then(response => {
      const featProds = featuredProducts(response.data);
      setProducts(response.data);
      setFeatured(featProds);
      setLoading(false);
    });
  }, []);
  return (
    <ProductContext.Provider value={{ products, loading, featured }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
