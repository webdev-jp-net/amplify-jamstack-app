import { FC } from 'react';

import { useSelector } from 'react-redux';

import { RootState } from 'store';

import { usePageTitle } from 'hooks/usePageTitle';

import styles from './Article.module.scss';
export const Article: FC = () => {
  const { articleList } = useSelector((state: RootState) => state.article);
  usePageTitle(`Article`);

  return (
    <>
      <div className={styles.page}>
        <ul className={styles.list}>
          {articleList.map(article => (
            <li key={article.id} className={styles.line}>
              <strong>{article.title}</strong>
              <br />
              <p
                className={styles.body}
                dangerouslySetInnerHTML={{
                  __html: `${article?.body}`,
                }}
              ></p>
              <figure className={styles.figure}>
                <img src={require(`images/article/${article.id}.webp`)} alt={article?.title} />
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
