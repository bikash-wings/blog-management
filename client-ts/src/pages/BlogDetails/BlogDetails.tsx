import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { ClockLoader } from "react-spinners";

import Navbar from "../../components/Navbar/Navbar";

import {
  allBlogsRoute,
  allCommentsRoute,
  deleteCommentRoute,
  host,
  likeToggleRoute,
  postCommentRoute,
  singleBlogRoute,
} from "../../utills/apiRoutes";
import { useAppSelector } from "../../store/hooks";
import { BlogType } from "../../components/Types/blogs";
import { CommentType } from "../../components/Types/comments";

import blogBanner from "../../assets/banner.png";
import userImg from "../../assets/profile.png";
import "./blogdetails.css";
import toast from "react-hot-toast";

const BlogDetails = () => {
  const { user } = useAppSelector((state) => state);
  const { blogid } = useParams();

  const [blog, setBlog] = useState<BlogType | {}>({});
  const [recentBlogs, setRecentBlogs] = useState<BlogType[]>([]);
  const [comment, setComment] = useState<string>("");
  const [allComments, setAllComments] = useState<CommentType[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const fetchBlogDetails = async () => {
    try {
      setIsLoad(true);
      const { data } = await axios.get(`${singleBlogRoute}/${blogid}`, {
        headers: { authorization: user?.token },
      });
      setBlog(data.data);
      setIsLoad(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const fetchRecentBlogs = async () => {
    try {
      const { data } = await axios.get(`${allBlogsRoute}?limit=5`, {
        headers: { authorization: user.token },
      });
      setRecentBlogs(data.data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const postComment = async () => {
    try {
      // const blogid = "id" in blog && blog.id;
      const { data } = await axios.post(
        `${postCommentRoute}/${blogid}`,
        { comment },
        {
          headers: { authorization: user.token },
        }
      );

      if (data.success) {
        setComment("");
        fetchAllComments();
      }
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const fetchAllComments = async () => {
    try {
      // const blogid = "id" in blog && blog.id;
      const { data } = await axios.get(`${allCommentsRoute}/${blogid}`);
      setAllComments(data.data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const toggleBlogLike = async () => {
    try {
      // const blogid = "id" in blog && blog.id;
      const { data } = await axios.post(`${likeToggleRoute}/${blogid}`, null, {
        headers: { authorization: user?.token },
      });

      setBlog(data.data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const deleteComment = async (commentId: number) => {
    try {
      const { data } = await axios.delete(
        `${deleteCommentRoute}/${commentId}`,
        { headers: { authorization: user?.token } }
      );

      toast.success(data.message);
      fetchAllComments();
    } catch (error: any) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
    fetchRecentBlogs();

    return () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }, []);

  useEffect(() => {
    fetchAllComments();
    fetchBlogDetails();
  }, [blogid]);

  return (
    <>
      {isLoad && (
        <ClockLoader
          className="loader"
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      <main className="details-main">
        <Navbar />

        <div className="" style={{ padding: "0 2.2rem" }}>
          <div className="row">
            <section className="section pt-5 mb-2 col-md-8">
              {"thumbnail" in blog && (
                <div className="thumbnail-cnt">
                  <img
                    src={
                      blog.thumbnail
                        ? `${host}/thumbnail/${blog?.thumbnail}`
                        : blogBanner
                    }
                    alt="blog thumbnail"
                  />
                </div>
              )}

              <div className="container pt-4">
                <div className="row justify-center">
                  <div className="col-slim">
                    <div className="divider-y-8">
                      <div itemScope itemType="https://schema.org/NewsArticle">
                        {"title" in blog && (
                          <div className="">
                            <h2
                              className="pt-3 det-link"
                              style={{
                                fontSize: "2rem",
                                width: "max-content",
                              }}
                            >
                              {blog?.title}
                            </h2>

                            {/* Blog date */}
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

                                {/* Likes icon & count */}
                                <div
                                  className="col like"
                                  style={{
                                    marginRight: "3rem",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => toggleBlogLike()}
                                >
                                  {user.user &&
                                  blog?.likes?.includes(user?.user?.id) ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="icon icon-tabler icon-tabler-thumb-up-filled"
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
                                      <path
                                        d="M13 3a3 3 0 0 1 2.995 2.824l.005 .176v4h2a3 3 0 0 1 2.98 2.65l.015 .174l.005 .176l-.02 .196l-1.006 5.032c-.381 1.626 -1.502 2.796 -2.81 2.78l-.164 -.008h-8a1 1 0 0 1 -.993 -.883l-.007 -.117l.001 -9.536a1 1 0 0 1 .5 -.865a2.998 2.998 0 0 0 1.492 -2.397l.007 -.202v-1a3 3 0 0 1 3 -3z"
                                        stroke-width="0"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M5 10a1 1 0 0 1 .993 .883l.007 .117v9a1 1 0 0 1 -.883 .993l-.117 .007h-1a2 2 0 0 1 -1.995 -1.85l-.005 -.15v-7a2 2 0 0 1 1.85 -1.995l.15 -.005h1z"
                                        stroke-width="0"
                                        fill="currentColor"
                                      />
                                    </svg>
                                  ) : (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="icon icon-tabler icon-tabler-thumb-up"
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
                                      <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
                                    </svg>
                                  )}
                                  &nbsp;
                                  <span> {blog?.likes?.length}</span>
                                </div>

                                {/* Edit Blog button */}
                                {user.user?.permissions.includes(
                                  "update-blog"
                                ) && (
                                  <div className="col text-right">
                                    <Link
                                      to={`/blogs/edit/${blog?.id}`}
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
                              style={{
                                fontSize: "1rem",
                                maxWidth: "45rem",
                                overflowWrap: "break-word",
                              }}
                              dangerouslySetInnerHTML={{
                                __html: blog?.description,
                              }}
                            />

                            <div className="d-flex gap-2 align-items-center mt-5">
                              <div className="author-img-cnt">
                                <img
                                  src={
                                    blog.User.avatar === "NULL"
                                      ? userImg
                                      : `${host}/avatar/${blog.User?.avatar}`
                                  }
                                  alt="author profile photo"
                                  style={{
                                    height: "100%",
                                  }}
                                />
                              </div>
                              <div>@{blog.User.fullName}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Recent blogs section */}
            <div className="col-md-4 mt-5 recent-sec">
              <h1>Recent Posts</h1>

              <div className="recent-cnt mt-4">
                {recentBlogs.map((blog) => (
                  <div className="rcnt-blog mt-3">
                    <div className="thumb-cnt">
                      <img
                        src={`${host}/thumbnail/${blog.thumbnail}`}
                        alt="blog thumbnail"
                      />
                    </div>
                    <div className="flex-col">
                      <div style={{ color: "#4d4d4dbe" }}>
                        {moment(blog.createdAt).format("DD MMM YYYY")}
                      </div>
                      <Link
                        to={`/blogs/${blog.id}`}
                        className="det-link"
                        style={{ fontSize: "1rem" }}
                      >
                        {blog.title.substring(0, 25)}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="row px-4">
          {/* Comments section */}
          <section className="section col-md-8 pt-4">
            <h1 className="pb-4">Leave A Comment</h1>
            <textarea
              name=""
              id=""
              cols={98}
              rows={5}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            >
              {comment}
            </textarea>
            <div className="post-btn" onClick={() => postComment()}>
              Post Comment
            </div>
          </section>

          <div className="col-md-4"></div>
        </div>

        {allComments.length ? (
          <div className="container mt-4" style={{ color: "grey" }}>
            {allComments.length} Comments
          </div>
        ) : (
          ""
        )}

        <div className="d-flex gap-4 flex-column container mt-3">
          {allComments.map((cmnt) => (
            <div key={cmnt.id} style={{ maxWidth: "47rem" }}>
              <div className="d-flex gap-2">
                <div className="img-cnt">
                  <img
                    src={
                      cmnt.User.avatar === "NULL"
                        ? userImg
                        : `${host}/avatar/${cmnt.User.avatar}`
                    }
                    alt="user profile photo"
                  />
                </div>
                <div className="flex-column">
                  <div>
                    @{cmnt.User.fullName}{" "}
                    <span style={{ fontSize: ".7rem", color: "grey" }}>
                      {moment(cmnt.createdAt).fromNow()}
                    </span>
                  </div>
                  <div
                    className="d-flex justify-content-between"
                    style={{ width: "40rem" }}
                  >
                    <div style={{ width: "70%", overflowWrap: "break-word" }}>
                      {cmnt.content}
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-trash text-danger cursor-pointer"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      onClick={() => deleteComment(cmnt.id)}
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 7l16 0" />
                      <path d="M10 11l0 6" />
                      <path d="M14 11l0 6" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Blog bottom banner */}
        <section className="section section-light mt-5">
          <svg
            className="section-divider section-divider-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 34"
          >
            <path d="M0 34h1200V0S929.487 24.5 726.977 24.5C524.467 24.5 363.459 0 187.951 0 12.442 0 0 34 0 34Z" />
          </svg>
        </section>
      </main>
    </>
  );
};

export default BlogDetails;
