import "./App.css"
import { useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Upload from "./pages/Upload"
import Profile from "./pages/Profile"
import Auth from "./pages/Auth"
import { getCurrentUser } from "./service/auth.service"
import Context from "./context"

function App() {
  const currentUser = getCurrentUser()

  const [isLoading, setIsLoading] = useState(false)

  // may not need, almost the same as currentUser
  const [user, setUser] = useState(currentUser)

  return (
    <Context.Provider value={{ isLoading, setIsLoading, user, setUser }}>
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
          <Route path="/" element={currentUser ? <Home /> : <Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/upload"
            element={currentUser ? <Upload /> : <Register />}
          />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App
