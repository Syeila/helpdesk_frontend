import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes dan Route
import Login from './Login';
import Dashboard from './Dashboard';

import ListUser from './user/ListUser';
import CreateUser from './user/CreateUser';
import EditUser from './user/EditUser';

function App() {
  return (
    <Routes> {/* Ganti Switch dengan Routes */}
      <Route path="/" element={<Login />} /> {/* Ganti component dengan element */}
      <Route path="/dashboard" element={<Dashboard />} /> {/* Ganti component dengan element */}
      
      {/* Data Master */}
      <Route path="/user" element={<ListUser />} />
      <Route path="/user/create" element={<CreateUser />} />
      <Route path="/user/edit/:id" element={<EditUser />} />
    </Routes>
  );
}

export default App;
