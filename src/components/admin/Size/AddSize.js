import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
function AddSize() {
    const navigate = useNavigate();
    const [sizeInput, setSize] = useState({
        name: '',
        status: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setSize({ ...sizeInput, [e.target.name]: e.target.value })
    }
    const submitSize = (e) => {
        e.preventDefault();

        const data = {
            name: sizeInput.name,
            status: sizeInput.status,
        }

        axios.post(`api/store-size`, data).then(res => {
            if (res.data.status === 200) {
                e.target.reset();
                swal("Success", res.data.message, "success");
                navigate('/admin/view-size');
            }
            else if (res.data.status === 400) {
                setSize({ ...sizeInput, error_list: res.data.errors });
            }
        });

    }

    var display_errors = [];
    if (sizeInput.error_list) {
        display_errors = [
            sizeInput.error_list.name,
        ]
    }

    return (
        <div className="container-fluid px-4">

            {
                display_errors.map((item) => {
                    return (<p className="mb-1" key={item}>{item}</p>)
                })
            }

            <div className="card mt-4">
                <div className="card-header">
                    <h4>Add Size
                        <Link to="/admin/view-size" className="btn btn-primary btn-sm float-end">View Size</Link>
                    </h4>
                </div>
                <div className="card-body">

                    <form onSubmit={submitSize} id="CATEGORY_FORM">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={sizeInput.name} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Status</label>
                                    <input type="checkbox" name="status" onChange={handleInput} value={sizeInput.status} /> Status 0=shown/1=hidden
                                </div>

                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 float-end">Submit</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default AddSize;