import "./App.css"
import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Upload from "./pages/Upload"
import Profile from "./pages/Profile/Profile"
import Auth from "./pages/Auth"
import { getCurrentUser } from "./service/auth.service"
import Context from "./context"

// loading (component)
// private route (component)

// const [selectedPost, setSelectedPost] = useState(false);
// <Context.Provider value={{ ... selectedPost, setSelectedPost }}>

function App() {
  const currentUser = getCurrentUser()

  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(currentUser)
  const [hasNewPost, setHasNewPost] = useState(false)
  //const [selectedPost, setSelectedPost] = useState(false)

  // Check if it's really needed
  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <Context.Provider
      value={{
        isLoading,
        setIsLoading,
        user,
        setUser,
        hasNewPost,
        setHasNewPost,
      }}
    >
      <BrowserRouter>
        <div className="App">
          <div className="blur" style={{ top: "-18%", right: "0" }}></div>
          <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
          {/* <Home /> */}
          {/* <Profile /> */}
          {/* <Auth /> */}
        </div>
        {/* <Navbar /> */}

        {/* Create Pivate Route */}
        <Routes>
          <Route path="/" element={currentUser ? <Home /> : <Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile/:id"
            element={currentUser ? <Profile /> : <Register />}
          />

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
