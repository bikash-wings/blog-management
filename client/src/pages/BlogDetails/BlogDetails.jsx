import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import { singleBlogRoute } from "../../utills/apiRoutes";
import { Link, useParams } from "react-router-dom";
import banner from "../../assets/banner.png";
import moment from "moment";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});

  const { blogid } = useParams();

  const fetchBlogDetails = async () => {
    try {
      const { data } = await axios.get(`${singleBlogRoute}/${blogid}`);
      setBlog(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, []);

  return (
    <div className="container-xl">
      <Sidebar />

      <main className="main">
        <section className="section">
          <div className="page-header">
            <div className="hero-gradient">
              <h2 className="page-title page-title-lg">Blog</h2>
              <p className="page-description">
                Stay in the loop with all things{" "}
                <a className="active" href="/">
                  Tabler
                </a>{" "}
                and{" "}
                <a className="" href="/icons">
                  Tabler Icons
                </a>
                . Regular updates on new features, changelogs, and news,
                ensuring you never miss any of our software developments.
              </p>
            </div>
          </div>
          <div className="container">
            <div className="row justify-center">
              <div className="col-slim">
                <div className="divider-y-8">
                  <div itemScope itemType="https://schema.org/NewsArticle">
                    <a className="d-block mb-4" href="#">
                      <img
                        alt="New Year, New Goals: Tabler Development in 2024"
                        itemProp="image"
                        loading="lazy"
                        width={750}
                        height={361}
                        decoding="async"
                        data-nimg={1}
                        className="img-markdown"
                        style={{ color: "transparent" }}
                        // srcSet="/_next/image?url=%2Fimg%2Fblog%2Fnew-year-new-goals.png&w=750&q=75 1x, /_next/image?url=%2Fimg%2Fblog%2Fnew-year-new-goals.png&w=1920&q=75 2x"
                        src={banner}
                      />
                    </a>
                    <div>
                      <h2>
                        <meta
                          itemProp="headline"
                          content="New Year, New Goals: Tabler Development in 2024"
                        />
                        <meta
                          itemProp="url"
                          content="/blog/new-year-new-goals"
                        />
                        <a className="" href="#">
                          {blog?.title}
                        </a>
                      </h2>
                      <div
                        className="markdown text-muted"
                        dangerouslySetInnerHTML={{ __html: blog?.description }}
                      />
                      {/* {blog?.description}
                      </div> */}
                    </div>
                    <div className="mt-4">
                      <div className="row">
                        <div className="col">
                          <meta itemProp="datePublished" content="2024-01-01" />
                          <div className="text-muted">
                            {moment(blog?.createdAt).format("DD MMM YYYY")}
                          </div>
                        </div>
                        <div className="col text-right">
                          <Link
                            className=""
                            aria-label='Read more about "New Year, New Goals: Tabler Development in 2024"'
                            to={`/blog/edit/${blog?.id}`}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section section-light">
          <svg
            className="section-divider section-divider-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 34"
          >
            <path d="M0 34h1200V0S929.487 24.5 726.977 24.5C524.467 24.5 363.459 0 187.951 0 12.442 0 0 34 0 34Z" />
          </svg>
        </section>
      </main>
    </div>
  );
};

export default BlogDetails;
