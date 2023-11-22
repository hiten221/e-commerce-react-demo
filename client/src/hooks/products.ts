import axios from 'axios';
import { BASE_URL } from '../utils/constant';

export const fetchProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`)
  return response?.data;
}