import React, { useContext } from 'react';
import ProductList from './ProductList';
import { ProductContext } from '../../context/products';
const PageProducts = () => {
  const { sorted, page, changePage } = useContext(ProductContext);
  if (sorted[page]) {
    return <ProductList products={sorted[page]}></ProductList>;
  } else {
    return (
      <h3 className="search-errors">
        unfortunately your search query did not return any products
      </h3>
    );
  }
};

export default PageProducts;
