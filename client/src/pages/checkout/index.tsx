import React, { useMemo } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useMutation } from 'react-query';
import { resetState } from '../../redux/reducers/cart/cartSlice';
import { submitForm } from '../../hooks/cart';
import { useNavigate } from 'react-router-dom';
const Checkout = () => {
  const products = useSelector((state: RootState) => state.cart.products);
  const mutation = useMutation(submitForm);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = useMemo(() => {
    let tPrice = 0;
    for (const product of products) {
      tPrice += product?.price * (product?.quantity ?? 1);
    }

    return tPrice;
  }, [products]);

  const submitHandler = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const customerDetail = Object.fromEntries(data.entries())
    mutation.mutate({ customerDetail, totalPrice });
    dispatch(resetState());
    navigate('/');
  }
  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>Checkout Form</h3>
      <form method='POST' onSubmit={submitHandler}>
        <div className='form-group'>
          <label>Name</label>
          <input type='text' name='name' className='form-control' aria-required required/>
        </div>
        <div className='form-group'>
          <label>Email</label>
          <input type='email' name='email' className='form-control' required/>
        </div>
        <div className='form-group'>
          <label>Phone number</label>
          <input type='phone' name='phone' className='form-control' required/>
        </div>
        <div className='mt-2'>
          <Button type='submit'>Place order</Button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
