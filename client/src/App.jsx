import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddBlog from "./pages/AddBlog/AddBlog";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup/Signup";
import UsersCatalog from "./pages/UsersCatalog/UsersCatalog";
import BlogDetails from "./pages/BlogDetails/BlogDetails";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/add" element={<AddBlog />} />
        <Route path="/blog/:blogid" element={<BlogDetails />} />
        <Route path="/blog/edit/:blogid" element={<AddBlog />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/users" element={<UsersCatalog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
