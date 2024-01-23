import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import { allBlogsRoute, singleBlogRoute } from "../../utills/apiRoutes";
import { Link, useParams } from "react-router-dom";
import banner from "../../assets/banner.png";
import moment from "moment";
import "./blogdetails.css";
import Navbar from "../../components/Navbar/Navbar";

const BlogDetails = () => {
  const [similarBlogs, setSimilarBlogs] = useState([]);
  const [blog, setBlog] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  const [modal, setModal] = useState({
    blog: false,
    login: false,
    updateConfirm: false,
    edit: false,
    confirm: false,
  });

  const { blogid } = useParams();

  const fetchBlogDetails = async () => {
    try {
      const { data } = await axios.get(`${singleBlogRoute}/${blogid}`);
      setBlog(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSimilarBlogs = async () => {
    try {
      const { data } = await axios.get(allBlogsRoute);
      setSimilarBlogs(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
    fetchSimilarBlogs();
  }, []);

  return (
    <main className=" details-main">
      <Sidebar />

      <div>
        <Navbar modal={modal} setModal={setModal} />

        <section className="section container-xl">
          <div className="blog-banner"></div>

          <div className="container">
            <div className="row justify-center">
              <div className="col-slim">
                <div className="divider-y-8">
                  <div itemScope itemType="https://schema.org/NewsArticle">
                    <a className="d-block mb-4" href="#"></a>
                    <div className="">
                      <h2
                        style={{
                          fontSize: "2rem",
                          cursor: "pointer",
                          color: isHovered ? "#1e73be" : "black",
                          transition: "color 0.5s ease",
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        {blog?.title}
                      </h2>

                      {/* Edit button and blog date */}
                      <div className="mt-4 ">
                        <div className="row">
                          <div
                            className="col"
                            style={{
                              color: "#1e73be",
                              fontSize: "1rem",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-calendar-month"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                              <path d="M16 3v4" />
                              <path d="M8 3v4" />
                              <path d="M4 11h16" />
                              <path d="M7 14h.013" />
                              <path d="M10.01 14h.005" />
                              <path d="M13.01 14h.005" />
                              <path d="M16.015 14h.005" />
                              <path d="M13.015 17h.005" />
                              <path d="M7.01 17h.005" />
                              <path d="M10.01 17h.005" />
                            </svg>
                            <span>
                              {moment(blog?.createdAt).format("DD MMM YYYY")}
                            </span>
                          </div>
                          <div className="col text-right">
                            <Link
                              to={`/blog/edit/${blog?.id}`}
                              aria-label="edit blog link"
                            >
                              Edit Blog{" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-arrow-right icon"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M5 12l14 0" />
                                <path d="M13 18l6 -6" />
                                <path d="M13 6l6 6" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Blog Description is below */}
                      <div
                        className="markdown text-muted mt-4"
                        style={{ fontSize: "1rem" }}
                        dangerouslySetInnerHTML={{ __html: blog?.description }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section section-light mt-5">
          <svg
            className="section-divider section-divider-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 34"
          >
            <path d="M0 34h1200V0S929.487 24.5 726.977 24.5C524.467 24.5 363.459 0 187.951 0 12.442 0 0 34 0 34Z" />
          </svg>
        </section>
      </div>
    </main>
  );
};

export default BlogDetails;
