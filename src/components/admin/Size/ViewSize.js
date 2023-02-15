import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
function ViewZise() {
    const [loading, setLoading] = useState(true);
    const [sizelist, setSizelist] = useState([]);

    useEffect(() => {
        let isMounted = true;

        axios.get(`/api/view-size`).then(res => {
            if (isMounted) {
                if (res.status === 200) {
                    setSizelist(res.data.size)
                    setLoading(false);
                }
            }
        });

        return () => {
            isMounted = false
        };

    }, []);

    const deleteSize = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-size/${id}`).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                thisClicked.closest("tr").remove();
            }
            else if (res.data.status === 404) {
                swal("Success", res.data.message, "success");
                thisClicked.innerText = "Delete";
            }
        });

    }

    var viewsize_HTMLTABLE = "";
    if (loading) {
        return <h4>Loading Size...</h4>
    }
    else {
        viewsize_HTMLTABLE =
            sizelist.map((item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.status}</td>
                        <td>
                            <Link to={`edit-size/${item.id}`} state={{ from: item.id }} className="btn btn-success btn-sm">Edit</Link>
                        </td>
                        <td>
                            <button type="button" onClick={(e) => deleteSize(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                )
            });
    }

    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Size List
                        <Link to="/admin/add-size" className="btn btn-primary btn-sm float-end">Add Size</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewsize_HTMLTABLE}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default ViewZise;