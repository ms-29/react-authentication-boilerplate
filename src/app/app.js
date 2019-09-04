import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter  } from 'react-router-dom';
import { connect } from 'react-redux';

import Routes from './routes';
import postgraphile from './clients/postgraphile';

class App extends React.Component {
  render() {
    const { token } = this.props;

    return (
      <ApolloProvider client={postgraphile(token)}>
        <BrowserRouter>
          <Routes token={token} />
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.tokens.token
  };
}

export default connect(mapStateToProps)(App);
