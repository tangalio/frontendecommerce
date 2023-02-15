import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewProductSize() {
    const [loading, setLoading] = useState(true);
    const [viewProduct, setProduct] = useState([]);
    const [sizelist, setSizelist] = useState([]);
    const [viewProductsize, setProductsize] = useState([]);

    useEffect(() => {

        let isMounted = true;
        document.title = "View Product";

        axios.get(`/api/view-product`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setProduct(res.data.products);
                    setLoading(false);
                }
            }
        });
        axios.get(`/api/view-size`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setSizelist(res.data.size);
                    setLoading(false);
                }
            }
        });

        axios.get(`/api/view-productsize`).then(res => {
            if (isMounted) {
                if (res.status === 200) {
                    setProductsize(res.data.product_size)
                    setLoading(false);
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, []);

    var display_Productdata = "";

    if (loading) {
        return <h4>View Products Loading...</h4>
    }
    else {
        display_Productdata = viewProductsize.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    {
                        viewProduct.map((itemproduc) => {

                            if (item.product_id == itemproduc.id) {
                                return (
                                    <td key={itemproduc.id}>{itemproduc.name}</td>
                                )
                            }

                        })
                    }
                    {
                        sizelist.map((itemsize) => {

                            if (item.size_id == itemsize.id) {
                                return (
                                    <td key={itemsize.id}>{itemsize.name}</td>
                                )
                            }

                        })
                    }
                    <td>{item.quantity}</td>
                    <td>
                        <Link to={`edit-productsize/${item.id}`} state={{ from: item.id }} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>{item.status === 0 ? 'Visible' : 'Hidden'}</td>
                </tr>
            )
        });
    }
    return (
        <div className="container px-4 mt-3">
            <div className="card">
                <div className="card-header">
                    <h4>View Product</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product Name</th>
                                    <th>Size Name</th>
                                    <th>Quantity</th>
                                    <th>Edit</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {display_Productdata}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ViewProductSize;