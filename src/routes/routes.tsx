import { FC } from 'react';

import { BrowserRouter } from 'react-router-dom';

import { Pages } from './pages';

export const Routes: FC = () => {
  // return initialize;
  return (
    <BrowserRouter>
      <Pages />
    </BrowserRouter>
  );
};
