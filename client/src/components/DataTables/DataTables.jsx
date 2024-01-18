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

const DataTables = ({ category, modal, setModal }) => {
  const [selectedData, setSelectedData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const fetchAllBlogs = async () => {
    try {
      const { data } = await axios.get(allBlogsRoute);
      setSelectedData(data);
      console.log(data);
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
    if (category === "blogs") {
      fetchAllBlogs();
    } else if (category === "users") {
      fetchAllUsers();
    }
  }, [category]);

  const deleteBlog = async () => {
    try {
      const { data } = await axios.delete(`${deleteBlogRoute}/${selectedId}`);
      fetchAllBlogs();
      console.log(data);
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
                      <button className="table-sort" data-sort="sort-city">
                        Actions
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
                      <button className="table-sort" data-sort="sort-progress">
                        Progress
                      </button>
                    </th>
                  </tr>
                </thead>
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
                    {/* <td className="sort-city"> */}
                    {/* View icon/button */}
                    <FaRegEye
                      onClick={() => {
                        setModal((p) => ({ ...p, blog: true }));
                        setSelectedId(item.id);
                      }}
                    />

                    {/* Edit icon/button */}
                    <LuPencil
                      onClick={() => {
                        setModal((p) => ({ ...p, edit: true }));
                        setSelectedId(item.id);
                      }}
                    />

                    {/* Delete icon/button */}
                    <MdDeleteOutline
                      onClick={() => {
                        setModal((p) => ({ ...p, confirm: true }));
                        setSelectedId(item.id);
                      }}
                    />

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
                    {/* </td> */}
                    <td className="sort-type">B&amp;M Hyper, Steel</td>
                    <td className="sort-score">98,2%</td>
                    <td className="sort-quantity">111</td>
                    <td className="sort-progress" data-progress={24}>
                      <div className="row align-items-center">
                        <div className="col-12 col-lg-auto">24%</div>
                        <div className="col">
                          <div className="progress" style={{ width: "5rem" }}>
                            <div
                              className="progress-bar"
                              style={{ width: "24%" }}
                              role="progressbar"
                              aria-valuenow={24}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              aria-label="24% Complete"
                            >
                              <span className="visually-hidden">
                                24% Complete
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTables;
