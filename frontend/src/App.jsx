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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutpage" element={<Aboutpage />} />
        <Route path="/contactpage" element={<ContactPage />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/signuppage" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="user" element={<Dashbord />} />
          <Route path="order" element={<Order />} />
          <Route path="profile" element={<Profile/>} />
        </Route>
        <Route path="/dashboard" element={<AdminProtectedRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          
        </Route>
        <Route path="/signinpage" element={<Signin />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
      </Routes>
    </>
  );
}

export default App;
