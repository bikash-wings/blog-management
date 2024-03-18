/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { ClockLoader } from "react-spinners";

import ConfirmModal from "../ConfirmModal/ConfirmModal";

import {
  allBlogsRoute,
  allUsersRoute,
  blogsCountRoute,
  deleteBlogRoute,
  updateBlogRoute,
  usersCountRoute,
} from "../../utills/apiRoutes";
import { useAppSelector } from "../../store/hooks";
import { BlogType } from "../Types/blogs";
import { UserType } from "../Types/User";

import "./datatables.css";

type DataTablesProp = {
  category: string;
  modal: {
    updateConfirm: boolean;
    confirm: boolean;
  };
  setModal: React.Dispatch<
    React.SetStateAction<{
      updateConfirm: boolean;
      confirm: boolean;
    }>
  >;
};

const DataTables: React.FC<DataTablesProp> = ({
  category,
  modal,
  setModal,
}) => {
  const { user } = useAppSelector((state) => state);
  const path = useLocation().pathname;
  const url = path.split("/").filter((p, i) => {
    if (i !== 0) return p;
  });

  const [selectedData, setSelectedData] = useState<
    [] | BlogType[] | UserType[]
  >([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<{
    blogs: number;
    users: number;
    fetched: number;
  }>({
    blogs: 12,
    users: 12,
    fetched: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchAllBlogs = async () => {
    if (path !== "/admin" || total.fetched >= total.blogs) {
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${allBlogsRoute}?page=${page}&order=ASC&status=Published,Drafted,Active,Inactive`,
        {
          headers: { authorization: user?.token },
        }
      );

      // if (data.data.length > 0) {
      //   window.scroll({
      //     top: 0,
      //     behavior: "smooth",
      //   });
      // }

      setSelectedData((p) => [...p, ...data.data]);
      setTotal((p) => ({ ...p, fetched: p.fetched + data.data.length }));
      setIsLoading(false);
    } catch (error: any) {
      console.error(error.response.data);
    }
  };

  const fetchAllUsers = async () => {
    if (path !== "/admin/users" || total.fetched >= total.users) {
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
    } catch (error: any) {
      console.error(error.response.data);
    }
  };

  const fetchTotalBlogsCount = async () => {
    try {
      const { data } = await axios.get(
        `${blogsCountRoute}?status=Active,Inactive,Published,Drafted`,
        {
          headers: { authorization: user?.token },
        }
      );
      setTotal((p) => ({ ...p, blogs: data.data }));
    } catch (error: any) {
      console.error(error.response.data);
    }
  };

  const fetchTotalUsersCount = async () => {
    try {
      const { data } = await axios.get(usersCountRoute, {
        headers: { authorization: user?.token },
      });
      setTotal((p) => ({ ...p, users: data.data }));
    } catch (error: any) {
      console.error(error.response.data);
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

  const updateBlogStatus = async (blogId: number, newStatus: string) => {
    const formData = new FormData();
    formData.append("status", newStatus);

    try {
      const { data } = await axios.put(
        `${updateBlogRoute}/${blogId}`,
        formData,
        { headers: { authorization: user?.token } }
      );

      selectedData.forEach((blog) => {
        if (blog.id === data.data.id) {
          blog = data.data;
        }
      });
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const onDeleteBlog = async () => {
    try {
      const { data } = await axios.delete(`${deleteBlogRoute}/${selectedId}`, {
        headers: { authorization: user?.token },
      });
      fetchAllBlogs();
      toast.success(data.message);
    } catch (error: any) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    if (path === "/admin") {
      fetchTotalBlogsCount();
    } else {
      fetchTotalUsersCount();
    }

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
                      {path !== "/admin" && (
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

                      {path === "/admin" && (
                        <>
                          <th>
                            <button
                              className="table-sort"
                              data-sort="sort-date"
                            >
                              Status
                            </button>
                          </th>
                          <th>
                            <button
                              className="table-sort"
                              data-sort="sort-date"
                            >
                              Views
                            </button>
                          </th>
                          <th>
                            <button
                              className="table-sort"
                              data-sort="sort-date"
                            >
                              Created by
                            </button>
                          </th>
                        </>
                      )}
                      <th>
                        <button className="table-sort" data-sort="sort-date">
                          Date
                        </button>
                      </th>
                      {path === "/admin" && (
                        <th>
                          <button className="table-sort" data-sort="sort-city">
                            Actions
                          </button>
                        </th>
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {selectedData.map((item: BlogType | UserType) => (
                      <tr>
                        <td className="sort-name">
                          {"title" in item ? (
                            <Link to={`/blogs/${item.id}`}>
                              {" "}
                              {item.title?.substr(0, 30) +
                                `${item.title.length > 30 ? "..." : ""}`}
                            </Link>
                          ) : (
                            item.fullName
                          )}
                        </td>

                        {path === "/admin" && (
                          <>
                            {"status" in item && (
                              <td className="sort-name">
                                <select
                                  onChange={(event) =>
                                    updateBlogStatus(
                                      item.id,
                                      event.target.value
                                    )
                                  }
                                  defaultValue={item?.status}
                                >
                                  <option value="Drafted">Drafted</option>
                                  <option value="Published">Published</option>
                                  <option value="Active">Active</option>
                                  <option value="Inactive">Inactive</option>
                                </select>
                              </td>
                            )}
                            <td className="sort-name">
                              &nbsp; &nbsp;
                              {"views" in item && item.views}
                            </td>
                          </>
                        )}

                        {/* User's listing page items */}
                        {path !== "/admin" && "email" in item && (
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

                        {path === "/admin" && (
                          <td className="sort-date" data-date={1536285945}>
                            {"title" in item ? item.User.fullName : "-"}
                          </td>
                        )}

                        <td className="sort-date" data-date={1536285945}>
                          {moment(item.createdAt).format("DD MMM YYYY")}
                        </td>

                        {path === "/admin" && (
                          <td className="sort-city cta-btn">
                            {/* View icon/button */}
                            {user?.user?.permissions.includes("view-blogs") && (
                              <Link
                                to={`/blogs/${item.id}`}
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
                            )}

                            {category === "/" && (
                              <>
                                {/* Edit icon/button */}
                                {user?.user?.permissions.includes(
                                  "update-blog"
                                ) && (
                                  <Link to={`/blogs/edit/${item.id}`}>
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
                                )}

                                {/* Delete icon/button */}
                                {user.user?.permissions.includes(
                                  "delete-blog"
                                ) && (
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
                                      setModal((p) => ({
                                        ...p,
                                        confirm: true,
                                      }));
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
                                )}
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
