import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    // Reset errors
    setEmailError('');
    setPasswordError('');

    // Email validation
    if (!email) {
      setEmailError('Email is required');
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email address');
      return;
    }

    // Password validation
    if (!password) {
      setPasswordError('Password is required');
      return;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    try {
      await axios.post('http://localhost:5000/register', { email, password });
      alert("Success! User registered successfully.");
    } catch (error) {
      console.error('Signup failed', error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <>
      <h1 className='text-center'>Create new account</h1>
      <div className="container mt-5">
        <div className="row justify-content-center shadow-lg">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title">Signup</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                    <div className="text-danger">{emailError}</div>
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <div className="text-danger">{passwordError}</div>
                  </div>
                  <button type="submit" className="btn btn-primary">Signup</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <Link to={"/"} className='btn btn-info'>Login</Link>
        </div>
      </div>
    </>
  );
}

export default Signup;
