import {Route, Routes} from "react-router-dom"
import Aboutpage from "./pages/Aboutpage"
import ContactPage from "./pages/ContactPage"
import HomePage from "./pages/HomePage"
import PageNotFound from "./pages/PageNotFound"
import Signup from "./pages/auth/signup"
import Signin from "./pages/auth/signin"

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/aboutpage" element={<Aboutpage/>}/>
          <Route path="/contactpage" element={<ContactPage/>}/>
          <Route path="/pagenotfound" element={<PageNotFound/>}/>
          <Route path="/signuppage" element={<Signup/>}/>
          <Route path="/signinpage" element={<Signin/>}/>
          
        </Routes>
    </>
  )
}

export default App
