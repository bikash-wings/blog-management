import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { addBlogRoute, singleBlogRoute } from "../../utills/apiRoutes";
import draftToHtml from "draftjs-to-html";
import Navbar from "../../components/Navbar/Navbar";
import "./addblog.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(EditorState.createEmpty());
  const [isError, setIsError] = useState(null);

  const [modal, setModal] = useState({
    updateConfirm: false,
    edit: false,
    confirm: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    setIsError(null);
  }, [description, title]);

  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  };

  const onAddBlog = async () => {
    try {
      if (!title) {
        setIsError("Title required!");
        return;
      } else {
        setIsError(null);
      }

      const htmlContent = draftToHtml(
        convertToRaw(description.getCurrentContent())
      );
      const tempElement = document.createElement("div");
      tempElement.innerHTML = htmlContent;
      const blogDescription = tempElement.textContent || tempElement.innerText;

      if (blogDescription.length < 50) {
        setIsError("Description must be atleast of 50 characters!");
        return;
      } else {
        setIsError(null);
      }

      const { data } = await axios.post(addBlogRoute, {
        title: title,
        description: blogDescription,
      });
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page-main pb-4">
      <Navbar />

      <h1
        className="card-title text-center "
        style={{ fontSize: "1.6rem", fontWeight: "600", marginTop: "1.8rem" }}
      >
        Create New Blog
      </h1>
      <div className="container mt-4">
        <div className="card ">
          <form
            className="card-md"
            onSubmit={(e) => {
              e.preventDefault();
              onAddBlog();
            }}
            autocomplete="off"
            novalidate=""
          >
            <div className="card-body">
              <div className="mb-2">
                <label className="form-label">Blog Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter blog title here"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Description</label>
                <Editor
                  editorState={description}
                  onEditorStateChange={onEditorStateChange}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class form-control"
                  toolbarClassName="toolbar-class"
                />
              </div>

              {isError && (
                <div
                  className="alert alert-warning alert-dismissible"
                  role="alert"
                >
                  <div className="d-flex">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon alert-icon"
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
                        <path d="M12 9v4" />
                        <path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z" />
                        <path d="M12 16h.01" />
                      </svg>
                    </div>
                    <div>{isError}</div>
                  </div>
                </div>
              )}

              <div className="form-footer text-center">
                <button type="submit" className="btn btn-primary ">
                  Publish
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
