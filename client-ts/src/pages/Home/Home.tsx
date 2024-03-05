import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Blog from "../../components/Blog/Blog";
import Navbar from "../../components/Navbar/Navbar";

import { allBlogsRoute, blogsCountRoute } from "../../utills/apiRoutes";
import { useAppSelector } from "../../store/hooks";
import { BlogType } from "../../components/Types/blogs";

import "./home.css";

const Home = () => {
  const { user } = useAppSelector((state) => state);

  const [allBlogs, setAllBlogs] = useState<BlogType[] | []>([]);
  const [total, setTotal] = useState<{ blogs: number; fetched: number }>({
    blogs: 4,
    fetched: 0,
  });
  const [page, setPage] = useState<number>(1);

  const fetchAllBlogs = async () => {
    try {
      const { data } = await axios.get(
        `${allBlogsRoute}?page=${page}&limit=4`,
        {
          headers: {
            authorization: user.token,
          },
        }
      );

      setAllBlogs((p) => [...p, ...data.data]);
      setTotal((p) => ({ ...p, fetched: p.fetched + data.data.length }));
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  const fetchTotalBlogsCount = async () => {
    try {
      const { data } = await axios.get(blogsCountRoute, {
        headers: { authorization: user?.token },
      });
      setTotal((p) => ({ ...p, blogs: data.data }));
    } catch (error: any) {
      console.log(error.resposne.data);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight &&
      total.fetched < total.blogs
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    // fetchAllBlogs();
    fetchTotalBlogsCount();
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }, []);

  useEffect(() => {
    if (total.fetched < total.blogs) {
      fetchAllBlogs();
    }
  }, [page]);

  return (
    <div className="home-cnt">
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
