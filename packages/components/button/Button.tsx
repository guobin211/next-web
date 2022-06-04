import React, { CSSProperties } from 'react';

export interface ButtonProps {
  key?: string | number;
  className?: string;
  style?: CSSProperties;
}

const Button: React.FC<ButtonProps> = (props) => {
  console.log('Button', props);
  return <div></div>;
};

export default Button;
