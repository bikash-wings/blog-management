import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { singleBlogRoute, updateBlogRoute } from "../../utills/apiRoutes";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

const BlogModal = ({ blogid, modal, setModal }) => {
  const [blog, setBlog] = useState({});

  const fetchSingleBlog = async () => {
    try {
      const { data } = await axios.get(`${singleBlogRoute}/${blogid}`);
      setBlog(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleBlog();
  }, []);

  useEffect(() => {
    console.log(blog);
  }, [blog]);

  const updateBlog = async () => {
    try {
      const { data } = await axios.put(`${updateBlogRoute}/${blogid}`, {
        title: blog.title,
        description: blog.description,
      });
      setBlog(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return ReactDOM.createPortal(
    <div
      className="modal modal-blur fade show"
      id="modal-report"
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      style={{ display: "block", paddingLeft: 0 }}
      onClick={() => setModal((p) => ({ ...p, blog: false, edit: false }))}
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        role="document"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">New report</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() =>
                setModal((p) => ({ ...p, blog: false, edit: false }))
              }
            />
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                name="example-text-input"
                placeholder="Your report name"
                value={blog?.title}
                disabled={!modal.edit}
                onChange={(e) =>
                  setBlog((p) => ({ ...p, title: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-lg-12">
                <div>
                  <label className="form-label">Blog Description</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    defaultValue={blog?.description}
                    disabled={!modal.edit}
                    onChange={(e) =>
                      setBlog((p) => ({ ...p, description: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <a
              href="#"
              className="btn btn-link link-secondary"
              data-bs-dismiss="modal"
              onClick={() =>
                setModal((p) => ({ ...p, blog: false, edit: false }))
              }
            >
              Cancel
            </a>
            {modal.edit && (
              <a
                href="#"
                className="btn btn-primary ms-auto"
                data-bs-dismiss="modal"
                onClick={() => setModal((p) => ({ ...p, updateConfirm: true }))}
              >
                {/* Download SVG icon from http://tabler-icons.io/i/plus */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 5l0 14" />
                  <path d="M5 12l14 0" />
                </svg>
                Update Blog
              </a>
            )}
          </div>
          {modal.updateConfirm && (
            <ConfirmModal
              modal={modal}
              setModal={setModal}
              updateBlog={updateBlog}
            />
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default BlogModal;
