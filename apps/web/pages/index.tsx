import React, { useCallback, useState } from 'react';
import { Button } from '@tencent/next-ui/src';
import { ButtonProps } from '@tencent/next-ui/src/button/Button.props';
// import { LogProps, withLogProps } from '@tencent/next-components/__HOC__';

// @LogProps
export class SubmitButton extends React.Component<ButtonProps> {
  render() {
    return (
      <button type={this.props.type} onClick={ev => this.props.onClick?.(ev)}>
        {this.props.children}
      </button>
    );
  }
}

// const LogButton = withLogProps(Button);

const Web: React.FC = () => {
  const [type, setType] = useState<any>('submit');

  const handleClick = useCallback(() => {
    type === 'submit' ? setType('button') : setType('submit');
  }, [type]);

  return (
    <div>
      <h1>Web</h1>
      <Button type={type} className={'meet-btn'} onClick={handleClick}>
        Button
      </Button>
      <SubmitButton type={type} onClick={handleClick}>
        SubmitButton
      </SubmitButton>
    </div>
  );
};

export default Web;
