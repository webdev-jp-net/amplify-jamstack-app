import { Router } from 'react-router-dom';

import { Provider } from 'react-redux';

import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { store } from 'store';

import { Article } from './Article';
const history = createMemoryHistory();

describe('Article', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  it('Articleのスナップショット', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Article />
        </Router>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
