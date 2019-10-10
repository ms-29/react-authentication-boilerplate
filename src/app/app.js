import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, StaticRouter  } from 'react-router-dom';
import { Provider } from 'react-redux';

import Routes from './routes';
import { postgraphile } from './clients';
import store from './reducers';

class App extends React.Component {
  render() {
    const { path } = this.props;
    return (
      <Provider store={store}>
        <ApolloProvider client={postgraphile}>
          <StaticRouter location={path}>
            <Routes />
          </StaticRouter>
        </ApolloProvider>
      </Provider>
    );
  }
}

export default App;
