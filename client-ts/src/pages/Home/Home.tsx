import { useEffect, useState } from "react";
import axios from "axios";

import Blog from "../../components/Blog/Blog";

import { allBlogsRoute } from "../../utills/apiRoutes";
import { useAppSelector } from "../../store/hooks";

import logo from "../../assets/logo.png";
import "./home.css";
import Navbar from "../../components/Navbar/Navbar";

type BlogType = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  views: number;
  thumbnail: string;
  User: {
    fullName: string;
    avatar: string;
  };
};

const Home = () => {
  const { user } = useAppSelector((state) => state);

  const [allBlogs, setAllBlogs] = useState<BlogType[] | []>([]);

  const fetchAllBlogs = async () => {
    try {
      const { data } = await axios.get(allBlogsRoute, {
        headers: {
          authorization: user.token,
        },
      });

      setAllBlogs(data.data);
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  return (
    <div className="home-cnt">
      {/* <header
        className="navbar-expand-md sticky-top d-print-none"
        style={{ zIndex: 1000, backgroundColor: "#fff" }}
      >
        <div className="container">
          <img src={logo} alt="logo" height={60} />
        </div>
      </header> */}
      <Navbar />

      <div className="blogs-cnt">
        {allBlogs.map((blog) => (
          <Blog blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Home;
