import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function EditCategory() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [categoryInput, setCategory] = useState({
        name: '',
    });
    const [error, setError] = useState([]);
    const location = useLocation();
    const category_id = location.state.from;
    const [allcheckbox, setCheckboxes] = useState([]);
    const handleCheckbox = (e) => {
        e.persist();
        setCheckboxes({ ...allcheckbox, [e.target.name]: e.target.checked });
    }
    useEffect(() => {

        axios.get(`/api/edit-category/${category_id}`).then(res => {
            if (res.data.status === 200) {
                setCategory(res.data.category);
                setCheckboxes(res.data.category);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('/admin/view-category');
            }
            setLoading(false);
        });

    }, [category_id, navigate]);

    const handleInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value });
    }

    const updateCategory = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', categoryInput.name);
        formData.append('status', allcheckbox.status ? '1' : '0');

        axios.post(`/api/update-category/${category_id}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setError([]);
                navigate('/admin/view-category');
            }
            else if (res.data.status === 422) {
                swal("All fields are mandetory", "", "error");
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('/admin/view-category');
            }
            
        });
    }

    if (loading) {
        return <h4>Loading Edit Category...</h4>
    }

    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Edit Category
                        <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end">BACK</Link>
                    </h4>
                </div>
                <div className="card-body">

                    <form onSubmit={updateCategory}>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
                                    <small className="text-danger">{error.name}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Status (checked=Hidden)</label>
                                    <input type="checkbox" name="status" onChange={handleCheckbox} defaultChecked={allcheckbox.status === 1 ? true : false} />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 float-end">Update</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default EditCategory;