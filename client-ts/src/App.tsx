import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home/Home";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import UsersCatalog from "./pages/UsersCatalog/UsersCatalog";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import Profile from "./pages/Profile/Profile";
import AddBlog from "./pages/AddBlog/AddBlog";
import EditBlog from "./pages/EditBlog/EditBlog";
import PrivateRoute from "./components/Routes/PrivateRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import Admin from "./pages/Admin/Admin";
import Chat from "./pages/Chat/Chat";
import Zoom from "./pages/Zoom/Zoom";
import OAuth from "./pages/OAuth/OAuth";

const ZoomProps = {
  meetingNumber: "86522384074",
  role: "0",
  sdkKey: "AhS2gsl9See66nrIm84aRg",
  sdkSecret: "w4S7Uhdhl0jOZ3a408j134s9qurxMhGH",
  leaveUrl: "https://zoom.us",
  userName: "testing",
  userEmail: "demo.wingstech@gmail.com",
  password: "t6hzdY",
};

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blogs/:blogid" element={<BlogDetails />} />
        <Route path="/blogs/add" element={<AddBlog />} />
        <Route path="/blogs/edit/:blogid" element={<EditBlog />} />

        <Route path="/oauth/redirect" element={<OAuth />} />
        <Route
          path="/meeting"
          element={
            <Zoom
              password={ZoomProps.password}
              meetingNumber={ZoomProps.meetingNumber}
              role={ZoomProps.role}
              sdkKey={ZoomProps.sdkKey}
              sdkSecret={ZoomProps.sdkSecret}
              leaveUrl={ZoomProps.leaveUrl}
              userName={ZoomProps.userName}
              userEmail={ZoomProps.userEmail}
            />
          }
        />
        <Route path="/chats" element={<Chat />} />

        {/* Private Routes */}
        <Route path="/admin/*" element={<PrivateRoute />}>
          <Route path="" element={<Admin />} />
          <Route path="users" element={<UsersCatalog />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
