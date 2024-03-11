import moment from "moment";

import { host } from "../../utills/apiRoutes";
import { Link } from "react-router-dom";
import { BlogType } from "../Types/blogs";

import blogBanner from "../../assets/banner.png";
import userImg from "../../assets/profile.png";
import "./blog.css";

const Blog = ({ blog }: { blog: BlogType }) => {
  return (
    <div className="blog">
      <Link to={`/blogs/${blog.id}`} className="thumb-cnt">
        <img
          src={
            !blog.thumbnail ? blogBanner : `${host}/thumbnail/${blog.thumbnail}`
          }
          alt="blog thumbnail"
        />
      </Link>

      <div className="blog-details">
        <div className="row justify-center">
          <div className="col-slim">
            <div className="divider-y-8">
              <div itemScope itemType="https://schema.org/NewsArticle">
                <a className="d-block mb-4" href="#"></a>
                {"title" in blog && (
                  <div className="blog-det">
                    {/* Views icon and blog date */}
                    <div className="mt-4 mb-4">
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
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
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
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                            <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                          </svg>
                          <span>{blog?.views} Views</span>
                        </div>

                        {/* Likes icon & count */}
                        <div className="col like">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-thumb-up-filled"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path
                              d="M13 3a3 3 0 0 1 2.995 2.824l.005 .176v4h2a3 3 0 0 1 2.98 2.65l.015 .174l.005 .176l-.02 .196l-1.006 5.032c-.381 1.626 -1.502 2.796 -2.81 2.78l-.164 -.008h-8a1 1 0 0 1 -.993 -.883l-.007 -.117l.001 -9.536a1 1 0 0 1 .5 -.865a2.998 2.998 0 0 0 1.492 -2.397l.007 -.202v-1a3 3 0 0 1 3 -3z"
                              strokeWidth="0"
                              fill="currentColor"
                            />
                            <path
                              d="M5 10a1 1 0 0 1 .993 .883l.007 .117v9a1 1 0 0 1 -.883 .993l-.117 .007h-1a2 2 0 0 1 -1.995 -1.85l-.005 -.15v-7a2 2 0 0 1 1.85 -1.995l.15 -.005h1z"
                              strokeWidth="0"
                              fill="currentColor"
                            />
                          </svg>
                          &nbsp;
                          <span> {blog?.likes?.length}</span>
                        </div>
                      </div>
                    </div>

                    {/* Blog Title */}
                    <Link
                      to={`/blogs/${blog?.id}`}
                      className="det-link"
                      style={{
                        fontSize: "2rem",
                      }}
                    >
                      {blog?.title.substring(0, 1).toUpperCase() +
                        blog?.title.substring(1)}
                    </Link>

                    {/* Blog Description is below */}
                    <div
                      className="markdown text-muted mt-2 mb-3"
                      dangerouslySetInnerHTML={{
                        __html: blog?.description.substring(0, 100) + "...",
                      }}
                    />

                    <div className="d-flex justify-content-between align-items-center mt-4">
                      {/* Author name & profile photo */}
                      <div className="d-flex gap-1 align-items-center">
                        <div className="author-img-cnt">
                          <img
                            src={
                              blog.User.avatar === "NULL"
                                ? userImg
                                : `${host}/avatar/${blog.User?.avatar}`
                            }
                            alt="author profile photo"
                          />
                        </div>
                        <div>@{blog?.User?.fullName}</div>
                      </div>

                      {/* Read more button */}
                      <Link to={`/blogs/${blog?.id}`} className="det-link">
                        Read More
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
