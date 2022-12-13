import { FC } from 'react';

import { NavLink, useLocation } from 'react-router-dom';

import styles from './GlobalNavigation.module.scss';
export const GlobalNavigation: FC = () => {
  const location = useLocation();
  const menuList: {
    id: string;
    link: string;
    label: string;
  }[] = [
    {
      id: 'home',
      link: '/',
      label: 'ホーム',
    },
    {
      id: 'article',
      link: '/article',
      label: '記事',
    },
  ];
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {menuList.map(menu => (
          <li className={styles.item} key={menu.id}>
            <NavLink
              to={menu.link}
              className={(): string => {
                let className = styles.link;
                const isCategoryActive =
                  menu.id === 'home'
                    ? location.pathname === '/'
                    : new RegExp(`^${menu.link}`, 'g').test(location.pathname);
                if (isCategoryActive) className += ` ${styles['--current']}`;
                return className;
              }}
            >
              <span className={styles.label}>{menu.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
