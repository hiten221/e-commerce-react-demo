import React, { useLayoutEffect } from 'react';
import './App.css';
import { useRoutes } from 'react-router';
import { Router } from './routes';
import Container from './component/container';
import { useQuery } from 'react-query';
import { fetchItemsFromCart } from './hooks/cart';
import { useDispatch } from 'react-redux';
import { setProductsInCart } from './redux/reducers/cart/cartSlice';

function App() {
  const content = useRoutes(Router);
  const dispatch = useDispatch();
  const { isLoading, data, isFetched } = useQuery('cartData', fetchItemsFromCart);
  useLayoutEffect(() => {
      if (!isLoading && isFetched) {
        dispatch(setProductsInCart(data));
      }
  }, [isLoading, data, isFetched, dispatch]);
  return <Container>{content}</Container>;
}

export default App;
