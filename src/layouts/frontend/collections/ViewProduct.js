import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container } from "react-bootstrap";
import Footer from '../../../components/frontend/Footer/Footer'
import Card_product from '../../../components/frontend/Card_product';
import Slider from '../../../components/frontend/Slider';
function ViewProduct() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    // const [category, setCategory] = useState([]);
    const location = useLocation();
    // const product_slug = location.state.from;
    const productCount = product.length;
    const id_category = location.state.from[0];
    const nameCategory = location.state.from[1];
    ;
    useEffect(() => {

        let isMounted = true;
        // axios.get(`/api/fetchproducts/${product_slug}`).then(res => {
        //     if (isMounted) {
        //         if (res.data.status === 200) {
        //             setProduct(res.data.product_data.product);
        //             setCategory(res.data.product_data.category);
        //             setLoading(false);
        //         }
        //         else if (res.data.status === 400) {
        //             swal("Warning", res.data.message, "");
        //         }
        //         else if (res.data.status === 404) {
        //             navigate('/collections');
        //             swal("Warning", res.data.message, "error");
        //         }
        //     }
        // });

        axios.get(`/api/categogyproduct/${id_category}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setProduct(res.data.product_data.product);
                    // setCategory(res.data.product_data.category);
                    setLoading(false);
                }
                else if (res.data.status === 400) {
                    swal("Warning", res.data.message, "");
                }
                else if (res.data.status === 404) {
                    navigate('/collections');
                    swal("Warning", res.data.message, "error");
                }
            }
        });

        return () => {
            isMounted = false
        };
    }, [id_category, navigate]);


    if (loading) {
        return <h4>Loading Products...</h4>
    }
    else {
        var showProductList = '';
        if (productCount) {
            < Container >
                <div className="ListItem-content">
                    {
                        showProductList = product.map((item) => {
                            return (
                                <div className="ListItem"><Card_product img={`http://localhost:8000/${item.image}`} description={item.description} id={item.id} name={item.name} price={item.price} /></div>
                            )
                        })
                    }
                </div>
            </Container >
        }
        else {
            showProductList =
                <div className="col-md-12">
                    <h4>Không có sản phẩm theo danh mục {nameCategory}</h4>
                </div>
        }
    }
    return (
        <div>
            <Slider />
            {/* <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Collections / {nameCategory}</h6>
                </div>
            </div> */}
            <div className="for-Male-category">
                Collections / {nameCategory}
            </div>

            < Container >
                <div className="ListItem-content">
                    {showProductList}
                </div>
            </Container >
            <Footer />
        </div>
    );
}
export default ViewProduct;