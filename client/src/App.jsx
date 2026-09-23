import Home from "./pages/Home"
import Contact from "./pages/Contact"
import SearchJobs from "./pages/SearchJobs"
import PostJobs from "./pages/PostJobs"
import Earnings from "./pages/Earnings"
import RootLayout from "./layouts/RootLayout"
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom"
import Authpage from "./pages/Authpage"
import { useEffect, useState } from "react"
import api from "../api/axios"
import { useAuthStatus } from "./hooks/useAuthStatus"


// Keep the application pages private until the user has authenticated.

function ProtectedRoute({ children }) {
    const { isChecking, isAuthenticated } = useAuthStatus()

    if (isChecking) {
        return <p>Checking authentication...</p>
    }

    return isAuthenticated
        ? children
        : <Navigate to="/" replace />
}

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Authpage />} />
                    <Route path="/home" element={<ProtectedRoute> <RootLayout /> </ProtectedRoute>}>
                    <Route index element={<Home />} />
                    <Route path="search-jobs" element={<SearchJobs />} />
                    <Route path="post-jobs" element={<PostJobs />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="earnings" element={<Earnings />} />
                </Route>
            </>
        )
    )
  return (
    <div className="bg-slate-600">
        <RouterProvider router={router} />
    </div>  
  )
}

export default App
