import axios from 'axios';
import { BASE_URL } from '../utils/constant';

export const addProductInCartMutate = async (productId: string) => {
  const response = await axios.post(`${BASE_URL}/cart/add/${productId}`);
  return response?.data;
};

export const fetchItemsFromCart = async () => {
  const response = await axios.get(`${BASE_URL}/cart`);
  return response.data;
};

export const updateQuantityInCart = async (data: {
  id: string;
  quantity: number;
}) => {
  const response = await axios.put(
    `${BASE_URL}/cart/update/${data?.id}/${data?.quantity}`
  );
  return response.data;
};

export const submitForm = async (data: any) => {
  const response = await axios.post(`${BASE_URL}/cart/mock-payment`, data);
  return response.data;
}
