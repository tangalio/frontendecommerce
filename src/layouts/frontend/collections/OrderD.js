import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Breadcrumb, Button, Container, Form, Table } from "react-bootstrap";
function OrderD() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState([]);
    const [orderdetail, setorderdetail] = useState([]);
    const location = useLocation();
    const idorderdetail = location.state.from;

    if (!localStorage.getItem('auth_token')) {
        navigate('/');
        swal("Warning", "Login to goto User Page", "error");
    }

    useEffect(() => {

        let isMounted = true;
        axios.get(`/api/view-order/${idorderdetail}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setorderdetail(res.data.orderitems);
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

    const format = (n) => {
        n = new Number(n);
        return n.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    };
    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options)
    }

    const renderSwitch = (param) => {
        switch (param) {
            case 0:
                return 'Chờ xử lý';
            case 1:
                return 'Xác thực';
            case 2:
                return 'Đã xuất kho';
            case 3:
                return 'Đang giao hàng';
            default:
                return 'Hoàn thành';
        }
    }
    const deleteSize = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-size/${id}`).then(res => {
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
    if (loading) {
        return <h4>Loading Order Detail...</h4>
    }

    return (
        <Container className="qltk">
            <div className="container-mnu">

                <div className="content-mnu">

                    <div className="conten-tttk">
                        <h3>DANH SÁCH CHI TIẾT ĐƠN HÀNG</h3>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID đơn hàng</th>
                                    <th>Ảnh</th>
                                    <th>Sản phẩm</th>
                                    <th>Đơn giá</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                    <th>Ngày đặt hàng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orderdetail.map((item) => {
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
                                }



                            </tbody>
                        </Table>
                    </div>
                </div>

            </div>
        </Container>

    )
}
export default OrderD;