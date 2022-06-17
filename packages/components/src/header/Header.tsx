import React  from 'react';
import { HeaderProps } from './Header.props';

export const Header: React.FC<HeaderProps> = (props) => {
  const { className, style, children } = props;
  return (
    <div className={`header ${className}`} style={style}>
     {children}
    </div>
  );
};
