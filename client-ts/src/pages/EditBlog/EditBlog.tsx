import { useEffect, useState } from "react";
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
import toast from "react-hot-toast";

import Navbar from "../../components/Navbar/Navbar";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

import { singleBlogRoute, updateBlogRoute } from "../../utills/apiRoutes";
import { useAppSelector } from "../../store/hooks";

const EditBlog = () => {
  const navigate = useNavigate();
  const { blogid } = useParams();
  let { user } = useAppSelector((state) => state);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("Published");
  const [modal, setModal] = useState<{
    updateConfirm: boolean;
    confirm: boolean;
  }>({
    updateConfirm: false,
    confirm: false,
  });

  const fetchBlog = async () => {
    try {
      const { data } = await axios.get(`${singleBlogRoute}/${blogid}`, {
        headers: { authorization: user?.token },
      });
      const htmlContent = data.data.description;
      const blocksFromHTML = convertFromHTML(htmlContent);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );

      setTitle(data.data.title);
      setDescription(EditorState.createWithContent(contentState));
      setStatus(data.data.status);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  const onEditorStateChange = (editorState: EditorState) => {
    setDescription(editorState);
  };

  const onBlogUpdate = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append(
      "description",
      draftToHtml(convertToRaw(description.getCurrentContent()))
    );
    formData.append("status", status);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      const { data } = await axios.put(
        `${updateBlogRoute}/${blogid}`,
        formData,
        { headers: { authorization: user?.token } }
      );
      toast.success(data.message);
      navigate("/");
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div className="page-main pb-4">
      <div>
        <Navbar />

        {/* <div className="container-xl "> */}
        <div className="container">
          <div className="card ">
            <form
              className="card-md"
              onSubmit={(e) => {
                e.preventDefault();
                setModal((p) => ({ ...p, updateConfirm: true }));
              }}
              autoComplete="off"
              noValidate={false}
            >
              <div className="card-body">
                <h1
                  className="card-title text-center mb-4"
                  style={{ fontSize: "1.6rem", fontWeight: "600" }}
                >
                  Update Blog
                </h1>
                {/* Title input */}
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

                {/* Description input */}
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

                {/* Thumbnail input */}
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

                {/* Status input */}
                <div className="pt-4 mb-2">
                  <select
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}
                  >
                    <option value="Drafted">Drafted</option>
                    <option value="Published">Published</option>
                  </select>
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
    </div>
    // </div>
  );
};

export default EditBlog;
