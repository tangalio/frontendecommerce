import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { Breadcrumb, Button, Container, Form, Table } from "react-bootstrap";
function ViewOrder() {
    const navigate = useNavigate();
    const [orderdetail, setOrderDetail] = useState([]);
    const [errorlist, setError] = useState([]);
    const [statusorder, setStatusOrder] = useState({
        status: '',
    });
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const id_order = location.state.from;

    useEffect(() => {
        axios.get(`/api/admin/orderdetail/${id_order}`).then(res => {
            if (res.data.status === 200) {
                setOrderDetail(res.data.orderitems);
                setStatusOrder(res.data.orderitems);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('/admin/orders');
            }
            setLoading(false);
        });

    }, [id_order, navigate]);
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
                return 'Chưa xác nhận';
            case 1:
                return 'Xác Nhận';
            case 2:
                return 'Đã xuất kho';
            case 3:
                return 'Đang giao hàng';
            default:
                return 'Hoàn thành';
        }
    }
    const updateStatusOrder = (id, status) => {
        status = status + 1;
        const formData = new FormData();
        formData.append('status', status);

        axios.post(`/api/admin/update/${id}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setError([]);
                navigate(`/admin/view-order/${id_order}`, { state: { from: [id_order] } });
            }
            else if (res.data.status === 422) {
                swal("All Fields are mandetory", "", "error");
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate(`/admin/view-order/${id_order}`, { state: { from: [id_order] } });
            }
        });

    };
    if (loading) {
        <h2>chicken</h2>
    }
    return (
        <div className="conten-tttk">
            <h3>View Orders Detail</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Mã đơn hàng</th>
                        <th>Ảnh</th>
                        <th>Sản phẩm</th>
                        <th>Đơn giá</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                        <th>Ngày đặt</th>

                    </tr>
                </thead>
                <tbody>

                    {

                        orderdetail.map((item) => {
                            return (
                                <tr>
                                    <td>{id_order}</td>
                                    <td width="10%">
                                        <img src={`http://localhost:8000/${item.productsize.product.image}`} alt={item.productsize.product.name} width="50px" height="50px" />
                                    </td>
                                    <td>{item.productsize.product.name}</td>
                                    <td>{format(item.price)}</td>
                                    <td>{item.qty}</td>
                                    <td>{format(item.productsize.product.price * item.qty)}</td>
                                    <td>{formatDate(item.created_at)}</td>

                                </tr>
                            )

                        })
                    }


                    {/* <td>
                        <Link onClick={statusorder(item.id, item.status)}>{item.status}</Link>
                    </td> */}

                </tbody>
            </Table>
        </div>

    )
}
export default ViewOrder;