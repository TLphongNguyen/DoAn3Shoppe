// import { headeronly } from '~/component/Layout';
import Home from '~/Pages/Home';
import Products from '~/Pages/Products';
import Profile from '~/Pages/Profile';
import Login from '~/Pages/Login';
import Register from '~/Pages/register';
import Cart from '~/Pages/cart';
import SearchResult from '~/Pages/searchResult';
import HomeAdmin from '~/Pages/admin/HomeAdmin';
import ProductAdmin from '~/Pages/admin/ProductAdmin';
import Category from '~/Pages/admin/Category';
import PayLoad from '~/Pages/payload';
import Bills from '~/Pages/admin/bills';
import Supplier from '~/Pages/admin/Supplier';
import ImportBills from '~/Pages/admin/importBills';



const publicRoutes = [
    { path: '/', components: Home },
    { path: '/Products', components: Products },
    { path: '/profile', components: Profile },
    { path: '/login', components: Login },
    { path: '/register', components: Register },
    { path: '/cart', components: Cart },
    { path: '/payload', components: PayLoad },
    { path: '/searchResult', components: SearchResult },



    // Thêm các route cho phần quản trị ở đây
    { path: '/admin/dashboard', components: HomeAdmin, layout: 'admin' },
    { path: '/admin/products', components: ProductAdmin, layout: 'admin' },
    { path: '/admin/category', components: Category, layout: 'admin' },
    { path: '/admin/supplier', components: Supplier, layout: 'admin' },
    { path: '/admin/bills', components: Bills, layout: 'admin' },
    { path: '/admin/importbills', components: ImportBills, layout: 'admin' }


    // ...
];
const privateRoutes = []
export { publicRoutes, privateRoutes } 