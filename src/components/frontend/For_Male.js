import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card_product from "./Card_product";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function ForMale(props) {
    const [loading, setLoading] = useState(true);
    const [products, setproduct] = useState([]);
    const page = props.page;
    const category = props.category;
    useEffect(() => {
        let isMountered = true;

        axios.get(`api/paging-product?page=` + page).then(res => {
            if (isMountered) {
                if (res.data.status === 200) {
                    setproduct(res.data.products.data);
                    setLoading(false);
                }
            }
        });
        return () => {
            isMountered = false;
        }
    }, [page]);
    if (loading) {
        return <h4>Loading Product...</h4>
    }

    return (

        < Container >
            <div className="for-Male-category">
                {
                    category.map((item, idx) => {
                        return (
                            <Link key={idx} to={`collections/product/${item.name}`} state={{ from: [item.id, item.name] }} >
                                {item.name}
                            </Link>
                        )
                    })
                }
            </div>
            <div className="ListItem-content">
                {
                    products.map((item) => {
                        return (
                            <div className="ListItem"><Card_product img={`http://localhost:8000/${item.image}`} category_id={item.category_id} description={item.description} id={item.id} name={item.name} price={item.price} /></div>
                        )
                    })
                }
            </div>
        </Container >
    );
}

export default ForMale;