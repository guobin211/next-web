import React, { useEffect } from 'react';
import { Button } from '@tencent/next-components';

export default function Web() {
  useEffect(() => {
  }, []);
  return (
    <div>
      <h1>Web</h1>
      <Button type={'button'} className={'meet-btn'}>
        Hello
      </Button>
    </div>
  );
}
