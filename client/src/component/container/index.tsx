import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';

const Container = ({ children }: { children: React.ReactNode }) => {
  const count = useSelector((state: RootState) => state.cart.count);
  return (
    <div className='container'>
      <div className='d-block w-full'>
        <div className='w-full d-flex justify-content-between'>
          <Link to={'/'} className='text-decoration-none text-dark'><h2>E-Commerce Store</h2></Link>
          <div className='d-flex gap-2'>
            <Link to="/order-history" className='mr-2'>Order History</Link>
            <Link to={'/cart'}>
              Cart <span>{count}</span>
            </Link>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Container;
