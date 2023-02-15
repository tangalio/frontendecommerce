import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';


function Checkout() {

    const navigate = useNavigate();
    if (!localStorage.getItem('auth_token')) {
        navigate('/');
        swal("Warning", "Login to goto Cart Page", "error");
    }

    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    var totalCartPrice = 0;

    const [checkoutInput, setCheckoutInput] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
    });
    const [error, setError] = useState([]);

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
                    swal("Warning", res.data.message, "error");
                }
            }
        });

        return () => {
            isMounted = false
        };
    }, [navigate]);

    const handleInput = (e) => {
        e.persist();
        setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
    }

    var orderinfo_data = {
        firstname: checkoutInput.firstname,
        lastname: checkoutInput.lastname,
        phone: checkoutInput.phone,
        email: checkoutInput.email,
        address: checkoutInput.address,
        city: checkoutInput.city,
        state: checkoutInput.state,
        zipcode: checkoutInput.zipcode,
        payment_mode: 'Paid by PayPal',
        payment_id: '',
    }


    // End-Paypal Code
    const format = (n) => {
        n = new Number(n);
        return n.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    };
    const submitOrder = (e, payment_mode) => {
        e.preventDefault();

        var data = {
            firstname: checkoutInput.firstname,
            lastname: checkoutInput.lastname,
            phone: checkoutInput.phone,
            email: checkoutInput.email,
            address: checkoutInput.address,
            city: checkoutInput.city,
            state: checkoutInput.state,
            zipcode: checkoutInput.zipcode,
            payment_mode: payment_mode,
            payment_id: '',
        }

        switch (payment_mode) {
            case 'cod':
                axios.post(`/api/place-order`, data).then(res => {
                    if (res.data.status === 200) {
                        swal("Order Placed Successfully", res.data.message, "success");
                        setError([]);
                        navigate('/thank-you');
                    }
                    else if (res.data.status === 422) {
                        swal("All fields are mandetory", "", "error");
                        setError(res.data.errors);
                    }
                });
                break;

            default:
                break;
        }

    }

    if (loading) {
        return <h4>Loading Checkout...</h4>
    }

    var checkout_HTML = '';
    if (cart.length > 0) {
        checkout_HTML = <div>
            <div className="row">

                <div className="col-md-7">
                    <div className="card">
                        <div className="card-header">
                            <h4>Basic Information</h4>
                        </div>
                        <div className="card-body">

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label> First Name</label>
                                        <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className="form-control" />
                                        <small className="text-danger">{error.firstname}</small>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label> Last Name</label>
                                        <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className="form-control" />
                                        <small className="text-danger">{error.lastname}</small>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label> Phone Number</label>
                                        <input type="number" name="phone" onChange={handleInput} value={checkoutInput.phone} className="form-control" />
                                        <small className="text-danger">{error.phone}</small>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label> Email Address</label>
                                        <input type="email" name="email" onChange={handleInput} value={checkoutInput.email} className="form-control" />
                                        <small className="text-danger">{error.email}</small>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group mb-3">
                                        <label> Full Address</label>
                                        <textarea rows="3" name="address" onChange={handleInput} value={checkoutInput.address} className="form-control"></textarea>
                                        <small className="text-danger">{error.address}</small>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-3">
                                        <label>City</label>
                                        <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className="form-control" />
                                        <small className="text-danger">{error.city}</small>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-3">
                                        <label>State</label>
                                        <input type="text" name="state" onChange={handleInput} value={checkoutInput.state} className="form-control" />
                                        <small className="text-danger">{error.state}</small>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-3">
                                        <label>Zip Code</label>
                                        <input type="text" name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} className="form-control" />
                                        <small className="text-danger">{error.zipcode}</small>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group text-end">
                                        <button type="button" className="btn btn-primary mx-1" onClick={(e) => submitOrder(e, 'cod')}>Place Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-5">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th width="50%">Product</th>
                                <th>Size</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, idx) => {
                                totalCartPrice += item.productsize.product.price * item.product_qty;
                                return (
                                    <tr key={idx}>
                                        <td>{item.productsize.product.name}</td>
                                        <td>{item.productsize.size.name}</td>
                                        <td>{item.productsize.product.price}</td>
                                        <td>{item.product_qty}</td>
                                        <td>{format(item.productsize.product.price * item.product_qty)}</td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td colSpan="2" className="text-end fw-bold">Grand Total</td>
                                <td colSpan="3" className="text-end fw-bold">{format(totalCartPrice)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    }
    else {
        checkout_HTML = <div>
            <div className="card card-body py-5 text-center shadow-sm">
                <h4>Giỏ hàng của bạn trống rỗng. Bạn đang ở trong Trang thanh toán.</h4>
            </div>
        </div>
    }

    return (
        <div>

            <div class="modal fade" id="payOnlineModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Online Payment Mode</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <hr />

                        </div>
                    </div>
                </div>
            </div>


            <div className="for-Male-category">
                Trang chủ / Checkout
            </div>

            <div className="py-4">
                <div className="container">
                    {checkout_HTML}
                </div>
            </div>

        </div>
    )
}



export default Checkout;