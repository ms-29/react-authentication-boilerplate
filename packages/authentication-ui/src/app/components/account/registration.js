import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';

import { REGISTER_USER } from './mutation';

function Registration(props) {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ success, setSuccess ] = useState(undefined);

  const [ registerUser ] = useMutation(REGISTER_USER, {
    onCompleted: (response) => {
      setSuccess(true);
    },
    onError: (error) => {
      setSuccess(false);
    }
  });

  useEffect(() => {
    if(success) {
      props.history.push('/login');
    }
  }, [success]);

  return (
    <Col sm={12}>
      <Col sm={8} className='mx-auto'>
        <div className='mt-4'>
          <Card>
            <Card.Header>
              <h4>Registration</h4>
            </Card.Header>
            <Card.Body>
              <form onSubmit={event => {
                event.preventDefault();
                registerUser({variables: { email, password }});
              }}>
                <Form.Group as={Row}>
                  <Form.Label column sm={12} md={3}>Email Address</Form.Label>
                  <Col sm={12} md={9}>
                    <Form.Control
                      type='text'
                      placeholder='Email Address'
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm={12} md={3}>Password</Form.Label>
                  <Col sm={12} md={9}>
                    <Form.Control
                      type='password'
                      placeholder='Password'
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Col sm={12}>
                    <Button className='float-right' type='submit' variant='primary'>
                      Register
                    </Button>
                  </Col>
                </Form.Group>
              </form>
            </Card.Body>
          </Card>  
        </div>  
      </Col>  
    </Col>
  );
}

export default Registration;
