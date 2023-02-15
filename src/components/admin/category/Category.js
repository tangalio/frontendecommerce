import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function Category() {
    const navigate = useNavigate();
    const [categoryInput, setCategory] = useState({
        name: '',
        status: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value })
    }
    const submitCategory = (e) => {
        e.preventDefault();

        const data = {
            name: categoryInput.name,
            status: categoryInput.status,
        }

        axios.post(`api/store-category`, data).then(res => {
            if (res.data.status === 200) {
                e.target.reset();
                swal("Success", res.data.message, "success");
                navigate('/admin/view-category');
            }
            else if (res.data.status === 400) {
                setCategory({ ...categoryInput, error_list: res.data.errors });
                
            }
        });

    }



    return (
        <div className="container-fluid px-4">



            <div className="card mt-4">
                <div className="card-header">
                    <h4>Add Category
                        <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end">View Category</Link>
                    </h4>
                </div>
                <div className="card-body">

                    <form onSubmit={submitCategory} id="CATEGORY_FORM">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Status</label>
                                    <input type="checkbox" name="status" onChange={handleInput} value={categoryInput.status} /> Status 0=shown/1=hidden
                                </div>
                            </div>

                        </div>
                        <button type="submit" className="btn btn-primary px-4 float-end">Submit</button>
                    </form>

                </div>
            </div>
        </div>

    );
}

export default Category;