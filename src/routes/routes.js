import Category from "../components/admin/category/Category";
import ViewCategory from "../components/admin/category/ViewCategory";
import EditCategory from "../components/admin/category/EditCategory";
import Dashboard from "../components/admin/Dashboard";
import AddProduct from "../components/admin/product/AddProduct";
import ViewProduct from "../components/admin/product/ViewProduct";
import EditProduct from "../components/admin/product/EditProduct";
import ViewSize from "../components/admin/Size/ViewSize";
import AddSize from "../components/admin/Size/AddSize";
import EditSize from "../components/admin/Size/EditSize";
import AddProductSize from "../components/admin/productsize/AddProductSize";
import ViewProductSize from "../components/admin/productsize/ViewProductSize";
import EditProductSize from "../components/admin/productsize/EditProductSize";
import Order from "../components/admin/order/Order";
import ViewOrder from "../components/admin/order/ViewOrder";
import ViewUser from "../components/admin/users/ViewUser";
import EditUser from "../components/admin/users/EditUser";

const routes = [
    { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/admin/add-category', exact: true, name: 'Category', component: Category },
    { path: '/admin/view-category', exact: true, name: 'ViewCategory', component: ViewCategory },
    { path: '/admin/view-category/edit-category/:id', exact: true, name: 'EditCategory', component: EditCategory },
    { path: '/admin/add-product', exact: true, name: 'AddProduct', component: AddProduct },
    { path: '/admin/view-product', exact: true, name: 'ViewProduct', component: ViewProduct },
    { path: '/admin/view-product/edit-product/:id', exact: true, name: 'EditProduct', component: EditProduct },
    { path: '/admin/view-size', exact: true, name: 'ViewSize', component: ViewSize },
    { path: '/admin/view-size/edit-size/:id', exact: true, name: 'EditSize', component: EditSize },
    { path: '/admin/add-size', exact: true, name: 'AddSize', component: AddSize },
    { path: '/admin/view-productsize', exact: true, name: 'ViewProductSize', component: ViewProductSize },
    { path: '/admin/view-product/add-productsize/:id', exact: true, name: 'AddProductSize', component: AddProductSize },
    { path: '/admin/view-productsize/edit-productsize/:id', exact: true, name: 'EditProductSize', component: EditProductSize },
    { path: '/admin/orders', exact: true, name: 'Order', component: Order },
    { path: '/admin/view-order/:id', exact: true, name: 'ViewOrder', component: ViewOrder },
    { path: '/admin/users', exact: true, name: 'ViewUser', component: ViewUser },
    { path: '/admin/edit-users/:name', exact: true, name: 'EditUser', component: EditUser },
];
export default routes;