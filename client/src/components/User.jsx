import React, { useEffect, useState } from "react";
import axios from "axios";
import "./user.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
const REACT_APP_API_URL = "http://localhost:4000";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API_URL}/api/allusers`);
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error while fetching data!", error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    await axios
      .delete(`${REACT_APP_API_URL}/api/delete/user/${userId}`)
      .then((response) => {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
        toast.success(response.data.message, { position: "bottom-left" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-wrapper">
      <div className="glass-container">
        <h2 className="table-title">User Table</h2>

        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
          <Link to="/add" className="btn btn-success add-user-btn">
            <i className="fa-solid fa-user-plus"></i> Add User
          </Link>

          <div className="d-flex gap-2 flex-wrap">
            <input
              type="text"
              className="form-control search-box"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Responsive Table */}

        <div className="responsive-table-wrapper">
          <table className="table custom-table text-white d-none d-md-table">
            <thead>
              <tr>
                <th>S.no.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {!filteredUsers || filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-white">
                    No registered users...
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>
                      <Link to={`/update/${user._id}`}>
                        <i className="fa-solid fa-pen-to-square edit"></i>
                      </Link>
                      <button
                        className="btn"
                        onClick={() => deleteUser(user._id)}
                      >
                        <i className="fa-solid fa-trash delete"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Mobile View Cards */}
          <div className="d-md-none">
  {filteredUsers.length === 0 ? (
    <p className="text-white text-center">No registered users...</p>
  ) : (
    filteredUsers.map((user, index) => (
      <div className="mobile-user-card" key={user._id}>
        <div className="mobile-icons">
          <Link to={`/update/${user._id}`}>
            <i className="fa-solid fa-pen-to-square edit"></i>
          </Link>
          <button onClick={() => deleteUser(user._id)}>
            <i className="fa-solid fa-trash delete"></i>
          </button>
        </div>
        <p><strong>S.no:</strong> {index + 1}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Address:</strong> {user.address}</p>
      </div>
    ))
  )}
</div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
