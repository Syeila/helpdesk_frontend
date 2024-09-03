import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import Header from '../element/Header';
import Sidebar from '../element/Sidebar';
import Footer from '../element/Footer';

function EditUser() {
  const { id } = useParams(); // Mendapatkan ID dari URL
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [level, setLevel] = useState('');
  const [validationError, setValidationError] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/show/${id}`);
        const user = response.data.data;
        setName(user.name);
        setEmail(user.email);
        setPassword(''); // Jangan menampilkan password saat edit
        setLevel(user.level);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Fetch User',
          text: 'User data could not be fetched.',
        });
      }
    };

    fetchUser();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    // Log the values before making the request
    console.log({
      name,
      email,
      password,
      level
  });
    try {
        const response = await axios.patch(`http://localhost:8000/api/user/update/${id}`, {
            name: name,        // Pastikan name diambil dari state yang telah di-set
            email: email,
            password: password, // Jika password tidak diperlukan, bisa dihapus dari payload
            level: level
        });

        Swal.fire({
            icon: 'success',
            title: 'User Updated Successfully',
            text: response.data.message,
        });

        navigate('/user');

    } catch (error) {
        if (error.response && error.response.data) {
            setValidationError(error.response.data.errors);

            Swal.fire({
                icon: 'error',
                title: 'Failed to Update User',
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
                  <h1>Edit User</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                    <li className="breadcrumb-item active">Edit User</li>
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
                      <h3 className="card-title">Edit User</h3>
                    </div>
                    <form onSubmit={updateUser}>
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
                          <i className="fa fa-check"></i> Update
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

export default EditUser;
