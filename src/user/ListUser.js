import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import Header from '../element/Header';
import Sidebar from '../element/Sidebar';
import Footer from '../element/Footer';

function ListUser() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/user'); // Sesuaikan URL API
          setUsers(response.data);
      console.log('Response Status:', response.status);
      console.log('Response Headers:', response.headers);
      console.log('Response Data:', response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
          Swal.fire({
            title: 'Apakah kamu yakin?',
            text: "Data ini akan dihapus secara permanen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!'
          }).then(async (result) => {
            if (result.isConfirmed) {
              await axios.delete(`http://127.0.0.1:8000/api/user/destroy/${id}`); // Sesuaikan URL API
              fetchUsers();
              Swal.fire(
                'Terhapus!',
                'Data berhasil dihapus.',
                'success'
              )
            }
          })
        } catch (error) {
          console.error('Error deleting user:', error);
          Swal.fire('Error', 'Gagal menghapus data.', 'error');
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
                  <h1>Data User</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                    <li className="breadcrumb-item active">DataTables</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <div className='d-flex align-items-center'>
                        <h3 className="card-title">Data User</h3>
                            <Link to={"/user/create"} className="btn btn-primary btn-round ml-auto">
                                <i className="fa fa-plus"></i>
                                &nbsp; Tambah Data
                            </Link>
                      </div>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama</th>
                                <th>Email</th>
                                <th>Level</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            {users.map((user, index) => (
                            <tbody>
                           
                                <tr key={user.id}>
                                  <td>{index + 1}</td>
                                  <td>{user.name}</td>
                                  <td>{user.email}</td>
                                  <td>{user.level}</td>
                                  <td>
                                      <Link to={`/user/edit/${user.id}`} className="btn btn-warning btn-sm mr-2">
                                          <i className="fa fa-edit"></i> Edit
                                      </Link>
                                      <button onClick={() => deleteUser(user.id)} className="btn btn-danger btn-sm">
                                          <i className="fa fa-trash"></i> Delete
                                      </button>
                                  </td>
                                </tr>
                        
                            </tbody>
                                ))}
                        </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      <Footer />
    </div>
  )
}

export default ListUser;
