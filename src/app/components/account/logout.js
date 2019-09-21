import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { setUser } from '../../reducers/users';

class Logout extends  Component {
  constructor(props) {
    super(props);
    
    this.state = {
      success: false  
    };
  }

  componentDidMount() {
    axios.post('/logout')
      .then(response => {
        this.props.setUser(undefined);  
        this.setState({ success: true });
      }).catch(error => {
        this.setState({ success: false });
      });
  }

  render() {
    const { success } = this.state;

    if(success) {
      return (
        <Redirect to='/' />  
      ); 
    }

    return null;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch(setUser(user));
    }
  };
};
  
export default connect(undefined, mapDispatchToProps)(Logout);
