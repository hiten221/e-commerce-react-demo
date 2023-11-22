import React from 'react';
import Products from './pages/products';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import OrderHistory from './pages/order/history';

export const Router: {
  path: string,
  element: React.ReactNode
}[] = [
  {
    path: '/',
    element: <Products />
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/checkout',
    element: <Checkout />
  },
  {
    path: '/order-history',
    element: <OrderHistory />
  }
];