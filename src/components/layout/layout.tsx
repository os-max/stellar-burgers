import { FC, memo } from 'react';

import { THeaderType, TLayoutProps } from './type';
import { LayoutUI } from '@ui';
import { useParams } from 'react-router-dom';

export const Layout: FC<TLayoutProps> = memo(({ type, children }) => {
  let title;
  let headerType: THeaderType = 'text_type_main-large';

  switch (type) {
    case 'order': {
      title = `#${useParams().number?.padStart(6, '0')}`;
      headerType = 'text_type_digits-default';
      break;
    }
    case 'ingredient': {
      title = 'Детали ингредиента';
    }
  }

  return (
    <LayoutUI title={title} headerType={headerType}>
      {children}
    </LayoutUI>
  );
});
