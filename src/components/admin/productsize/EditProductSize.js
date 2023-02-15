import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
function EditProductSize() {
    const navigate = useNavigate();
    const [productSizeInput, setproductsize] = useState({
        quantity: '',
    });
    const [errorlist, setError] = useState([]);
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const productsize_id = location.state.from;
    const handleInput = (e) => {
        e.persist();
        setproductsize({ ...productSizeInput, [e.target.name]: e.target.value });
    }

    const [allcheckbox, setCheckboxes] = useState([]);
    const handleCheckbox = (e) => {
        e.persist();
        setCheckboxes({ ...allcheckbox, [e.target.name]: e.target.checked });
    }
    useEffect(() => {
        axios.get(`/api/edit-productsize/${productsize_id}`).then(res => {
            if (res.data.status === 200) {
                setproductsize(res.data.product_size);
                setCheckboxes(res.data.product_size);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('/admin/view-productsize');
            }
            setLoading(false);
        });

    }, [productsize_id, navigate]);

    const updateProduct = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('quantity', productSizeInput.quantity);
        formData.append('status', allcheckbox.status ? '1' : '0');

        axios.post(`/api/update-productsize/${productsize_id}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                console.log(allcheckbox);
                setError([]);
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
        return <h4>Edit ProductSize Data Loading...</h4>
    }
    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Edit ProductSize
                        <Link to="/admin/view-productsize" className="btn btn-primary btn-sm float-end">View ProductSize</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={updateProduct} encType="multipart/form-data">


                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                <div className="form-group mb-3">
                                    <label>Quantity</label>
                                    <input type="number" min="1" max="100" name="quantity" onChange={handleInput} value={productSizeInput.quantity} />
                                    <small className="text-danger">{errorlist.quantity}</small>
                                </div>
                                <div className="form-group mb-3">
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

export default EditProductSize;