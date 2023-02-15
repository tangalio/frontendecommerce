import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import moment from "moment";
import { Breadcrumb, Button, Container, Form, Table } from "react-bootstrap";
import Footer from '../../../components/frontend/Footer/Footer'
import { Link, useNavigate } from 'react-router-dom';

function UserManager() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState([]);
    const [order, setOrder] = useState([]);
    var totalCartPrice = 0;
    const [errorlist, setError] = useState([]);
    if (!localStorage.getItem('auth_token')) {
        navigate('/');
        swal("Warning", "Login to goto User Page", "error");
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
                    swal("Warning", res.data.message, "error");
                }
            }
        });
        // axios.get(`/api/view-order`).then(res => {
        //     if (isMounted) {
        //         if (res.data.status === 200) {
        //             setOrder(res.data.orderitems);
        //             setLoading(false);
        //         }
        //         else if (res.data.status === 401) {
        //             navigate('/');
        //             swal("Warning", res.data.message, "error");
        //         }
        //     }
        // });
        axios.get(`/api/order`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setOrder(res.data.orders);
                    setLoading(false);
                }
                else if (res.data.status === 401) {
                    navigate('/');
                    swal("Warning", res.data.message, "error");
                }
            }
        });


        return () => {
            isMounted = false
        };
    }, [navigate]);
    if (loading) {
        return <h4>Loading User Detail...</h4>
    }
    const format = (n) => {
        n = new Number(n);
        return n.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    };
    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options)
    }
    const deleteSize = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/deleteorder/${id}`).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                thisClicked.closest("tr").remove();
            }
            else if (res.data.status === 404) {
                swal("Success", res.data.message, "success");
                thisClicked.innerText = "Delete";
            }
        });

    }

    const renderSwitch = (id, param) => {

        switch (param) {
            case 0:
                return 'Chờ xử lý';
            case 1:
                return 'Đã xác nhận';
            case 2:
                return 'Đã xuất kho';
            case 3:
                return 'Đang giao hàng';
            default:
                return 'Hoàn thành';
        }
    }
    const updateStatusOrder = (id, status) => {
        // e.preventDefault();
        status = status + 1;
        const formData = new FormData();
        formData.append('status', status);

        axios.post(`/api/update/${id}`, formData).then(res => {
            if (res.data.status === 200) {
                // swal("Success", res.data.message, "success")
                setError([]);
                navigate(`/users`);
            }
            else if (res.data.status === 422) {
                swal("All Fields are mandetory", "", "error");
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate(`/users`);
            }
        }, [navigate]);


    };
    const statusbutton = (status, id) => {

        switch (status) {
            case 0:
                return <button type="button" onClick={(e) => deleteSize(e, id)} className="btn btn-danger btn-sm">Hủy Đơn</button>;
            case 1:
                return <button type="button" class="btn btn-sm  btn-secondary">Hủy Đơn</button>;
            case 2:
                return <button type="button" class="btn btn-sm  btn-secondary">Hủy Đơn</button>;
            case 3:
                return <Link to={`/orders/orders}`} class="btn btn-sm  btn-primary" onClick={() => updateStatusOrder(id, status)}>Đã nhận</Link>;
            default:
                return <button type="button" class="btn btn-sm btn-light">Đã nhận</button>;
        }
    }

    return (
        <Container className="qltk">
            <div className="container-mnu">
                <div className="left-menu">
                    <div className="User-title" >
                        {
                            user.map((item) => {
                                return (

                                    <div className="conten-tttk">

                                        <p> Xin chào, {item.name} </p>

                                    </div>
                                )
                            })
                        }

                    </div>

                </div>
                <div className="content-mnu">
                    {
                        user.map((item) => {
                            return (
                                <div className="conten-tttk">
                                    <h3>Thông tin tài khoản</h3>
                                    <p> Tên : {item.name} </p>
                                    <p> Tài khoản: {item.email} </p>
                                    <p> Địa chỉ: {item.address} </p>
                                    <p>Điện thoại: {item.phone} </p>
                                </div>
                            )
                        })
                    }
                    <div className="conten-tttk">
                        <h3>DANH SÁCH ĐƠN HÀNG GẦN ĐÂY</h3>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Mã đơn hàng</th>
                                    <th>Ngày đặt</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Trạng thái đơn hàng</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {
                                    order.map((item) => {
                                        return <tr>
                                            <td>{item.id}</td>
                                            <td width="10%">
                                                <img src={`http://localhost:8000/${item.productsize.product.image}`} alt={item.productsize.product.name} width="50px" height="50px" />
                                            </td>
                                            <td>{item.productsize.product.name}</td>
                                            <td>{format(item.price)}</td>
                                            <td>{item.qty}</td>
                                            <td>{format(item.productsize.product.price * item.qty)}</td>
                                            <td>{formatDate(item.created_at)}</td>
                                        </tr>
                                    })
                                } */}
                                {
                                    order.map((item) => {
                                        return <tr>
                                            <td>
                                                <Link to={`/users/orderdetail/${item.id}`} state={{ from: [item.id] }} className="btn btn-success btn-sm">{item.id}</Link>
                                            </td>
                                            <td>{formatDate(item.created_at)}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.email}</td>
                                            <td>
                                                {
                                                    renderSwitch(item.id, item.status)
                                                }
                                            </td>
                                            <td>
                                                {/* {
                                                    item.status == 0 ?
                                                        <button type="button" onClick={(e) => deleteSize(e, item.id)} className="btn btn-danger btn-sm">Hủy Đơn</button>
                                                        :
                                                        (item.status == 3 ?
                                                            <button type="button" className="btn btn-danger btn-sm">Đã nhận</button> :
                                                            <button type="button" class="btn btn-sm  btn-secondary">Hủy Đơn</button>)
                                                } */}
                                                {
                                                    statusbutton(item.status, item.id)
                                                }
                                            </td>
                                        </tr>
                                    })
                                }


                            </tbody>
                        </Table>
                    </div>
                </div>

            </div>
            <Footer />
        </Container>
    );
}

export default UserManager;