import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import P1 from "./Images/product_1.png";
import { MdAddShoppingCart } from "react-icons/md";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import swal from 'sweetalert';
import Footer from './Footer/Footer';
import { BsTypeH1 } from "react-icons/bs";
import NewProduct from '../../components/frontend/New_Product';
function Product_detail() {
    const [product, setProduct] = useState([]);
    const [productInput, setProductInput] = useState({
        id: '',
        product_id: '',
        size_id: '',
        quantity: '',
    });
    // const [quantity, setQuantity] = useState(1);
    const location = useLocation();
    const id_product = location.state.from[0];
    const nameproduct = location.state.from[2];
    const descriptionproduct = location.state.from[4];
    const priceproduct = location.state.from[3];
    const imageproduct = location.state.from[1];
    const [quantity, setQuantity] = useState(1);
    const [sizelist, setSizelist] = useState([]);
    const [productSize, setProductSize] = useState([]);
    const [hasMany, sethasMany] = useState([]);
    const navigate = useNavigate();
    const [errorlist, setError] = useState([]);
    const [loading, setLoading] = useState(true);

    console.log("MMMM",location.state.from);
    // Quantity Increment/Decrement in Hooks - Start
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevCount => prevCount - 1);
        }
    }
    const handleIncrement = () => {
        if (quantity < 10) {
            setQuantity(prevCount => prevCount + 1);
        }
    }
    // Quantity Increment/Decrement in Hooks - End
    const submitAddtocart = (e) => {
        // e.preventDefault();

        const data = {
            productsize_id: e,
            product_qty: quantity,
        }

        axios.post(`/api/add-to-cart`, data).then(res => {
            if (res.data.status === 201) {
                //Created - Data Inserted
                swal("Success", res.data.message, "success");
                navigate(`/`);
                navigate(`/product_detail/${id_product}`, { state: { from: [id_product, imageproduct, nameproduct, priceproduct, descriptionproduct] } });
            } else if (res.data.status === 409) {
                //Already added to cart
                swal("Success", res.data.message, "success");
            } else if (res.data.status === 401) {
                //Unauthenticated
                swal("Error", res.data.message, "error");
            } else if (res.data.status === 404) {
                //Not Found
                swal("Warning", res.data.message, "warning");
            }
        });



    }
    const handleInput = (e) => {
        e.persist();
        setProductInput({ ...productInput, [e.target.name]: e.target.value });

    }

    useEffect(() => {
        let isMountered = true;
        axios.get(`/api/allsize`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setSizelist(res.data.size);
                }
            }
        });
        let isMounted = true;
        axios.get(`/api/idproduct/${id_product}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setProduct(res.data.product_size);
                    setLoading(false);
                }
            }
        });
        axios.get(`api/hasMany-product`).then(res => {
            if (isMountered) {
                if (res.data.status === 200) {
                    sethasMany(res.data.products.data);
                    setLoading(false);
                }
            }
        });

        return () => {
            isMounted = false
        };
    }, [id_product]);

    useEffect(() => {
        const productsizelist = [];
        var size_ids = product.map((item) => { return (item.size_id) });
        sizelist.forEach(e => {
            if (size_ids.includes(e.id)) {
                productsizelist.push(e);
            }
        })
        setSizelist(productsizelist)
    }, [product])

    if (loading) {
        return <h4>Loading Product Detail...</h4>
    }
    else {

        var avail_stock = '';
        avail_stock = <div>
            <div className="row">
                <div className="col-md-3 mt-3">
                    <div className="input-group">
                        <button type="button" onClick={handleDecrement} className="input-group-text">-</button>
                        <div className="form-control text-center">{quantity}</div>
                        <button type="button" onClick={handleIncrement} className="input-group-text">+</button>
                    </div>
                </div>
                {
                    product.map((item) => {
                        if (item.size_id == productInput.size_id) {
                            return <div className="col-md-3 mt-3">
                                <button type="button" className="btn btn-primary w-100" onClick={() => submitAddtocart(item.id)}>Add to Cart</button>
                            </div>
                        }
                    })
                }


            </div>
        </div>

    }
    const format = (n) => {
        n = new Number(n);
        return n.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    };
    return (
        <Container className="detailProduct">
            {/* <Breadcrumb>
            </Breadcrumb> */}
            <div className="for-Male-category">
                Trang chủ / {nameproduct}
            </div>
            <div>

                <div className="py-3">
                    <div className="container">
                        <div className="row">

                            <div className="col-md-4 border-end">
                                <img src={imageproduct} alt={nameproduct} className="w-100" />
                            </div>

                            <div className="col-md-8">
                                <h1>
                                    {nameproduct}
                                </h1>
                                <h4 className="mb-1">
                                    Giá : {format(priceproduct)}
                                </h4>
                                <div>
                                    <tr>
                                        <th ><h2>Tình trạng: Còn hàng :</h2></th>
                                        <th>{
                                            product.map((item) => {
                                                if (productInput.size_id == '') {
                                                    return <h3>
                                                    </h3>
                                                } else if (productInput.size_id == item.size_id) {
                                                    return <h3>
                                                        {item.quantity}
                                                    </h3>
                                                }
                                            })
                                        }</th>
                                    </tr>

                                </div>

                                <div className="form-group mb-3">
                                    <label>Select Category</label>
                                    <select name="size_id" onChange={handleInput} value={productInput.size_id} >
                                        <option>Add Size</option>
                                        {
                                            sizelist.map((item) => {
                                                return (
                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <small className="text-danger">{errorlist.size_id}</small>
                                </div>
                                <div>
                                    {avail_stock}
                                </div>
                                <Row className="Dp-mota">
                                    <h3>Mô tả sản phẩm</h3>
                                    <p>{descriptionproduct}</p>
                                </Row>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <NewProduct hasMany={hasMany} />
            <Footer />
        </Container>
    );


}

export default Product_detail;