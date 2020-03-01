import React, { useContext } from 'react';
import { ProductContext } from '../context/products';

export default function Products() {
  const { greeting, id, title } = useContext(ProductContext);
  console.log(greeting, id, title);
  return <h1>hello from products page</h1>;
}
