import { ReactNode } from 'react';
import { THeaderType } from 'src/components/layout/type';

export type TLayoutUIProps = {
  title: string;
  headerType: THeaderType;
  children?: ReactNode;
};
