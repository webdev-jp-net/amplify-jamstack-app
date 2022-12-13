import { FC, useEffect } from 'react';

import { Outlet, useLocation } from 'react-router-dom';

import { GlobalNavigation } from 'components/features/GlobalNavigation';

export const Layout: FC = () => {
  const location = useLocation();

  // URLが変わったらスクロール位置をページの先頭にリセット
  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Outlet />
      <GlobalNavigation />
    </>
  );
};
