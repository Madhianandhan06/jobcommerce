import Home from "./pages/Home"
import Contact from "./pages/Contact"
import SearchJobs from "./pages/SearchJobs"
import PostJobs from "./pages/PostJobs"
import Earnings from "./pages/Earnings"
import RootLayout from "./layouts/RootLayout"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="contact" element={<Contact />} />
                <Route path="search-jobs" element={<SearchJobs />} />
                <Route path="post-jobs" element={<PostJobs />} />
                <Route path="earnings" element={<Earnings />} />
            </Route>
        )
    )
  return (
    <div className="bg-slate-600">
        <RouterProvider router={router} />
    </div>  
  )
}

export default App
