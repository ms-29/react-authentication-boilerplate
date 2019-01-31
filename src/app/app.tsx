import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter  } from 'react-router-dom';
import { connect } from 'react-redux';

import Routes from './routes';
import postgraphile from './clients/postgraphile';
import { IState } from './reducers';

interface IStateProps {
  token?: string;
}

interface IProps extends IStateProps {

}

class App extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

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

const mapStateToProps = (state: IState): IStateProps => {
  return {
    token: state.tokens.token
  };
}

export default connect(mapStateToProps)(App);
