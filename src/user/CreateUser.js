import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import Header from '../element/Header';
import Sidebar from '../element/Sidebar';
import Footer from '../element/Footer';

function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [level, setLevel] = useState('user');
  const [validationError, setValidationError] = useState({});

  const navigate = useNavigate(); // Inisialisasi useNavigate

  const createUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/user/store', {
        name,
        email,
        password,
        level
      });

      // Notifikasi sukses dengan Swal
      Swal.fire({
        icon: 'success',
        title: 'User Created Successfully',
        text: response.data.message,
      });

      // Reset form
      setName('');
      setEmail('');
      setPassword('');
      setLevel('user');
      setValidationError({});

      // Navigasi ke halaman /user setelah sukses
      navigate('/user');
      
    } catch (error) {
      if (error.response && error.response.data) {
        setValidationError(error.response.data.errors);

        // Notifikasi error dengan Swal
        Swal.fire({
          icon: 'error',
          title: 'Failed to Create User',
          text: 'Please check the form for errors.',
        });
      }
    }
  };
  
  return (
    <div className="wrapper">
      <Header/>
      <Sidebar/>
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Create User</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                    <li className="breadcrumb-item active">Create User</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="card card-primary">
                    <div className="card-header">
                      <h3 className="card-title">Create User</h3>
                    </div>
                    <form onSubmit={createUser}>
                      <div className="card-body">
                        <div className="form-group">
                          <label htmlFor="name">Name</label>
                          <input type="text" name="name" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
                          {validationError.name && <span className="text-danger">{validationError.name[0]}</span>}
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email address</label>
                          <input type="email" name="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                          {validationError.email && <span className="text-danger">{validationError.email[0]}</span>}
                        </div>
                        <div className="form-group">
                          <label htmlFor="password">Password</label>
                          <input type="password" name="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                          {validationError.password && <span className="text-danger">{validationError.password[0]}</span>}
                        </div>
                        <div className="form-group">
                          <label htmlFor="level">Level</label>
                          <select name="level" className="form-control" id="level" value={level} onChange={(e) => setLevel(e.target.value)}>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                          </select>
                          {validationError.level && <span className="text-danger">{validationError.level[0]}</span>}
                        </div>
                      </div>
                      <div className="card-footer">
                        <button type="submit" className="btn btn-primary">
                          <i className="fa fa-check"></i> Submit
                        </button>
                        <Link to="/user" className="btn btn-secondary ml-2">
                          <i className="fa fa-times"></i> Cancel
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      <Footer />
    </div>
  );
}

export default CreateUser;
