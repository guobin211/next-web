import React, { useCallback, useState } from 'react';
import { Button } from '@tencent/next-components';
import { ButtonProps } from '@tencent/next-components/button/Button.props';
import { LogProps, withLogProps } from '@tencent/next-components/__HOC__';

@LogProps
export class SubmitButton extends React.Component<ButtonProps> {
  render() {
    return (
      <button type={this.props.type} onClick={ev => this.props.onClick?.(ev)}>
        {this.props.children}
      </button>
    );
  }
}

const LogButton = withLogProps(Button);

const Web: React.FC = () => {
  const [type, setType] = useState<any>('submit');

  const handleClick = useCallback(() => {
    type === 'submit' ? setType('button') : setType('submit');
  }, [type]);

  return (
    <div>
      <h1>Web</h1>
      <LogButton type={type} className={'meet-btn'} onClick={handleClick}>
        Button
      </LogButton>
      <SubmitButton type={type} onClick={handleClick}>
        SubmitButton
      </SubmitButton>
    </div>
  );
};

export default Web;
