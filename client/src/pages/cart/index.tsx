import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Button, Table } from 'react-bootstrap';
import ProductImage from '../../assets/img/product.webp';
import { updateProductQuantity } from '../../redux/reducers/cart/cartSlice';
import { useMutation } from 'react-query';
import { updateQuantityInCart } from '../../hooks/cart';
import { Link } from 'react-router-dom';
const Cart = () => {
  const products = useSelector((state: RootState) => state.cart.products);
  const dispatch = useDispatch();
  const mutation = useMutation(updateQuantityInCart);

  const totalPrice = useMemo(() => {
    let tPrice = 0;
    for (const product of products) {
      tPrice += product?.price * (product?.quantity ?? 1);
    }

    return tPrice;
  }, [products]);

  const increaseQuantity = (id: string, quantity: number) => {
    quantity = quantity + 1;
    mutation.mutate({ id, quantity });
    dispatch(updateProductQuantity({ productId: id, quantity }));
  };

  const decreaseQuantity = (id: string, quantity: number) => {
    quantity = quantity - 1;
    mutation.mutate({ id, quantity });
    dispatch(updateProductQuantity({ productId: id, quantity }));
  };
  return (
    <Table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        {products &&
          products?.map((product) => (
            <tr key={product?._id}>
              <td>
                <img src={ProductImage} width={80} alt='product' />
              </td>
              <td>{product.name}</td>
              <td>Rs. {product.price}</td>
              <td>
                <Button
                  onClick={() =>
                    decreaseQuantity(product._id, product?.quantity ?? 1)
                  }
                >
                  -
                </Button>
                <span style={{ padding: '5px' }}>{product.quantity}</span>
                <Button
                  onClick={() =>
                    increaseQuantity(product._id, product?.quantity ?? 1)
                  }
                >
                  +
                </Button>
              </td>
              <td>Rs. {product.price * (product?.quantity ?? 1)}</td>
            </tr>
          ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3}></td>
          <td>Total Price</td>
          <td>Rs.{totalPrice}</td>
        </tr>
        <tr>
          <td colSpan={5} align='right'>
            {products?.length > 0 && <Link to='/checkout'><Button>Checkout</Button></Link>}
          </td>
        </tr>
      </tfoot>
    </Table>
  );
};

export default Cart;
