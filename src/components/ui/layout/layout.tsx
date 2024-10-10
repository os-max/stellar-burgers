import { FC, memo } from 'react';

import styles from './layout.module.css';

import { TLayoutUIProps } from './type';

export const LayoutUI: FC<TLayoutUIProps> = memo(
  ({ title, headerType, children }) => (
    <div className={styles.layout}>
      <div className={styles.header}>
        <h3 className={`${styles.title} text ${headerType}`}>{title}</h3>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  )
);
