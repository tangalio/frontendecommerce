import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/frontend/Footer/Footer'
function Cart() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    var totalCartPrice = 0;

    if (!localStorage.getItem('auth_token')) {
        navigate('/');
        swal("Warning", "Login to goto Cart Page", "error");
    }

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

    const handleDecrement = (cart_id) => {
        setCart(cart =>
            cart.map((item) =>
                cart_id === item.id ? { ...item, product_qty: item.product_qty - (item.product_qty > 1 ? 1 : 0) } : item
            )
        );
        updateCartQuantity(cart_id, "dec");
    }
    const handleIncrement = (cart_id) => {
        setCart(cart =>
            cart.map((item) =>
                cart_id === item.id ? { ...item, product_qty: item.product_qty + (item.product_qty < 10 ? 1 : 0) } : item
            )
        );
        updateCartQuantity(cart_id, "inc");
    }
    function updateCartQuantity(cart_id, scope) {

        axios.put(`/api/cart-updatequantity/${cart_id}/${scope}`).then(res => {
            if (res.data.status === 200) {
            }
        });
    }

    const deleteCartItem = (e, cart_id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Removing";

        axios.delete(`/api/delete-cartitem/${cart_id}`).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                thisClicked.closest("tr").remove();
                navigate(`/`);
                navigate(`/cart`);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                thisClicked.innerText = "Remove";
            }
        });
    }
    const format = (n) => {
        n = new Number(n);
        return n.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    };

    if (loading) {
        return <h4>Loading Product Detail...</h4>
    }
    let so = cart.length;
    var cart_HTML = '';
    if (cart.length > 0) {
        cart_HTML = <div>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Size</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-center">Total Price</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, idx) => {
                            totalCartPrice += item.productsize.product.price * item.product_qty;
                            return (
                                <tr key={idx}>
                                    <td width="10%">
                                        <img src={`http://localhost:8000/${item.productsize.product.image}`} alt={item.productsize.product.name} width="50px" height="50px" />
                                    </td>
                                    <td>{item.productsize.product.name}</td>
                                    <td width="15%" className="text-center">{item.productsize.product.price}</td>
                                    <td width="15%" className="text-center">{item.productsize.size.name}</td>
                                    <td width="15%">
                                        <div className="input-group">
                                            <button type="button" onClick={() => handleDecrement(item.id)} className="input-group-text">-</button>
                                            <div className="form-control text-center">{item.product_qty}</div>
                                            <button type="button" onClick={() => handleIncrement(item.id)} className="input-group-text">+</button>
                                        </div>
                                    </td>
                                    <td width="15%" className="text-center">{format(item.productsize.product.price * item.product_qty)}</td>
                                    <td width="10%">
                                        <button type="button" onClick={(e) => deleteCartItem(e, item.id)} className="btn btn-danger btn-sm">Remove</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="row">
                <div className="col-md-8"></div>
                <div className="col-md-4">
                    <div className="card card-body mt-3">
                        <h4>Sub Total:
                            <span className="float-end">{format(totalCartPrice)}</span>
                        </h4>
                        <h4>Grand Total:
                            <span className="float-end">{format(totalCartPrice)}</span>
                        </h4>
                        <hr />
                        <Link to="/checkout" className="btn btn-primary"> Checkout </Link>
                    </div>
                </div>
            </div>
        </div>
    }
    else {
        cart_HTML = <div>
            <div className="card card-body py-5 text-center shadow-sm">
                <h4>Giỏ hàng của bạn đang trống</h4>
            </div>
        </div>
    }
    return (
        <div>
            {/* <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Home / Cart</h6>
                </div>
            </div> */}
            <div className="for-Male-category">
                Trang chủ / Cart({so})
            </div>

            <div className="py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {cart_HTML}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default Cart;