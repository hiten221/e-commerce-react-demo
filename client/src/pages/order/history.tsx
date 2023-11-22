import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { fetchOrderHistoy } from '../../hooks/order';
const OrderHistory = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [data, setData] = useState([]);
  const mutation = useMutation(fetchOrderHistoy);

  const serchRecords = async() => {
    const records = await mutation.mutateAsync({ startDate, endDate });
    setData(records);
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Order history</h2>
      <div>
        <input type='date' onChange={(e) => setStartDate(e.target.value as any)} />
        <input type='date' onChange={(e) => setEndDate(e.target.value as any)} />

        <Button onClick={serchRecords}>Search</Button>
      </div>

      <div>
        <Table>
          <tbody>
            {data && data?.map((d: any) => (
              <tr>
                <td>Order Id: {d?._id} </td>
                <td>Total Price: Rs. {d?.totalAmount} </td>
                <td>Customer Detail: {JSON.stringify(d?.customerDetail)} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};


export default OrderHistory;