import Home from '../components/frontend/Home';
import About from '../components/frontend/About';
import Contact from '../components/frontend/Contact';
import ViewProduct from '../layouts/frontend/collections/ViewProduct';
import Cart from '../layouts/frontend/Cart';
import Login from '../components/frontend/pages/login/Login';
import Checkout from '../layouts/frontend/Checkout';
import Thankyou from '../layouts/frontend/Thankyou';
import Product_detail from '../components/frontend/Product_detail';
import SearchProduct from '../components/frontend/SearchProduct';
import Searchnull from '../components/frontend/Searchnull'; 
import UserManager from '../layouts/frontend/collections/UserManager';
import OrderD from '../layouts/frontend/collections/OrderD';
const publicRoutesList = [
    { path: '/', exact: true, name: 'Home', component: Home },
    { path: '/login', exact: true, name: 'Login', component: Login },
    { path: '/about', exact: true, name: 'About', component: About },
    { path: '/contact', exact: true, name: 'Contact', component: Contact },
    { path: '/collections/product/:id', exact: true, name: 'ViewProduct', component: ViewProduct },
    { path: '/product_detail/:product', exact: true, name: 'Product_detail', component: Product_detail },
    { path: '/cart', exact: true, name: 'Cart', component: Cart },
    { path: '/search/:name', exact: true, name: 'SearchProduct', component: SearchProduct },
    { path: '/search/', exact: true, name: 'Searchnull', component: Searchnull },
    { path: '/checkout', exact: true, name: 'Checkout', component: Checkout },
    { path: '/thank-you', exact: true, name: 'Thankyou', component: Thankyou },
    { path: '/users', exact: true, name: 'UserManager', component: UserManager },
    { path: '/users/orderdetail/:id', exact: true, name: 'OrderD', component: OrderD },
];

export default publicRoutesList;