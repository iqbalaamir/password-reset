import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/forgotPassword`, { email });
    if (response.data.success) {
        toast.success("Please! Check you Email For Reset Link");
      } else {
        toast.error(response.data.message);
      }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
      <h1>Forgot Password</h1>
      <style type="text/css">{`
        .btn-space {
          margin-top: 15px;
        }
      `}</style>
      <Form onSubmit={handleSubmit} style={{ width: '300px' }}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit" className='btn-space'>
          Send Reset Link
        </Button>
      </Form>
    </div>
  );
};

export default ForgotPassword;
