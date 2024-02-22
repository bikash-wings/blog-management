import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { ClockLoader } from "react-spinners";

import ConfirmModal from "../ConfirmModal/ConfirmModal";

import {
  allBlogsRoute,
  allUsersRoute,
  blogsCountRoute,
  deleteBlogRoute,
} from "../../utills/apiRoutes";

import "./datatables.css";

const DataTables = ({ category, modal, setModal }) => {
  let { user } = useSelector((state) => state.user);
  const path = useLocation().pathname;
  const url = path.split("/").filter((p, i) => {
    if (i !== 0) return p;
  });
  console.log("path: ", path, " url: ", url);

  const [selectedData, setSelectedData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState({ blogs: 12, fetched: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllBlogs = async () => {
    if (path !== "/" || total.fetched >= total.blogs) {
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await axios.get(`${allBlogsRoute}?page=${page}`);

      // if (data.data.length > 0) {
      //   window.scroll({
      //     top: 0,
      //     behavior: "smooth",
      //   });
      // }

      setSelectedData((p) => [...p, ...data.data]);
      setTotal((p) => ({ ...p, fetched: p.fetched + data.data.length }));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllUsers = async () => {
    if (path !== "/users" || total.fetched >= total.blogs) {
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await axios.get(`${allUsersRoute}?page=${page}`, {
        headers: { authorization: user?.token },
      });
      setSelectedData((p) => [...p, ...data.data]);
      setTotal((p) => ({ ...p, fetched: p.fetched + data.data.length }));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTotalBlogsCount = async () => {
    try {
      const { data } = await axios.get(blogsCountRoute);
      setTotal((p) => ({ ...p, blogs: data.data }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const onDeleteBlog = async () => {
    try {
      const { data } = await axios.delete(`${deleteBlogRoute}/${selectedId}`, {
        headers: { authorization: user.token },
      });
      fetchAllBlogs();
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTotalBlogsCount();

    // handleScroll event listener on scroll event
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (total.fetched < total.blogs) {
      fetchAllBlogs();
    }

    fetchAllUsers();
  }, [page]);

  return (
    <>
      {isLoading && (
        <ClockLoader
          className="loader"
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}

      <div className="page-body">
        <div className="container-xl">
          <div className="bread-crumb">
            <Link to="/">Home </Link>
            {url?.map((u) => (
              <>
                <span>/</span>
                <Link to={`/${u}`}>
                  {" "}
                  {u.substr(0, 1).toUpperCase() + u.substr(1)}
                </Link>
              </>
            ))}
          </div>
          <div className="card">
            <div className="card-body">
              <div id="table-default" className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        <button className="table-sort" data-sort="sort-name">
                          {category === "blogs" ? "title" : "Name"}
                        </button>
                      </th>
                      {path !== "/" && (
                        <>
                          <th>
                            <button
                              className="table-sort"
                              data-sort="sort-quantity"
                            >
                              Phone
                            </button>
                          </th>

                          <th>
                            <button
                              className="table-sort"
                              data-sort="sort-type"
                            >
                              Email
                            </button>
                          </th>

                          <th>
                            <button
                              className="table-sort"
                              data-sort="sort-type"
                            >
                              Verified
                            </button>
                          </th>

                          <th>
                            <button
                              className="table-sort"
                              data-sort="sort-score"
                            >
                              Address
                            </button>
                          </th>
                        </>
                      )}

                      {path === "/" && (
                        <th>
                          <button className="table-sort" data-sort="sort-date">
                            Created by
                          </button>
                        </th>
                      )}
                      <th>
                        <button className="table-sort" data-sort="sort-date">
                          Date
                        </button>
                      </th>
                      {path === "/" && (
                        <th>
                          <button className="table-sort" data-sort="sort-city">
                            Actions
                          </button>
                        </th>
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {selectedData.map((item) => (
                      <tr>
                        <td className="sort-name">
                          {item.title ? (
                            <Link to={`/blog/${item.id}`}>
                              {" "}
                              {item.title?.substr(0, 30) +
                                `${item.title.length > 30 ? "..." : ""}`}
                            </Link>
                          ) : (
                            item.fullName
                          )}
                        </td>
                        {item.email && (
                          <>
                            <td className="sort-quantity">
                              {item?.phone || "-"}
                            </td>
                            <td className="sort-type">{item?.email}</td>
                            <td className="sort-type">
                              {item?.isVerified ? "True" : "False"}
                            </td>
                            <td className="sort-score">
                              {item?.address || "-"}
                            </td>
                          </>
                        )}

                        {path === "/" && (
                          <td className="sort-date" data-date={1536285945}>
                            {item.User ? item.User.fullName : "-"}
                          </td>
                        )}

                        <td className="sort-date" data-date={1536285945}>
                          {moment(item.createdAt).format("DD MMM YYYY")}
                        </td>

                        {path === "/" && (
                          <td className="sort-city cta-btn">
                            {/* View icon/button */}
                            <Link
                              to={`/blog/${item.id}`}
                              style={{ marginRight: "10px" }}
                            >
                              <svg
                                cursor="pointer"
                                onClick={() => {
                                  setModal((p) => ({ ...p, blog: true }));
                                  setSelectedId(item.id);
                                }}
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
                            </Link>

                            {/* Edit icon/button */}
                            {category === "/" && (
                              <>
                                <Link to={`/blog/edit/${item.id}`}>
                                  <svg
                                    cursor="pointer"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-edit"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    onClick={() => {
                                      setModal((p) => ({ ...p, edit: true }));
                                      setSelectedId(item.id);
                                    }}
                                    style={{ marginRight: "10px" }}
                                  >
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    />
                                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                                    <path d="M16 5l3 3" />
                                  </svg>
                                </Link>

                                {/* Delete icon/button */}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="icon icon-tabler icon-tabler-trash"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  strokeWidth="2"
                                  stroke="currentColor"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  cursor="pointer"
                                  onClick={() => {
                                    setModal((p) => ({ ...p, confirm: true }));
                                    setSelectedId(item.id);
                                  }}
                                >
                                  <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                  />
                                  <path d="M4 7l16 0" />
                                  <path d="M10 11l0 6" />
                                  <path d="M14 11l0 6" />
                                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                </svg>
                              </>
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>

                {modal.confirm && (
                  <ConfirmModal
                    modal={modal}
                    setModal={setModal}
                    onDeleteBlog={onDeleteBlog}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataTables;
