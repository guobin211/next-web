import React, { CSSProperties } from 'react';
import { GetServerSideProps } from 'next';
import { PosterPage } from '../modules/canvas/Poster.page';

export interface CanvasPageProps {
  className?: string;
  style?: CSSProperties;
}

export const getServerSideProps: GetServerSideProps<CanvasPageProps> = async (ctx) => {
  const { query, params, resolvedUrl, req } = ctx;
  console.log(query, params, resolvedUrl, req);
  return {
    props: {},
  };
};

const CanvasPage: React.FC<CanvasPageProps> = (props) => {
  const { className, style } = props;
  return (
    <div>
      <PosterPage className={className} style={style}/>
    </div>
  );
};

export default CanvasPage;
