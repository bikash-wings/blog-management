import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { addBlogRoute, singleBlogRoute } from "../../utills/apiRoutes";
import draftToHtml from "draftjs-to-html";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./addblog.css";

const Add = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(EditorState.createEmpty());

  const [modal, setModal] = useState({
    blog: false,
    login: false,
    updateConfirm: false,
    edit: false,
    confirm: false,
  });

  const { blogid } = useParams();

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

      setTitle(data.data.title)
      setDescription(EditorState.createWithContent(contentState));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (blogid) {
      fetchBlog();
    }
  }, [blogid]);

  useEffect(() => {
    // console.log(title, userInfo.description);
    console.log(
      draftToHtml(convertToRaw(description.getCurrentContent())).innerHTML
    );
  }, [description, title]);

  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  };

  const addBlog = async () => {
    try {
      const { data } = await axios.post(addBlogRoute, {
        title: title,
        description: draftToHtml(convertToRaw(description.getCurrentContent()))
          .innerHTML,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page-main">
      {/* <Navbar modal={modal} setModal={setModal}/> */}
      <form
        className="card card-md"
        onSubmit={(e) => {
          e.preventDefault();
          addBlog();
        }}
        autocomplete="off"
        novalidate=""
      >
        <div className="card-body">
          <h1 className="card-title text-center mb-2">Create New Blog</h1>
          <div className="mb-2">
            <label className="form-label">Blog Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter blog title here"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <Editor
            // className="form-control"
            editorState={description}
            onEditorStateChange={onEditorStateChange}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class form-control"
          />
          <div className="form-footer">
            <button type="submit" className="btn btn-primary w-100">
              Create new blog
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Add;
