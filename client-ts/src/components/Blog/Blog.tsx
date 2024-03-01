import React, { useState } from "react";
import moment from "moment";

import { host } from "../../utills/apiRoutes";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

import "./blog.css";

type BlogProps = {
  blog: {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    createdAt: Date;
    User: {
      fullName: string;
      avatar: string;
    };
    views: number;
  };
};

const Blog = ({ blog }: BlogProps) => {
  const { user } = useAppSelector((state) => state);

  //   const [isHovered, setIsHovered] = useState<boolean>(false);
  //   const [isLoad, setIsLoad] = useState<boolean>(false);

  return (
    <div className="blog">
      <div className="thumb-cnt">
        <img src={`${host}/thumbnail/${blog.thumbnail}`} alt="blog thumbnail" />
      </div>

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
                            stroke-width="2"
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

                    {/* Read more button */}
                    <Link to={`/blogs/${blog?.id}`} className="det-link">
                      Read More
                    </Link>
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
