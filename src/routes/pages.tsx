import { FC } from 'react';

import { Routes, Route } from 'react-router-dom';

import { Article } from 'pages/Article';
import { Home } from 'pages/Home';
import { Layout } from 'pages/Layout';

export const Pages: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/article" element={<Article />} />
      </Route>
    </Routes>
  );
};
