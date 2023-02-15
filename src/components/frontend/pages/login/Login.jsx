import React, { useState } from "react";
import "./login.scss"
import axios from "axios";
import swal from "sweetalert";
import { Link, useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate();
  const [loginInput, setLogin] = useState({
    email: '',
    password: '',
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  }

  const loginSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    }

    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(`api/login`, data).then(res => {
        if (res.data.status === 200) {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          swal("Success", res.data.message, "success");
          if (res.data.role === 'user') {
            navigate('/');
          }
        }
        else if (res.data.status === 401) {
          swal("Warning", res.data.message, "warning");
        }
        else {
          setLogin({ ...loginInput, error_list: res.data.validation_errors });
        }
      });
    });
  }
  return (
    <div className="center-item">
      <form onSubmit={loginSubmit}>
        <h2>Login</h2>
        <div className="form-group mb-3">
          <input type="email" name="email" placeholder="Enter email" onChange={handleInput} value={loginInput.email} />
          <span>{loginInput.error_list.email}</span>
        </div>
        <div className="form-group mb-3">
          <input type="password" name="password" placeholder="Enter password" onChange={handleInput} value={loginInput.password} />
          <span>{loginInput.error_list.password}</span>
        </div>
        <div className="form-group mb-3">
          <button type="submit">Login</button>
        </div>


        <p>Not Registered ? <Link to="/register">Create Account Now!</Link></p>
        <Link href="#">Forget Password ?</Link>
      </form>
    </div>

  )
}

export default Login