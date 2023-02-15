import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';


function EditSize() {
    
    const navigate = useNavigate();
    const [sizeInput, setsize] = useState({
        name: '',
    });
    const [errorlist, setError] = useState([]);
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const size_id = location.state.from;
    const handleInput = (e) => {
        e.persist();
        setsize({ ...sizeInput, [e.target.name]: e.target.value });
    }

    const [allcheckbox, setCheckboxes] = useState([]);
    const handleCheckbox = (e) => {
        e.persist();
        setCheckboxes({ ...allcheckbox, [e.target.name]: e.target.checked });
    }
    
    useEffect(() => {
        axios.get(`/api/edit-size/${size_id}`).then(res => {
            if (res.data.status === 200) {
                setsize(res.data.size);
                setCheckboxes(res.data.size);
                
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('/admin/view-size');
            }
            setLoading(false);
        });

    }, [size_id, navigate]);

    const updatesize = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', sizeInput.name);
        formData.append('status', allcheckbox.status ? '1' : '0');

        axios.post(`/api/update-size/${size_id}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setError([]);
                navigate('/admin/view-size');
            }
            else if (res.data.status === 422) {
                swal("All Fields are mandetory", "", "error");
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('/admin/view-size');
            }
        });

    }

    if (loading) {
        return <h4>Edit size Data Loading...</h4>
    }


    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Edit size
                        <Link to="/admin/view-size" className="btn btn-primary btn-sm float-end">View size</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={updatesize} encType="multipart/form-data">

                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={sizeInput.name} className="form-control" />
                                    <small className="text-danger">{errorlist.name}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Status (checked=Hidden)</label>
                                    <input type="checkbox" name="status" onChange={handleCheckbox} defaultChecked={allcheckbox.status === 1 ? true : false} />
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
export default EditSize;