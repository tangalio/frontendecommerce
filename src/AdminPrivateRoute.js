import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useLocation, } from "react-router-dom";
import Home from "./components/frontend/pages/home/Home";
import axios from 'axios';
import swal from 'sweetalert';

function AdminPrivateRoute({ ...rest }) {
    const [Authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();
    const [loading, setloading] = useState(true);
    const location = useLocation();
    useEffect(() => {

        axios.get(`/api/checkingAuthenticated`).then(res => {
            if (res.status === 200) {
                setAuthenticated(true);
            }
            setloading(false);
        });

        return () => {
            setAuthenticated(false);
        };
    }, []);

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if (err.response.status === 401) {
            swal("Unauthorized", err.response.data.message, "warning");
            navigate('/');
        }
        return Promise.reject(err);
    });

    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error.response.status === 403) // Access Denied
        {
            swal("Forbidden", error.response.data.message, "warning");
            navigate('/403');
        }
        else if (error.response.status === 404) //Page Not Found
        {
            swal("404 Error", "Url/Page Not Found", "warning");
            navigate('/404');
        }
        return Promise.reject(error);
    }
    );

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        Authenticated
            ? <Home /> // <-- nested routes rendered here
            : 
            <Navigate to="/login" replace state={{ from: location }} />

    )
}
export default AdminPrivateRoute;