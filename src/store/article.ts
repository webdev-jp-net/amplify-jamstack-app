import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleData } from 'types/Article';

import articleList from 'data/articleList.json';

type State = {
  articleList: ArticleData[];
};

const initialState: State = {
  articleList,
};

const article = createSlice({
  name: 'article',

  initialState,

  reducers: {
    updateArticle: (state, action: PayloadAction<ArticleData>) => {
      return {
        ...state,
        articleList: { ...action.payload, ...state.articleList },
      };
    },
  },
});

// Action Creator
export const { updateArticle } = article.actions;

// Reducer
export default article.reducer;
