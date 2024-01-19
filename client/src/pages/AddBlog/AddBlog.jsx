import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor, ContentState, convertToRaw } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import "./addblog.css";
import { addBlogRoute } from "../../utills/apiRoutes";
import draftToHtml from "draftjs-to-html";
import Sidebar from "../../components/Sidebar/Sidebar";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [showEditorCode, setShowEditorCode] = useState(false);
  const [editorHTML, setEditorHTML] = useState("");

  //   const onEditorStateChange = (state) => {
  //     console.log(state);
  //     setEditorState(state);
  //     editorState.getCurrentContent().getPlainText();
  //     // const stringState = JSON.stringify(editorState);
  //     // console.log(stringState);
  //     console.log(editorState);
  //   };

  const onEditorStateChange = (editor) => {
    const editorHTML = draftToHtml(
      convertToRaw(editor.getCurrentContent()),
      null,
      false,
      entityMapper
    );
    setEditorState(editor);
    setEditorHTML(editorHTML);
  };

  const onEditEditorHTML = (e) => {
    const editorHTML = e.target.value;
    setEditorHTML(editorHTML);
  };

  const toggleEditorCode = () => {
    if (!showEditorCode) {
      onEditorStateChange(editorState);
    }
    setShowEditorCode((prev) => !prev);
  };

  const addHtmlToEditor = (props) => {
    const contentBlock = htmlToDraft(editorHTML, customChunkRenderer);
    let editor;
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      editor = EditorState.createWithContent(contentState);
    } else {
      editor = EditorState.createEmpty();
    }
    onEditorStateChange(editor);
  };

  const ShowEditorCode = () => (
    <div className="rdw-option-wrapper" onClick={toggleEditorCode}>
      {showEditorCode ? "Hide Code" : "Show Code"}
    </div>
  );

  const addNewBlog = async () => {
    try {
      const rawContentState = editorState.getCurrentContent();
      const contentAsString = convertToRaw(rawContentState);
      console.log(contentAsString);
      //   const { data } = await axios.post(addBlogRoute, {
      //     title,
      //     description: editorState,
      //   });
      console.log(contentAsString);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <Sidebar />
      <div className="container-xl blog-cnt">
        <label htmlFor="title">Blog Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter blog title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="">Blog Description</label>
        <Editor
          editorState={editorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          onEditorStateChange={onEditorStateChange}
        />
        <button onClick={() => addNewBlog()}>Add Blog</button>
      </div>
    </div>
  );
};

export default AddBlog;
