import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddBlog from "./pages/AddBlog/AddBlog";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup/Signup";
import UsersCatalog from "./pages/UsersCatalog/UsersCatalog";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import Profile from "./pages/Profile/Profile";
import Add from "./pages/AddBlog/Add";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/add" element={<Add />} />
        <Route path="/blog/:blogid" element={<BlogDetails />} />
        <Route path="/blog/edit/:blogid" element={<Add />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/users" element={<UsersCatalog />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
