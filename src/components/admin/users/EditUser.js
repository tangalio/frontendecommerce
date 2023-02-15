import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn
} from "mdb-react-ui-kit";
function EditUser() {
    const [loading, setLoading] = useState(true);
    const [viewUser, setViewUser] = useState([]);
    const [errorlist, setError] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const id_user = location.state.from;

    const [allcheckbox, setCheckboxes] = useState([]);
    const handleCheckbox = (e) => {
        e.persist();
        setCheckboxes({ ...allcheckbox, [e.target.name]: e.target.checked });
    }
    useEffect(() => {

        axios.get(`/api/edit-user/${id_user}`).then(res => {
            if (res.data.status === 200) {
                setViewUser(res.data.users);
                setCheckboxes(res.data.users);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('/admin/users');
            }
            setLoading(false);
        });
    }, [id_user, navigate]);

    const updateUser = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('status', allcheckbox.status ? '1' : '0');

        axios.post(`/api/update-user/${id_user}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setError([]);
                navigate('/admin/users');
            }
            else if (res.data.status === 422) {
                swal("All Fields are mandetory", "", "error");
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('/admin/users');
            }
        });
    }
    if (loading) {
        return <h4>Edit User Data Loading...</h4>
    }
    return (
        <section style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-5">
                <div className="card-header">
                    <h4>Edit User
                    </h4>
                </div>
                <form onSubmit={updateUser} encType="multipart/form-data">
                    <MDBRow>
                        <MDBCol lg="4">
                            <MDBCard className="mb-4">
                                <MDBCardBody className="text-center">
                                    <MDBCardImage
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                        alt="avatar"
                                        className="rounded-circle"
                                        style={{ width: '150px' }}
                                        fluid />
                                    <p className="text-muted mb-1">Full Stack Developer</p>
                                    <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>

                                </MDBCardBody>
                            </MDBCard>


                        </MDBCol>
                        <MDBCol lg="8">
                            <MDBCard className="mb-4">
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Name</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{viewUser.name}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Email</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{viewUser.email}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Phone</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{viewUser.phone}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Address</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{viewUser.address}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Status</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <div className="form-group mb-3">
                                                <input type="checkbox" name="status" onChange={handleCheckbox} defaultChecked={allcheckbox.status === 1 ? true : false} />
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>

                            </MDBCard>
                            <div className="d-flex justify-content-center mb-2">
                                <button type="submit" className="btn btn-primary px-4 mt-2">Submit</button>
                            </div>
                        </MDBCol>
                    </MDBRow>

                </form>

            </MDBContainer>
        </section>
    )
}
export default EditUser;