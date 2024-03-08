import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
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
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
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
