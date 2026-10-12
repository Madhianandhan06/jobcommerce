import Home from "./pages/Home"
import Contact from "./pages/Contact"
import SearchJobs from "./pages/SearchJobs"
import PostJobs from "./pages/PostJobs"
import RootLayout from "./layouts/RootLayout"
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom"
import Authpage from "./pages/Authpage"
import { useAuthStatus } from "./hooks/useAuthStatus"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
import NotFound from "./pages/NotFound"
import LoadingOverlay from "./components/LoadingOverlay"


// Keep the application pages private until the user has authenticated.

function ProtectedRoute({ children }) {
    const { isChecking, isAuthenticated } = useAuthStatus()

    if (isChecking) {
        return <LoadingOverlay isLoading label="Checking authentication..." className="min-h-screen bg-slate-100" />
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
                    <Route path="earnings" element={<Profile/>} />
                    <Route path="edit-profile" element={<EditProfile/>}/>
                    <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="*" element={<NotFound />} />
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
