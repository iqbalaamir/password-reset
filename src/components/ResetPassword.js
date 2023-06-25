import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords don't match.");
      return;
    }
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/resetPassword`, { token, newPassword: password });
    if (response.data.success) {
        toast.success("Password reset is successful!");
      } else {
        toast.error(response.data.message);
      }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
      <h1>Reset Password</h1>
      <style type="text/css">{`
        .btn-space {
          margin-top: 15px;
        }
      `}</style>
      <Form onSubmit={handleSubmit} style={{ width: '300px' }}>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit" className='btn-space'>
          Reset Password
        </Button>
      </Form>
    </div>
  );
};

export default ResetPassword;
