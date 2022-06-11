import React from 'react';
import { pf } from '../__core__';
import { ButtonProps } from './Button.props';

const Button: React.FC<ButtonProps> = (props) => {
  const { className, style, ...rest } = props;
  return (
    <button {...rest} className={pf('btn', className)} style={style}>
      {props.children}
    </button>
  );
};

export default Button;
