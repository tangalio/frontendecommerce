import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
// import Card_product from '../../components/frontend/Card_product';
import Card_product from '../../components/frontend/Card_product';
import { Container } from "react-bootstrap";
import Footer from './Footer/Footer';
function SearchProduct() {
    const location = useLocation();
    const navigate = useNavigate();
    const nameProduct = location.state.from;
    const [loading, setLoading] = useState(true);
    const [SearchProduct, setSearchProduct] = useState([]);
    useEffect(() => {
        // if (nameProduct == null) {
        //     navigate('/');
        // }
        axios.get(`/api/searchByName/${nameProduct}`).then(res => {
            if (res.data.status === 200) {
                setSearchProduct(res.data.product.data);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('/');
            } else {
                navigate('sssss');
            }
            setLoading(false);
        });

    }, [nameProduct, navigate]);

    if (loading) {
        return <h4>Search Product Data Loading...</h4>
    }
    else {
        var showSearchProduct = '';
        if (SearchProduct) {
            < Container >
                <div className="ListItem-content">
                    {
                        showSearchProduct = SearchProduct.map((item) => {
                            return (
                                <div className="ListItem">
                                    <Card_product img={`http://localhost:8000/${item.image}`} description={item.description} id={item.id} name={item.name} price={item.price} />
                                </div>
                            )
                        })
                    }
                </div>
            </Container >
        }
        else {
            showSearchProduct =
                <div className="col-md-12">
                    <h4>Không có sản phẩm có tên {nameProduct}</h4>
                </div>
        }
    }

    return (
        <div>
            <h3>Sản phẩm có tên {nameProduct}</h3>
            < Container >
                <div className="ListItem-content">
                    {showSearchProduct}
                </div>
            </Container >
            <Footer/>
        </div>

    )
}
export default SearchProduct;