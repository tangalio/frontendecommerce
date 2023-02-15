import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function ViewUser() {
    const [loading, setLoading] = useState(true);
    const [viewUser, setViewUser] = useState([]);

    useEffect(() => {

        let isMounted = true;

        axios.get(`/api/user/index`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setViewUser(res.data.users);
                    setLoading(false);
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, []);

    var datauser = "";

    if (loading) {
        return <h4>View User Loading...</h4>
    }
    else {
        datauser = viewUser.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>{item.status === 0 ? 'Visible' : 'Hidden'}</td>
                    <td>
                        <Link to={`/admin/edit-users/${item.name}`} state={{ from: item.id }} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                </tr>
            )
        });
    }

    return (
        <div className="container px-4 mt-3">
            <div className="card">
                <div className="card-header">
                    <h4>View User

                    </h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name User</th>
                                    <th>Email User</th>
                                    <th>Phone User</th>
                                    <th>Address User</th>
                                    <th>Status</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datauser}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ViewUser;