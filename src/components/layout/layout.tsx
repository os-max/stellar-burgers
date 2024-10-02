import { FC, memo } from 'react';

import { TLayoutProps } from './type';
import { LayoutUI } from '@ui';
import { useParams } from 'react-router-dom';

export const Layout: FC<TLayoutProps> = memo(({ type, children }) => {
  let title;

  switch (type) {
    case 'order': {
      title = `#${useParams().number}` || '';
      break;
    }
    case 'ingredient': {
      title = 'Детали ингредиента';
    }
  }

  return <LayoutUI title={title}>{children}</LayoutUI>;
});
