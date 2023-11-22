import React, { useCallback } from 'react';
import ProductImage from '../../assets/img/product.webp';
import { Button, Col } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { addProductInCartMutate } from '../../hooks/cart';
import { useDispatch } from 'react-redux';
import { addProductInCart } from '../../redux/reducers/cart/cartSlice';
interface ProductType {
  product: {
    [key: string]: any;
  };
}
const ProductList = ({ product }: ProductType) => {
  const mutate = useMutation(addProductInCartMutate);
  const dispatch = useDispatch();
  
  const addToCart = useCallback((product: any) => {
    mutate.mutate(product?._id);
    dispatch(addProductInCart(product));
  }, [dispatch, mutate]);
  return (
    <Col>
      <div className=''>
        <img src={ProductImage} alt='Product' width={150} />
      </div>
      <div className=''>
        <div>
          <h3>{product?.name}</h3>
          <label className=''>Category: {product?.category?.name}</label>
        </div>
        <span>Rs. {product?.price}</span>
      </div>
      <div className=''>
        <Button onClick={() => addToCart(product)}>Add To Cart</Button>
      </div>
    </Col>
  );
};

export default ProductList;
