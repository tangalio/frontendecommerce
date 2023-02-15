import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
function AddProductSize() {
    const navigate = useNavigate();
    const [sizelist, setSizelist] = useState([]);
    const [viewProductsize, setProductsize] = useState([]);
    const [productInputProductsize, setInputProductsize] = useState({
        product_id: '',
        size_id: '',
        quantity: '',
    });
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const id_product = location.state.from[0];
    const nameproduct = location.state.from[1];
    const [errorlist, setError] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setInputProductsize({ ...productInputProductsize, [e.target.name]: e.target.value });
    }


    useEffect(() => {
        let isMounted = true;
        axios.get(`/api/all-size`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setSizelist(res.data.size);
                }
            }
        });
        axios.get(`/api/show-productsize/${id_product}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setProductsize(res.data.product_size)
                }
            }
        });
        return () => {
            isMounted = false
        };

    }, []);

    useEffect(() => {
        const productsizelist = [];
        var size_ids = viewProductsize.map((item) => { return (item.size_id) });
        sizelist.forEach(e => {
            if (!size_ids.includes(e.id)) {
                productsizelist.push(e);
            }
        })
        setSizelist(productsizelist)
    }, [viewProductsize])

    const submitProductSize = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('product_id', id_product);
        formData.append('size_id', productInputProductsize.size_id);
        formData.append('quantity', productInputProductsize.quantity);

        axios.post(`/api/store-productsize`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setInputProductsize({
                    ...productInputProductsize,
                    product_id: '',
                    size_id: '',
                    quantity: '',
                });
                setError([]);
                navigate('/admin/view-productsize');
            }
            else if (res.data.status === 422) {
                swal("All Fields are mandetory", "", "error");
                setError(res.data.errors);
            }
        });

    }
    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Add ProductSize
                        <Link to="/admin/view-productsize" className="btn btn-primary btn-sm float-end">View ProductSize</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={submitProductSize} encType="multipart/form-data">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="form-group mb-3">
                                    <h4>{nameproduct}</h4>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Select Category</label>
                                    <select name="size_id" onChange={handleInput} value={productInputProductsize.size_id} className="form-control">
                                        <option>Select Category</option>
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
                                <div className="form-group mb-3">
                                    <label>Quantity</label>
                                    <input type="number" min="1" max="100" name="quantity" onChange={handleInput} value={productInputProductsize.quantity} />
                                    <small className="text-danger">{errorlist.quantity}</small>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 mt-2">Submit</button>

                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddProductSize;