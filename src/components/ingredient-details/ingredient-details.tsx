import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIngredientList } from '../../services/ingredients/slice';

export const IngredientDetails: FC = () => {
  const params = useParams();
  const ingredientList = useSelector(getIngredientList);
  const ingredientData = ingredientList?.find(
    (ingredient) => ingredient._id === params.id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
