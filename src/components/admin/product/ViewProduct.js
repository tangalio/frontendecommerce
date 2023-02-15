import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewProduct() {

    const [loading, setLoading] = useState(true);
    const [viewProduct, setProduct] = useState([]);
    const [viewCategory, setCategory] = useState([]);

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

        axios.get(`/api/view-category`).then(res => {
            if (isMounted) {
                if (res.status === 200) {
                    setCategory(res.data.category)
                    setLoading(false);
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, []);
    const format = (n) => {
        n = new Number(n);
        return n.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    };
    var display_Productdata = "";

    if (loading) {
        return <h4>View Products Loading...</h4>
    }
    else {
        display_Productdata = viewProduct.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    {
                        viewCategory.map((itemcate) => {

                            if (item.category_id == itemcate.id) {
                                return (
                                    <td key={itemcate.id}>{itemcate.name}</td>
                                )
                            }

                        })
                    }
                    <td>{item.name}</td>
                    <td>{format(item.price)}</td>
                    <td><img src={`http://localhost:8000/${item.image}`} width="50px" alt={item.name} /></td>
                    <td>
                        <Link to={`edit-product/${item.id}`} state={{ from: item.id }} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>{item.status === 0 ? 'Visible' : 'Hidden'}</td>
                    <td>
                        <Link to={`add-productsize/${item.id}`} state={{ from: [item.id, item.name] }} className="btn btn-success btn-sm">Add</Link>
                    </td>
                </tr>
            )
        });
    }

    return (
        <div className="container px-4 mt-3">
            <div className="card">
                <div className="card-header">
                    <h4>View Product
                        <Link to="/admin/add-product" className="btn btn-primary btn-sm float-end">Add Product</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Category Name</th>
                                    <th>Product Name</th>
                                    <th>Selling Price</th>
                                    <th>Image</th>
                                    <th>Edit</th>
                                    <th>Status</th>
                                    <th>AddSize</th>
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

export default ViewProduct;