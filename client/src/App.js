import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Upload from "./pages/Upload"
import Profile from "./pages/Profile"
import Auth from "./pages/Auth"
import { getCurrentUser } from "./service/auth.service"

function App() {
  const user = getCurrentUser()

  return (
    <BrowserRouter>
      <div className="App">
        <div className="blur" style={{ top: "-18%", right: "0" }}></div>
        <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
        {/* <Home /> */}
        {/* <Profile /> */}
        {/* <Auth /> */}
      </div>
      {/* <Navbar /> */}

      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/upload" element={user ? <Upload /> : <Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
