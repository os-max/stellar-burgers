import { ReactNode } from 'react';

type TLayoutType = 'order' | 'ingredient';

export type TLayoutProps = {
  type: TLayoutType;
  children?: ReactNode;
};
