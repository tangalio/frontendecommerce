import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import "./registered.scss"
import { Link } from "react-router-dom"
const Registered = () => {
  const navigate = useNavigate();
  const [registerInput, setRegister] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmpassword: '',
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  }

  const registerSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: registerInput.name,
      email: registerInput.email,
      phone: registerInput.phone,
      address: registerInput.address,
      password: registerInput.password,
      confirmpassword: registerInput.confirmpassword,
    }

    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(`/api/register`, data).then(res => {
        if (res.data.status === 200) {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          swal("Success", res.data.message, "success");
          navigate('/');
        }
        else {
          setRegister({ ...registerInput, error_list: res.data.validation_errors });
        }
      });
    });
  }
  return (
    <div className="center-item">

      <form onSubmit={registerSubmit}>
      <h2>Registered</h2>
        <div className="form-group mb-3">
          <input type="text" name="name" placeholder="Enter  Name" onChange={handleInput} value={registerInput.name} className="form-control" />
          <span>{registerInput.error_list.name}</span>
        </div>

        <div className="form-group mb-3">
          <input type="text" name="email" placeholder="Enter  Email" onChange={handleInput} value={registerInput.email} className="form-control" />
          <span>{registerInput.error_list.email}</span>
        </div>

        <div className="form-group mb-3">
          <input type="text" name="phone" placeholder="Enter  Phone" onChange={handleInput} value={registerInput.phone} className="form-control" />
          <span>{registerInput.error_list.phone}</span>
        </div>

        <div className="form-group mb-3">
          <input type="text" name="address" placeholder="Enter  Address" onChange={handleInput} value={registerInput.address} className="form-control" />
          <span>{registerInput.error_list.address}</span>
        </div>

        <div className="form-group mb-3">
          <input type="password" name="password" placeholder="Enter  Password" onChange={handleInput} value={registerInput.password} className="form-control" />
          <span>{registerInput.error_list.password}</span>
        </div>

        <div className="form-group mb-3">
          <input type="password" name="confirmpassword" placeholder="Enter  Confirm Password" onChange={handleInput} value={registerInput.confirmpassword} className="form-control" />
          <span>{registerInput.error_list.confirmpassword}</span>
        </div>
        <div className="form-group mb-3">
          <button type="submit" className="btn btn-primary">Register</button>
        </div>
      </form>
      {/* <input type="text" placeholder="Enter your email" />
        <input type="text" placeholder="Enter your fullname" />
        <input type="text" placeholder="Enter your phone number" />
        <input type="text" placeholder="Enter your address" />
        <input type="password" placeholder="Enter the password" />
        <input type="password" placeholder="Re-enter password" />
        <button type="button">Registered</button> */}
      {/* <p>You have account ?<Link to="/login">Login Now!</Link> </p>
      <a href="#">Forget Password ?</a> */}

    </div>

  )
}

export default Registered