import { FC } from 'react';

import { LogoImage } from 'components/parts/LogoImage';

import { usePageTitle } from 'hooks/usePageTitle';

import styles from './Home.module.scss';
export const Home: FC = () => {
  usePageTitle(`Home`);

  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <LogoImage />
        <p>
          Edit <code className={styles.code}>src/pages/Home/Home.tsx</code> and save to reload.
        </p>
        <a
          className={styles.link}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};
