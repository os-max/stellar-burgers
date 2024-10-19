import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getIsAuthChecked, getUser } from '../../services/user/slice';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

interface IProtectedRoute {
  children: ReactElement;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute = ({ children, onlyUnAuth }: IProtectedRoute) => {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};
