import { Route, Routes } from "react-router-dom";
import Aboutpage from "./pages/Aboutpage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import Signup from "./pages/auth/signup";
import Signin from "./pages/auth/signin";
import Dashbord from "./pages/user/Dashbord";
import ProtectedRoute from "./component/route/ProtectedRoute";
import ForgetPassword from "./pages/auth/ForgetPassword";
import AdminProtectedRoute from "./component/route/AdminProtectedRoute";
import Order from "./pages/user/Order";
import Profile from "./pages/user/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Products";
import AllOrder from "./pages/admin/AllOrder";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Products from "./pages/admin/Products";
import UpdateAndDeleteProduct from "./pages/admin/UpdateAndDeleteProduct";
import DeatailsProduct from "./pages/ProductDetailPage";
import Searchpage from "./pages/Searchpage";
import Categorypage from "./pages/Categorypage";
import AddToCart from "./component/form/AddToCart";
import AddtoCart from "./pages/AddtoCart";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutpage" element={<Aboutpage />} />
        <Route path="/contactpage" element={<ContactPage />} />
        <Route path="/productdetailpage/:id" element={<DeatailsProduct />} />
        <Route path="/searchpage" element={<Searchpage />} />
        <Route path="/searchpage" element={<Searchpage />} />
        <Route path="/categorypage" element={<Categorypage />} />
        <Route path="/addtocart" element={<AddtoCart />} />
       
        <Route path="/signuppage" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="user" element={<Dashbord />} />
          <Route path="user/order" element={<Order />} />
          <Route path="user/profile" element={<Profile/>} />
        </Route>
        {/* Admin Dashboard Route */}
        <Route path="/dashboard" element={<AdminProtectedRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct/>} />
          <Route path="admin/update-delete-product/:id" element={<UpdateAndDeleteProduct/>} />       
          <Route path="admin/all-orders" element={<AllOrder/>} />
          <Route path="admin/products" element={<Products />} />         
        </Route>
        <Route path="/signinpage" element={<Signin />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
