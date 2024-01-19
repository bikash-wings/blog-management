import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  allBlogsRoute,
  allUsersRoute,
  deleteBlogRoute,
} from "../../utills/apiRoutes";
import moment from "moment";
import "./datatables.css";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import BlogModal from "../BlogModal/BlogModal";
import { LuPencil } from "react-icons/lu";
import { FaRegEye } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useLocation, useNavigation } from "react-router-dom";

const DataTables = ({ category, modal, setModal }) => {
  const [selectedData, setSelectedData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const path = useLocation().pathname;

  const fetchAllBlogs = async () => {
    try {
      const { data } = await axios.get(allBlogsRoute);
      setSelectedData(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get(allUsersRoute);
      setSelectedData(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (path === "/") {
      fetchAllBlogs();
    } else if (path === "/users") {
      fetchAllUsers();
    }
  }, [path]);

  const deleteBlog = async () => {
    try {
      const { data } = await axios.delete(`${deleteBlogRoute}/${selectedId}`);
      fetchAllBlogs();
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page-body">
      <div className="container-xl">
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
                    <th>
                      <button className="table-sort" data-sort="sort-date">
                        Date
                      </button>
                    </th>
                    <th>
                      <button className="table-sort" data-sort="sort-type">
                        Type
                      </button>
                    </th>
                    <th>
                      <button className="table-sort" data-sort="sort-score">
                        Score
                      </button>
                    </th>
                    <th>
                      <button className="table-sort" data-sort="sort-quantity">
                        Quantity
                      </button>
                    </th>
                    <th>
                      <button className="table-sort" data-sort="sort-city">
                        Actions
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedData.map((item) => (
                    <tr>
                      <td className="sort-name">
                        {(item.title &&
                          item.title.substr(0, 30) +
                            `${item.title.length > 30 && "..."}`) ||
                          item.fullName}
                      </td>
                      <td className="sort-date" data-date={1536285945}>
                        {moment(item.createdAt).format("DD MMM YYYY")}
                      </td>

                      <td className="sort-type">B&amp;M Hyper, Steel</td>
                      <td className="sort-score">98,2%</td>
                      <td className="sort-quantity">111</td>

                      <td className="sort-city">
                        {/* View icon/button */}
                        <Link to={`/blog/${item.id}`}>
                          <svg
                            cursor="pointer"
                            onClick={() => {
                              setModal((p) => ({ ...p, blog: true }));
                              setSelectedId(item.id);
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-eye"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
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
                                class="icon icon-tabler icon-tabler-edit"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                onClick={() => {
                                  setModal((p) => ({ ...p, edit: true }));
                                  setSelectedId(item.id);
                                }}
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
                              class="icon icon-tabler icon-tabler-trash"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
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

                        {modal.confirm && (
                          <ConfirmModal
                            modal={modal}
                            setModal={setModal}
                            deleteBlog={deleteBlog}
                          />
                        )}
                        {(modal.blog || modal.edit) && (
                          <BlogModal
                            modal={modal}
                            setModal={setModal}
                            blogid={selectedId}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTables;
