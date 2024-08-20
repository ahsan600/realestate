import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [updatePost, setUpdatePost] = useState(null);

  const updateSinglePost = (data) => {
    setUpdatePost(data);
  };

  return (
    <PostContext.Provider value={{ updatePost, updateSinglePost }}>
      {children}
    </PostContext.Provider>
  );
};
