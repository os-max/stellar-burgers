import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredientList } from '../../services/ingredients/slice';
import { getFeed, getUserOrders } from '../../services/feed/slice';
import { useParams } from 'react-router-dom';
import { getOrderByNumber } from '../../services/feed/actions';

export const OrderInfo: FC = () => {
  const params = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByNumber(Number(params.number)));
  }, []);

  /* API feed может не получить старые заказы пользователя */
  const feedAndUserOrders = Array.from(
    new Set(useSelector(getFeed).concat(useSelector(getUserOrders)))
  );

  const orderData = feedAndUserOrders.find(
    (order) => String(order.number) === params.number
  );

  const ingredients = useSelector(getIngredientList);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient?.type === 'bun') {
          acc[item] = {
            ...ingredient,
            count: 2
          };

          return acc;
        }
        if (!acc[item]) {
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
