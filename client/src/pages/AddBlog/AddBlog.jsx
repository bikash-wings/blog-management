import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor, convertToRaw } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import "./addblog.css";
import { addBlogRoute } from "../../utills/apiRoutes";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (state) => {
    console.log(state);
    setEditorState(state);
    editorState.getCurrentContent().getPlainText();
    // const stringState = JSON.stringify(editorState);
    // console.log(stringState);
    console.log(editorState);
  };

  const addNewBlog = async () => {
    try {
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      const contentAsString = JSON.stringify(rawContentState);
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
    <div className="blog-cnt">
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
  );
};

export default AddBlog;
