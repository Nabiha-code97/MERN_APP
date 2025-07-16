import React, { useEffect, useState } from "react";
import "./addUser.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const REACT_APP_API_URL = "http://localhost:4000";

const AddUser = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    // Name must not contain numbers
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Name must only contain alphabets.";
    }

    // Email format validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    // Address must contain letters (not just numbers)
    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    } else if (/^\d+$/.test(formData.address)) {
      newErrors.address = "Address must contain letters too.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (isEditMode) {
      axios
        .get(`${REACT_APP_API_URL}/api/getUser/${id}`)
        .then((response) => {
          const { name, email, address } = response.data;
          setFormData({ name, email, address });
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          toast.error("Failed to load user", { position: "bottom-left" });
        });
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isEditMode) {
      axios
        .put(`${REACT_APP_API_URL}/api/updateUser/user/${id}`, formData)
        .then(() => {
          toast.success("User updated successfully!", { position: "bottom-left" });
          navigate("/");
        })
        .catch((error) => {
          console.error("Update error:", error);
          toast.error("Failed to update user", { position: "bottom-left" });
        });
    } else {
      axios
        .post(`${REACT_APP_API_URL}/api/user`, formData)
        .then(() => {
          toast.success("User added successfully!", { position: "bottom-left" });
          navigate("/");
        })
        .catch((error) => {
          console.error("Add error:", error);
          toast.error("Failed to add user", { position: "bottom-left" });
        });
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <h2 className="form-title">
          {isEditMode ? "Update User" : "Create New User"}
        </h2>

        <form className="user-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="input-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter residential address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <p className="error-text">{errors.address}</p>}
          </div>

          <button
            type="submit"
            className={`submit-btn ${isEditMode ? "edit-btn" : "add-btn"}`}
          >
            {isEditMode ? (
              <>
                <i className="fa-solid fa-floppy-disk me-2"></i> Save Changes
              </>
            ) : (
              <>
                <i className="fa-solid fa-user-plus me-2"></i> Add User
              </>
            )}
          </button>
        </form>

        <Link to="/" className="btn back">
          <i className="fa-solid fa-backward"></i> Go back
        </Link>
      </div>
    </div>
  );
};

export default AddUser;
