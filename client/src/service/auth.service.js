import axios from "axios"

const API_URL = "http://localhost:3001/user/"

// Register
export const register = async (username, password) => {
  const { data } = await axios.post(API_URL + "register", {
    username,
    password,
  })

  return data
}

// Log in
export const login = async (username, password) => {
  const { data } = await axios.post(API_URL + "login", {
    username,
    password,
  })

  if (data.token) {
    localStorage.setItem("user", JSON.stringify(data))
  }
  return data
}

// Log out
export const logout = () => {
  localStorage.removeItem("user")
  window.location.href = "/"
}

// Get current user
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"))
}
