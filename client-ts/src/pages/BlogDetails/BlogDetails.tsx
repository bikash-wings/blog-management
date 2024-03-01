import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { ClockLoader } from "react-spinners";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

import { host, singleBlogRoute } from "../../utills/apiRoutes";
import { useAppSelector } from "../../store/hooks";

import "./blogdetails.css";

type BlogType = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  views: number;
  thumbnail: string;
};

const BlogDetails = () => {
  const { user } = useAppSelector((state) => state);
  const { blogid } = useParams();

  const [blog, setBlog] = useState<BlogType | {}>({});
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const fetchBlogDetails = async () => {
    try {
      setIsLoad(true);
      const { data } = await axios.get(`${singleBlogRoute}/${blogid}`, {
        headers: { authorization: user?.token },
      });
      setBlog(data.data);
      setIsLoad(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, []);

  return (
    <>
      {isLoad && (
        <ClockLoader
          className="loader"
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      <main className=" details-main">
        {/* <Sidebar /> */}

        <div>
          <Navbar />

          <section className="section container pt-5 mb-2">
            {/* <div className="blog-banner"></div> */}
            {"thumbnail" in blog && (
              <div className="thumbnail-cnt">
                <img
                  src={`${host}/thumbnail/${blog?.thumbnail}`}
                  alt="blog thumbnail"
                />
              </div>
            )}

            <div className="container pt-4">
              <div className="row justify-center">
                <div className="col-slim">
                  <div className="divider-y-8">
                    <div itemScope itemType="https://schema.org/NewsArticle">
                      <a className="d-block mb-4" href="#"></a>
                      {"title" in blog && (
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
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
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
                                  {moment(blog?.createdAt).format(
                                    "DD MMM YYYY"
                                  )}
                                </span>
                              </div>

                              {/* Views icon & count */}
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
                                  className="icon icon-tabler icon-tabler-eye"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  strokeWidth="2"
                                  stroke="currentColor"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                  />
                                  <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                  <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                </svg>
                                <span>{blog?.views} Views</span>
                              </div>

                              {/* Edit Blog button */}
                              {user.user?.permissions.includes(
                                "update-blog"
                              ) && (
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
                              )}
                            </div>
                          </div>

                          {/* Blog Description is below */}
                          <div
                            className="markdown text-muted mt-4"
                            style={{ fontSize: "1rem" }}
                            dangerouslySetInnerHTML={{
                              __html: blog?.description,
                            }}
                          />
                        </div>
                      )}
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
    </>
  );
};

export default BlogDetails;
