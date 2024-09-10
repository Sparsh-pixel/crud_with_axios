import React, { useEffect, useState } from "react";
import { postData } from "../api/PostApi";

const Input = ({ data, setData, update, setUpdate }) => {
  const [addPost, setAddPost] = useState({
    title: "",
    body: "",
  });

  // get the post data to the input field to update the content
  useEffect(() => {
    update &&
      setAddPost({
        title: update.title || "",
        body: update.body || "",
      });
  }, [update]);

  // adding the post to the API
  const addingPost = async () => {
    const res = await postData(addPost);
    if (res.status === 201) {
      setData([...data, res.data]);
      setAddPost({ title: "", body: "" });
    }
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    addingPost();
  };
  return (
    <form className="input-form" onSubmit={handleSubmitForm}>
      <input
        type="text"
        placeholder="Add Title"
        name="title"
        value={addPost.title}
        onChange={(e) => setAddPost({ ...addPost, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Add About"
        name="body"
        value={addPost.body}
        onChange={(e) => setAddPost({ ...addPost, body: e.target.value })}
      />
      <button type="submit">ADD</button>
    </form>
  );
};

export default Input;
