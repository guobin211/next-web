import React from 'react';
import { ButtonProps } from './Button.props';

const Button: React.FC<ButtonProps> = props => {
  const { className, style, ...rest } = props;
  return (
    <button {...rest} className={className} style={style}>
      {props.children}
    </button>
  );
};

export default Button;
