import React, { useState, useEffect, usePage } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Slider from '../../components/frontend/Slider';
import Banner from '../../components/frontend/Banner';
import ForMale from '../../components/frontend/For_Male';
import NewProduct from '../../components/frontend/New_Product';
import Paging from '../../components/frontend/Paging';
import { Container } from 'react-bootstrap';
import './styles/Main_styles.css';
import Footer from './Footer/Footer';
function Home() {
    const [loading, setLoading] = useState(true);
    const [products, setproduct] = useState([]);
    const [links, setlinks] = useState([]);
    const [hasMany, sethasMany] = useState([]);
    const [category, setCategory] = useState([]);
    useEffect(() => {
        let isMountered = true;

        axios.get(`api/paging-product`).then(res => {
            if (isMountered) {
                if (res.data.status === 200) {
                    setproduct(res.data.products.data);
                    setlinks(res.data.products.links);

                    setLoading(false);

                }
            }
        });
        axios.get(`api/hasMany-product`).then(res => {
            if (isMountered) {
                if (res.data.status === 200) {
                    sethasMany(res.data.products.data);
                    setLoading(false);
                }
            }
        });
        axios.get(`/api/getCategory`).then(res => {
            if (isMountered) {
                if (res.data.status === 200) {
                    setCategory(res.data.category);
                    setLoading(false);
                }
            }
        });
        return () => {
            isMountered = false;
        }
    }, []);
    const [product_id, setproduct_id] = useState("");
    const parent = (childData) => {
        setproduct_id(childData);
    }
    return (
        <div>
            <Container fluid>
                <Slider />
                <Banner />
                <NewProduct hasMany={hasMany} />
                <ForMale category={category} page={product_id} />
                <Paging han={parent} links={links} />
            </Container >
            <Footer />
        </div>
    )
}
export default Home;