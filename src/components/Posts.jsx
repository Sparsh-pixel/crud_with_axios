import React, { useEffect, useState } from "react";
import { deleteData, getData } from "../api/PostApi";
import "../App.css";
import Input from "./Input";

const Posts = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState({});

  const getPostData = async () => {
    const response = await getData();
    setData(response.data);
    console.log(response.data);
  };
  useEffect(() => {
    getPostData();
  }, []);

  // method to delete the post from UI
  const handleDeletePost = async (id) => {
    try {
      const respone = await deleteData(id);
      if (respone.status === 200) {
        const updatedPost = data.filter((elem) => {
          return elem.id !== id;
        });
        setData(updatedPost);
      } else {
        console.log("failed to delete data", respone.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // method to update the post data from UI
  const handleUpdatePost = (curElem) => {
    setUpdate(curElem);
  };
  return (
    <>
      <section>
        <Input
          data={data}
          setData={setData}
          update={update}
          setUpdate={setUpdate}
        />
      </section>
      <section className="post-container">
        <ol>
          {data.map((curElem) => {
            const { id, body, title } = curElem;
            return (
              <li key={id}>
                <p>Title: {title}</p>
                <p>About: {body}</p>
                <button
                  className="btn-edit"
                  onClick={() => handleUpdatePost(curElem)}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeletePost(id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
};

export default Posts;
