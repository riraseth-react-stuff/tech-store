import React, { useContext } from 'react';
import ProductList from './ProductList';
import { ProductContext } from '../../context/products';
const PageProducts = () => {
  const { sorted, page, changePage } = useContext(ProductContext);
  if (sorted[page]) {
    return (
      <React.Fragment>
        <ProductList products={sorted[page]}></ProductList>;
        {sorted.length > 1 && (
          <article className="pagination-buttons">
            {/* prev */}
            {sorted.map((_, index) => {
              return (
                <button
                  onClick={() => changePage(index)}
                  key={index}
                  className={`page-btn ${page === index && `page-btn-current`}`}
                >
                  {index + 1}
                </button>
              );
            })}
            {/* next */}
          </article>
        )}
      </React.Fragment>
    );
  } else {
    return (
      <h3 className="search-errors">
        unfortunately your search query did not return any products
      </h3>
    );
  }
};

export default PageProducts;
