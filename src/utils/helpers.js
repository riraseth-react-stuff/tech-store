// import url from './URL';
// flatten function
export const flattenProducts = data => {
  return data.map(item => {
    //claudinary
    let image = (item.image && item.image.url) || null;

    //local setup no deployment
    // let image = `${url}${item.image.url}`;
    return { ...item, image };
  });
};

// helper functions
export const featuredProducts = data =>
  data.filter(item => item.featured === true);

// pagination

export const paginate = products => {
  const itemsPerPage = 4;
  const numberOfPages = Math.ceil(products.length / itemsPerPage);

  // const newProducts = Array.from({ length: numberOfPages }, () =>
  //   products.splice(0, itemsPerPage)
  // );

  const newProducts = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  });

  return newProducts;
};
