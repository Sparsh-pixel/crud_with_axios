import React, { useEffect, useState } from "react";
import { postData, updateData } from "../api/PostApi";

const Input = ({ data, setData, update, setUpdate }) => {
  const [addPost, setAddPost] = useState({
    title: "",
    body: "",
  });

  let isEmpty = Object.keys(update).length === 0;

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
    if (res.status === 200) {
      setData([...data, res.data]);
      setAddPost({ title: "", body: "" });
    }
  };
  // update post data in the api
  const updatePostData = async () => {
    try {
      const res = await updateData(update.id, addPost);
      console.log(res);
      if (res.status === 200) {
        setData((prev) => {
          return prev.map((curElem) => {
            return curElem.id === res.data.id ? res.data : curElem;
          });
        });
        setAddPost({ title: "", body: "" });
        setUpdate({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const action = event.nativeEvent.submitter.value;
    if (action === "ADD") {
      addingPost();
    } else if (action === "EDIT") {
      updatePostData();
    }
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
      <button type="submit" value={isEmpty ? "ADD" : "EDIT"}>
        {isEmpty ? "ADD" : "EDIT"}
      </button>
    </form>
  );
};

export default Input;
