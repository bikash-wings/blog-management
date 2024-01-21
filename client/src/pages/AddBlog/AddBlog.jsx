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

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(EditorState.createEmpty());
  const [isError, setIsError] = useState(null);

  const [modal, setModal] = useState({
    blog: false,
    login: false,
    updateConfirm: false,
    edit: false,
    confirm: false,
  });

  useEffect(() => {
    // console.log(title, userInfo.description);

    setIsError(null);

    const htmlContent = draftToHtml(
      convertToRaw(description.getCurrentContent())
    );
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlContent;
    const blogDescription = tempElement.textContent || tempElement.innerText;
    console.log(blogDescription);
  }, [description, title]);

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
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page-main">
      <Navbar modal={modal} setModal={setModal} />

      <form
        className="card card-md"
        onSubmit={(e) => {
          e.preventDefault();
          onAddBlog();
        }}
        autocomplete="off"
        novalidate=""
      >
        <div className="card-body">
          <h1
            className="card-title text-center mb-2"
            style={{ fontSize: "1.6rem", fontWeight: "600" }}
          >
            Create New Blog
          </h1>
          <div className="mb-2">
            <label className="form-label" style={{ fontSize: "1.2rem" }}>
              Title
            </label>
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
            <label className="form-label" style={{ fontSize: "1.2rem" }}>
              Description
            </label>
            <Editor
              // className="form-control"
              editorState={description}
              onEditorStateChange={onEditorStateChange}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class form-control"
              toolbarClassName="toolbar-class"
            />
          </div>

          {isError && (
            <div className="alert alert-warning alert-dismissible" role="alert">
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

          <div className="form-footer">
            <button type="submit" className="btn btn-primary ">
              Create new blog
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
