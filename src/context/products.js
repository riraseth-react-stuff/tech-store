import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import url from '../utils/URL';
import { featuredProducts, flattenProducts, paginate } from '../utils/helpers';
export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [sorted, setSorted] = useState([]);
  //paginated page
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    shipping: false,
    price: 'all'
  });

  const changePage = index => {
    setPage(index);
  };

  const updateFilters = e => {
    const type = e.target.type;
    const value = e.target.value;
    const name = e.target.name;
    let filterValue;
    if (type === 'checkbox') {
      filterValue = e.target.checked;
    } else if (type === 'radio') {
      value === 'all' ? (filterValue = value) : (filterValue = parseInt(value));
    } else {
      filterValue = value;
    }

    setFilters({ ...filters, [name]: filterValue });
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`${url}/products`).then(response => {
      // const featProds = featuredProducts(response.data);
      const featProds = featuredProducts(flattenProducts(response.data));
      const products = flattenProducts(response.data);
      // setSorted(paginate(products));
      setProducts(products);
      setFeatured(featProds);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    let newProducts = [...products].sort((a, b) => a.price - b.price);
    const { search, category, shipping, price } = filters;
    //logic
    if (category !== 'all') {
      newProducts = newProducts.filter(item => item.category === category);
    }
    if (shipping !== false) {
      newProducts = newProducts.filter(item => item.free_shipping === shipping);
    }
    if (search !== '') {
      newProducts = newProducts.filter(item => {
        let title = item.title.toLowerCase().trim();
        return title.includes(search) ? item : null;
      });
    }
    if (price !== 'all') {
      newProducts = newProducts.filter(item => {
        switch (price) {
          case 0:
            return item.price < 300;
            break;
          case 300:
            return item.price >= 300 && item.price <= 650;
            break;
          case 650:
            return item.price > 650;
            break;
          default:
            break;
        }
      });
    }
    setPage(0);
    setSorted(paginate(newProducts));
  }, [filters, products]);
  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        featured,
        sorted,
        page,
        filters,
        changePage,
        updateFilters
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
