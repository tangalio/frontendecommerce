import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function Order() {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const [errorlist, setError] = useState([]);

    useEffect(() => {

        let isMounted = true;
        document.title = "Orders";

        axios.get(`/api/admin/orders`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setOrders(res.data.orders);
                    setLoading(false);
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, []);
    const updateStatusOrder = (id, status) => {
        status = status + 1;
        const formData = new FormData();
        formData.append('status', status);

        axios.post(`/api/admin/update/${id}`, formData).then(res => {
            if (res.data.status === 200) {
                // swal("Success", res.data.message, "success");
                setError([]);
                navigate(`/admin/orders`);
            }
            else if (res.data.status === 422) {
                swal("All Fields are mandetory", "", "error");
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate(`/admin/orders`);
            }
        });
    };
    const deleteSize = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-orders/${id}`).then(res => {
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
                return 'Chưa xác nhận';
            case 1:
                return 'Đã Xác Nhận';
            case 2:
                return 'Đã xuất kho';
            case 3:
                return 'Đang giao hàng';
            default:
                return (
                    <div>
                        Đơn hàng hoàn thành
                        <button type="button" onClick={(e) => deleteSize(e, id)} className="btn btn-danger btn-sm ">Delete</button>
                    </div>
                );
        }
    }


    var display_orders = "";
    if (loading) {
        return <h4>Loading Orders...</h4>
    }
    else {
        display_orders = orders.map((item) => {

            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>
                        <Link to={`/admin/view-order/${item.id}`} state={{ from: [item.id] }} className="btn btn-success btn-sm">View</Link>
                    </td>
                    <td>
                        {
                            item.status >= 4 ?
                                <div>{renderSwitch(item.id, item.status)}</div> :
                                (
                                    item.status == 3 ? renderSwitch(item.id, item.status) : <Link to={`/admin/admin/orders}`} onClick={() => updateStatusOrder(item.id, item.status)}>{renderSwitch(item.id, item.status)}</Link>
                                )

                        }

                    </td>
                </tr>
            )
        });
    }

    return (
        <div className="container px-4 mt-3">
            <div className="card">
                <div className="card-header">
                    <h4>View Orders</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    {/* <th>Tracking No.</th> */}
                                    <th>Phone No.</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {display_orders}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Order;