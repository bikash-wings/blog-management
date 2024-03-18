import axios from "axios";
import { useEffect, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ClockLoader } from "react-spinners";

import Navbar from "../../components/Navbar/Navbar";

import { addBlogRoute } from "../../utills/apiRoutes";
import { useAppSelector } from "../../store/hooks";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./addblog.css";

const AddBlog = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("Drafted");
  const [isError, setIsError] = useState<{
    title: null | string;
    description: null | string;
  }>({ title: null, description: null });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onEditorStateChange = (editorState: EditorState) => {
    setDescription(editorState);
  };

  const onAddBlog = async () => {
    try {
      if (!title) {
        setIsError((p) => ({ ...p, title: "Title required!" }));
        return;
      } else {
        setIsError((p) => ({ ...p, title: null }));
      }

      const htmlContent = draftToHtml(
        convertToRaw(description.getCurrentContent())
      );
      const tempElement = document.createElement("div");
      tempElement.innerHTML = htmlContent;
      const blogDescription = tempElement.textContent || tempElement.innerText;

      if (blogDescription.length < 50) {
        setIsError((p) => ({
          ...p,
          description: "Description must be atleast of 50 characters!",
        }));
        return;
      } else {
        setIsError((p) => ({ ...p, description: null }));
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", blogDescription);
      formData.append("status", status);

      if (thumbnail) formData.append("thumbnail", thumbnail);

      setIsLoading(true);
      const { data } = await axios.post(addBlogRoute, formData, {
        headers: { authorization: user?.token },
      });
      setIsLoading(false);
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsError({ title: null, description: null });
  }, [description, title]);

  return (
    <div className="page-main pb-4">
      {isLoading && <ClockLoader />}

      <div>
        <Navbar />

        <div className="container">
          <div className="card ">
            <form
              className="card-md"
              onSubmit={(e) => {
                e.preventDefault();
                onAddBlog();
              }}
              autoComplete="off"
            >
              <div className="card-body">
                <h1
                  className="card-title text-center mb-4"
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: "600",
                  }}
                >
                  Create New Blog
                </h1>
                <div className="mb-2">
                  <label className="form-label" style={{ fontSize: "1rem" }}>
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
                {isError.title && (
                  <div
                    className="alert alert-warning alert-dismissible mt-4"
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
                      <div>{isError.title}</div>
                    </div>
                  </div>
                )}

                <div className="mb-2">
                  <label className="form-label" style={{ fontSize: "1rem" }}>
                    Description
                  </label>
                  <Editor
                    editorState={description}
                    onEditorStateChange={onEditorStateChange}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class form-control"
                    toolbarClassName="toolbar-class"
                  />
                </div>

                {isError.description && (
                  <div
                    className="alert alert-warning alert-dismissible mt-4"
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
                      <div>{isError.description}</div>
                    </div>
                  </div>
                )}

                <div className="pt-4 mb-2">
                  <label className="form-label" style={{ fontSize: "1rem" }}>
                    Select Thumbnail
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    placeholder="select thumbnail"
                    onChange={(e) => {
                      if (!e.target.files) return;
                      setThumbnail(e.target.files[0]);
                    }}
                  />
                </div>

                <div className="pt-4 mb-2">
                  <select onChange={(e) => setStatus(e.target.value)}>
                    <option value="Drafted">Draft</option>
                    <option value="Published">Publish</option>
                  </select>
                </div>

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
    </div>
  );
};

export default AddBlog;
