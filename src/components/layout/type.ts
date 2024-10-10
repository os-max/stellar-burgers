import { ReactNode } from 'react';

type TLayoutType = 'order' | 'ingredient';
export type THeaderType = 'text_type_main-large' | 'text_type_digits-default'

export type TLayoutProps = {
  type: TLayoutType;
  children?: ReactNode;
};
