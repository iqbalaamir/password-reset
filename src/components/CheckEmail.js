import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Tabs, Tab } from 'react-bootstrap';
import { toast } from 'react-toastify';

const CheckEmail = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [key, setKey] = useState('checkEmail');
  const navigate = useNavigate();

  const handleCheckEmail = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/checkEmail`, { email });
    if (response.data.success) {
      navigate('/forgotPassword');
    } else {
      toast.error(response.data.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, { email, password });
    if (response.data.success) {
      toast.success(response.data.message);
      setKey('checkEmail');
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
      <style type="text/css">{`
        .btn-space {
          margin-top: 15px;
        }
      `}</style>
      <h1>Welcome</h1>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} id="controlled-tab-example" className="mb-3">
        <Tab eventKey="checkEmail" title="Check Email">
          <Form onSubmit={handleCheckEmail} style={{ width: '300px' }}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="btn-space">
              Check Email
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="register" title="Register">
          <Form onSubmit={handleRegister} style={{ width: '300px' }}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="btn-space">
              Register
            </Button>
          </Form>
        </Tab>
      </Tabs>
    </div>
  );
};

export default CheckEmail;