import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo.svg';

function Sidebar() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchData = useCallback(async () => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get('http://127.0.0.1:8000/api/datauser');
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  }, [token]); // fetchData hanya tergantung pada token

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      fetchData();
    }
  }, [token, navigate, fetchData]); // Menambahkan fetchData ke dependency array

  const logoutHandler = async () => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axios.post('http://127.0.0.1:8000/api/logout');
      localStorage.removeItem("token");
      navigate('/');
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="" className="brand-link">
        <img src={logo} className="brand-image img-circle elevation-3" style={{ opacity: 0.8 }} alt="AdminLTE" />
        <span className="brand-text font-weight-light">Sistem Helpdesk</span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src={logo} className="img-circle elevation-2" style={{ opacity: 0.8 }} alt="User" />
          </div>
          <div className="info">
            <Link to="" className="d-block">{user.name}</Link>
          </div>
        </div>
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </Link>
            </li>
            {user.level === 'admin' && (
              <li className="nav-item">
                <Link to="/user" className="nav-link">
                  <i className="nav-icon fas fa-users"></i>
                  <p>Data User</p>
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link to="" className="nav-link">
                <i className="nav-icon fas fa-briefcase"></i>
                <p>Data Helpdesk</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link onClick={logoutHandler} className="nav-link">
                <i className="nav-icon fas fa-lock"></i>
                <p>Logout</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
