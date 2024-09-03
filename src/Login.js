import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState([]);
  const navigate = useNavigate(); // Menggunakan useNavigate

  useEffect(() => {
    if(localStorage.getItem('token')) {
        navigate('/dashboard'); // Mengganti history.push dengan navigate
    }
  }, [navigate]);

  const loginHandler = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard'); // Mengganti history.push dengan navigate
    } catch (error) {
      if (error.response && error.response.data) {
        setValidation(error.response.data);
      } else {
        setValidation({ message: 'An unexpected error occurred.' });
      }
    }
  };

  return (
    <div className="hold-transition login-page">
        <div className="login-box">
        <div className="card card-outline card-primary">
            <div className="card-header text-center">
            <Link to="/" className="h1"><b>Sistem</b>Helpdesk</Link>
            </div>
            <div className="card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            {
                validation.message && (
                    <div className="alert alert-danger">
                        {validation.message}
                    </div>
                )
            }
            <form onSubmit={loginHandler}>
                <div className="input-group mb-3">
                <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="input-group-append">
                    <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                    </div>
                </div>
                </div>
                <div className="input-group mb-3">
                <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="input-group-append">
                    <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                    </div>
                </div>
                </div>
                <div className="row">
                    <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                </div>
            </form>
            </div>
        </div>
        </div>
    </div>
  );
}

export default Login;
