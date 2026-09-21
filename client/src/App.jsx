import Home from "./pages/Home"
import Contact from "./pages/Contact"
import SearchJobs from "./pages/SearchJobs"
import PostJobs from "./pages/PostJobs"
import Earnings from "./pages/Earnings"
import RootLayout from "./layouts/RootLayout"
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom"
import Authpage from "./pages/Authpage"
import { useEffect, useState } from "react"
import API_URL from "./config/api"

// Keep the application pages private until the user has authenticated.
const ProtectedRoute = ({ children }) => {
    const [authState, setAuthState] = useState('checking')

    useEffect(() => {
        // The browser sends the httpOnly cookie automatically with this request.
        fetch(`${API_URL}/api/auth/me`, {
            credentials: 'include',
            cache: 'no-store',
        })
            .then((response) => {
                setAuthState(response.ok ? 'authenticated' : 'unauthenticated')
            })
            .catch(() => {
                setAuthState('unauthenticated')
            })
    }, [])

    // Wait for the server response so a valid cookie is not redirected too early.
    if (authState === 'checking') {
        return <p>Checking authentication...</p>
    }

    return authState === 'authenticated'
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
