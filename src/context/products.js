import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import url from '../utils/URL';
import { featuredProducts, flattenProducts } from '../utils/helpers';
export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState({
    search: '',
    category: 'all',
    shipping: false,
    price: 'all'
  });

  const changePage = index => {
    console.log(index);
  };

  const updateFilters = e => {
    console.log(e);
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`${url}/products`).then(response => {
      // const featProds = featuredProducts(response.data);
      const featProds = featuredProducts(flattenProducts(response.data));
      const products = flattenProducts(response.data);
      setSorted(products);
      setProducts(products);
      setFeatured(featProds);
      setLoading(false);
    });
  }, []);
  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        featured,
        sorted,
        page,
        filter,
        changePage,
        updateFilters
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
