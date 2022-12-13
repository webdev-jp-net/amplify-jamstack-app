import { Router } from 'react-router-dom';

import { Provider } from 'react-redux';

import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { store } from 'store';

import { Layout } from './Layout';
const history = createMemoryHistory();

describe('Layout', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  it('Layoutのスナップショット', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Layout />
        </Router>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
