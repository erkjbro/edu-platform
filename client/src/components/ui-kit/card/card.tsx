import clsx from 'clsx';

import './card.scss';

export const Card = (props: any) => {
  const { className, styles, children, ...rest } = props;

  const classes = clsx(
    {
      uikit__card: true,
    },
    className
  );

  return (
    <div className={classes} styles={styles} {...rest}>
      {children}
    </div>
  );
};
