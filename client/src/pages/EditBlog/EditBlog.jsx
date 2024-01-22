import React, { useEffect, useState } from "react";
import { singleBlogRoute, updateBlogRoute } from "../../utills/apiRoutes";
import axios from "axios";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { useNavigate, useParams } from "react-router-dom";
import draftToHtml from "draftjs-to-html";
import Navbar from "../../components/Navbar/Navbar";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(EditorState.createEmpty());

  const navigate = useNavigate();

  const [modal, setModal] = useState({
    updateConfirm: false,
    edit: false,
    confirm: false,
  });

  const { blogid } = useParams();

  let { user } = useSelector((state) => state.user);

  console.log(user);

  const fetchBlog = async () => {
    try {
      const { data } = await axios.get(`${singleBlogRoute}/${blogid}`);
      console.log(data.data);
      const htmlContent = data.data.description;
      const blocksFromHTML = convertFromHTML(htmlContent);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );

      setTitle(data.data.title);
      setDescription(EditorState.createWithContent(contentState));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  };

  const onBlogUpdate = async () => {
    try {
      const { data } = await axios.put(
        `${updateBlogRoute}/${blogid}`,
        {
          title,
          description: draftToHtml(
            convertToRaw(description.getCurrentContent())
          ),
        },
        { headers: { authorization: user?.token } }
      );
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page-main pb-4">
      <Navbar />

      <div className="container mt-4">
        <div className="card ">
          <form
            className="card-md"
            onSubmit={(e) => {
              e.preventDefault();
              setModal((p) => ({ ...p, updateConfirm: true }));
            }}
            autocomplete="off"
            novalidate=""
          >
            <div className="card-body">
              <h1
                className="card-title text-center mb-2"
                style={{ fontSize: "1.6rem", fontWeight: "600" }}
              >
                Update Blog
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
                  editorState={description}
                  onEditorStateChange={onEditorStateChange}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class form-control"
                  toolbarClassName="toolbar-class"
                />
              </div>

              <div className="form-footer text-center">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </div>
            {modal.updateConfirm && (
              <ConfirmModal
                modal={modal}
                setModal={setModal}
                onBlogUpdate={onBlogUpdate}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
