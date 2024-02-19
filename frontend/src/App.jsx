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
import Users from "./pages/admin/Users";
import AllOrder from "./pages/admin/AllOrder";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutpage" element={<Aboutpage />} />
        <Route path="/contactpage" element={<ContactPage />} />
       
        <Route path="/signuppage" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="user" element={<Dashbord />} />
          <Route path="user/order" element={<Order />} />
          <Route path="user/profile" element={<Profile/>} />
        </Route>
        {/* Admin Dashboard Route */}
        <Route path="/dashboard" element={<AdminProtectedRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateProduct />} />
          <Route path="admin/create-product" element={<CreateCategory />} />
          <Route path="admin/all-orders" element={<AllOrder/>} />
          <Route path="admin/users" element={<Users />} />         
        </Route>
        <Route path="/signinpage" element={<Signin />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
