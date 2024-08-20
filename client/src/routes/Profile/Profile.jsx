import React, { useContext, useEffect, useState } from "react";
import "./profile.scss";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import Chat from "../../components/Chat/Chat";
import { toast } from "react-toastify";
import { AuthContext } from "../../components/Context/AuthContext";
import AuthServices from "../../services/AuthServices";
import PostServices from "../../services/PostServices";

function Profile() {
  const [userPosts, setUserPosts] = useState(null);
  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await AuthServices.logout();
      toast.success(response.message, {
        position: "top-right",
        autoClose: 1000,
      });
      localStorage.removeItem("user");

      setTimeout(() => {
        updateUser(null);
        userPosts(null);
        navigate("/");
      }, 1500);
    } catch (error) {
      toast.error("Logout failed. Please try again.", {
        position: "top-right",
        autoClose: 1500,
      });
    }
  };
  const fetchUserPosts = async () => {
    try {
      const posts = await PostServices.getUserPosts(currentUser._id);
      setUserPosts(posts);
    } catch (error) {}
  };
  useEffect(() => {
    fetchUserPosts();
  }, [currentUser]);
  const handlePostDelete = async (id) => {
    const { success } = await PostServices.deleteUserPost(id);
    if (success === true) {
      fetchUserPosts();
    }
  };
  return (
    <div className="profile">
      <div className="leftContainer">
        <div className="wrapper">
          <div className="row">
            <h2>User Information</h2>
            <Link to="update-user" className="button">
              Update Profile
            </Link>
          </div>
          <div className="center">
            <div className="detail">
              <p>
                Avatar: <img src={currentUser?.avatar} alt="" />
              </p>
              <p>
                Username: <span>{currentUser?.username}</span>
              </p>
              <p>
                Email: <span>{currentUser?.email}</span>
              </p>
            </div>
            <div onClick={handleLogout} className="logout">
              <Link className="button">
                <span>Logout</span>
              </Link>
            </div>
          </div>
          <div className="row">
            <h2>My List</h2>
            <Link to="add-post" className="button">
              Add New Post
            </Link>
          </div>

          <div className="list">
            {userPosts?.length == 0 ? (
              <h1 style={{ textAlign: "center" }}>
                There is no Posts Available
              </h1>
            ) : (
              userPosts?.map((item, index) => (
                <Card
                  key={index}
                  data={item}
                  userPost="true"
                  deletePost={handlePostDelete}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="rightContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default Profile;
