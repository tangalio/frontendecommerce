import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import swal from 'sweetalert';
import axios from 'axios';
function Navbar() {
    const [nameProduct, setnameProduct] = useState({
        name: '',
    });
    const [loading, setLoading] = useState(true);
    const [users, setUser] = useState([]);
    const [order, setOrder] = useState([]);
    const [errorlist, setError] = useState([]);
    const navigate = useNavigate();
    const logoutSubmit = (e) => {
        e.preventDefault();
        chicken()
        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal("Success", res.data.message, "success");
                navigate('/');
            }
        });

    }
    const chicken = (e) => {
        return 0;
    }
    useEffect(() => {

        let isMounted = true;

        axios.get(`/api/user`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setUser(res.data.users);
                    setLoading(false);
                }
                else if (res.data.status === 401) {
                    navigate('/');
                    // swal("Warning", res.data.message, "error");
                }
            }
        });

        return () => {
            isMounted = false
        };
    }, [navigate]);

    const [cart, setCart] = useState([]);
    useEffect(() => {

        let isMounted = true;

        axios.get(`/api/cart`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setCart(res.data.cart);
                    setLoading(false);
                }
                else if (res.data.status === 401) {
                    navigate('/');
                    // swal("Warning", res.data.message, "error");
                }
            }
        });

        return () => {
            isMounted = false
        };
    }, [navigate]);

    const handleInput = (e) => {
        e.persist();
        setnameProduct({ ...nameProduct, [e.target.name]: e.target.value });
    }
    // let so = cart.length;
    var AuthButtons = '';
    var user = '';
    if (!localStorage.getItem('auth_token')) {
        AuthButtons = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
            </ul>
        );
    }
    else {
        AuthButtons = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <button type="button" onClick={logoutSubmit} className="nav-link btn btn-danger btn-sm text-white">Logout</button>
                </li>

            </ul>
        );
        user = (
            <li className="nav-item">
                <Link className="nav-link" to="/users">
                    {
                        users.map((item) => {
                            return (item.name)
                        })
                    }
                </Link>
            </li>
        );

    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
            <div className="container">

                <Link className="navbar-brand" to="#">Ecom Project</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Home</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li> */}
                        <li className="nav-item">
                            <Badge color="error" overlap="circular" badgeContent={user ? cart.length : 0}>
                                <Link className="nav-link" to="/cart">Cart</Link>
                            </Badge>

                        </li>

                        {
                            user
                        }
                        <div class="container-fluid">
                            <form class="d-flex" role="search">
                                <input class="form-control me-2" type="search" placeholder="Search" name="name" onChange={handleInput} value={nameProduct.name} aria-label="Search" />
                                <Link to={`/search/${nameProduct.name}`} state={{ from: nameProduct.name }} className="btn btn-success btn-sm">Search</Link>
                            </form>
                        </div>
                        {AuthButtons}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;