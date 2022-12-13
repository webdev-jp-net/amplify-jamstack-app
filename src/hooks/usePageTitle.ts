import { useMemo } from 'react';

// titleタグを書き換えます
export const usePageTitle = (pageTitle: string): void => {
  useMemo(() => {
    document.title = pageTitle === 'テストアプリ' ? pageTitle : `テストアプリ - ${pageTitle}`;
  }, [pageTitle]);
};
