import React from 'react';
import { useQuery } from 'react-query';
import { fetchProducts } from '../../hooks/products';
import ProductList from '../../component/ProductList/list';
import {  Row } from 'react-bootstrap';

interface ProductType {
  [key: string]: any;
}

const Products = () => {
  const { data, isLoading, error }: any = useQuery('products', fetchProducts);
  return (
    <>
      {isLoading && <p>Loading ...</p>}
      {error && <div>{error?.message}</div>}
      <Row>
        {data &&
          data?.map((product: ProductType) => (
            <ProductList product={product} />
          ))}
      </Row>
    </>
  );
};

export default Products;
