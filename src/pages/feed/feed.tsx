import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getFeed } from '../../services/feed/slice';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedsData } from '../../services/feed/actions';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getFeed);

  useEffect(() => {
    dispatch(getFeedsData());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeedsData());
      }}
    />
  );
};
