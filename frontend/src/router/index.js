// import { headeronly } from '~/component/Layout';
import Home from '~/Pages/Home';
import Products from '~/Pages/Products';
import Profile from '~/Pages/Profile';
import Login from '~/Pages/Login';
import Register from '~/Pages/register';
import Cart from '~/Pages/cart';
import HomeAdmin from '~/Pages/admin/HomeAdmin';
import ProductAdmin from '~/Pages/admin/ProductAdmin';
import Category from '~/Pages/admin/Category';
import PayLoad from '~/Pages/payload';



const publicRoutes = [
    { path: '/', components: Home },
    { path: '/Products', components: Products },
    { path: '/profile', components: Profile },
    { path: '/login', components: Login },
    { path: '/register', components: Register },
    { path: '/cart', components: Cart },
    { path: '/payload', components: PayLoad },

    // Thêm các route cho phần quản trị ở đây
    { path: '/admin/dashboard', components: HomeAdmin, layout: 'admin' },
    { path: '/admin/products', components: ProductAdmin, layout: 'admin' },
    { path: '/admin/category', components: Category, layout: 'admin' }

    // ...
];
const privateRoutes = []
export { publicRoutes, privateRoutes } 