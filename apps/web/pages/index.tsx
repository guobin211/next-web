import React, { useEffect } from 'react';
import { Button } from '@tencent/next-components';
import { $db } from '@tencent/next-runtime';

export default function Web() {
  useEffect(() => {
    $db.set('name', 'web');
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
