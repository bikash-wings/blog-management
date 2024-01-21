import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup/Signup";
import UsersCatalog from "./pages/UsersCatalog/UsersCatalog";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import Profile from "./pages/Profile/Profile";
import AddBlog from "./pages/AddBlog/AddBlog";
import EditBlog from "./pages/EditBlog/EditBlog";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/add" element={<AddBlog />} />
        <Route path="/blog/:blogid" element={<BlogDetails />} />
        <Route path="/blog/edit/:blogid" element={<EditBlog />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/users" element={<UsersCatalog />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
