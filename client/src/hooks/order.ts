import axios from 'axios'
import { BASE_URL } from '../utils/constant'

export const fetchOrderHistoy = async ({ startDate, endDate }: any) => {
  const response = await axios.get(`${BASE_URL}/purchase-history?startDate=${startDate}&endDate=${endDate}`)
  return response.data
}