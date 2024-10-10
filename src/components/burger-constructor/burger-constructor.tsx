import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearOrderModalData,
  getConstructorItems,
  getOrderModalData,
  getOrderRequest,
  setOrderRequest
} from '../../services/burgerConstructor/slice';
import { makeOrder } from '../../services/burgerConstructor/actions';
import { getUser } from '../../services/auth/slice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(getConstructorItems);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);
  const user = useSelector(getUser);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login', {
        state: { from: '/' }
      });
      return;
    }

    dispatch(
      makeOrder(
        Array.from(constructorItems.ingredients, (ing) => ing._id).concat([
          constructorItems.bun._id
        ])
      )
    );
  };

  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
    dispatch(setOrderRequest(false));
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
