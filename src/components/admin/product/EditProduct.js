import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function EditProduct() {
    const navigate = useNavigate();
    const [categorylist, setCategorylist] = useState([]);
    const [productInput, setproduct] = useState({
        category_id: '',
        name: '',
        description: '',
        price: '',
    });
    const [pricture, setPicture] = useState([]);
    const [errorlist, setError] = useState([]);
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const product_id = location.state.from;
    const handleInput = (e) => {
        e.persist();
        setproduct({ ...productInput, [e.target.name]: e.target.value });
    }
    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] });
    }

    const [allcheckbox, setCheckboxes] = useState([]);
    const handleCheckbox = (e) => {
        e.persist();
        setCheckboxes({ ...allcheckbox, [e.target.name]: e.target.checked });
    }
    useEffect(() => {

        axios.get(`/api/all-category`).then(res => {
            if (res.data.status === 200) {
                setCategorylist(res.data.category);
            }
        });
        axios.get(`/api/edit-product/${product_id}`).then(res => {
            if (res.data.status === 200) {
                setproduct(res.data.product);
                setCheckboxes(res.data.product);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('/admin/view-product');
            }
            setLoading(false);
        });

    }, [product_id, navigate]);

    const updateProduct = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', pricture.image);
        formData.append('category_id', productInput.category_id);
        formData.append('name', productInput.name);
        formData.append('description', productInput.description);

        formData.append('price', productInput.price);
        formData.append('status', allcheckbox.status ? '1' : '0');

        axios.post(`/api/update-product/${product_id}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setError([]);
                navigate('/admin/view-product');
            }
            else if (res.data.status === 422) {
                swal("All Fields are mandetory", "", "error");
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('/admin/view-product');
            }
        });

    }

    if (loading) {
        return <h4>Edit Product Data Loading...</h4>
    }
    return (
        
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Edit Product
                        <Link to="/admin/view-product" className="btn btn-primary btn-sm float-end">View Product</Link>
                    </h4>
                </div>
                <div className="card-body" >
                    <form onSubmit={updateProduct} encType="multipart/form-data">


                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                <div className="form-group mb-3">
                                    <label>Select Category</label>
                                    <select name="category_id" onChange={handleInput} value={productInput.category_id} className="form-control">
                                        <option>Select Category</option>
                                        {
                                            categorylist.map((item) => {
                                                return (
                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <small className="text-danger">{errorlist.category_id}</small>
                                </div>

                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={productInput.name} className="form-control" />
                                    <small className="text-danger">{errorlist.name}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Description</label>
                                    <textarea name="description" onChange={handleInput} value={productInput.description} className="form-control"></textarea>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Selling Price</label>
                                    <input type="number" name="price" onChange={handleInput} value={productInput.price} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Image</label>
                                    <input type="file" name="image" onChange={handleImage} className="form-control" />
                                    <img src={`http://localhost:8000/${productInput.image}`} width="50px" alt={productInput.name} />
                                    <small className="text-danger">{errorlist.image}</small>
                                </div>
                                <div className="col-md-4 form-group mb-3">
                                    <label>Status (checked=Hidden)</label>
                                    <input type="checkbox" name="status" onChange={handleCheckbox} defaultChecked={allcheckbox.status === 1 ? true : false} className="w-50 h-50" />
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

export default EditProduct;