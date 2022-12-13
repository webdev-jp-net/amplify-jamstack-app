import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import article from './article';

const reducer = combineReducers({
  article,
});

export const store = configureStore({ reducer });

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof reducer>;
