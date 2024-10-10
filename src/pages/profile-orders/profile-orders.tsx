import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getUserOrders } from '../../services/feed/slice';
import { useDispatch, useSelector } from '../../services/store';
import { getUserOrdersData } from '../../services/feed/actions';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrdersData());
  }, []);

  const orders: TOrder[] = useSelector(getUserOrders);

  return <ProfileOrdersUI orders={orders} />;
};
