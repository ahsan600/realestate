import React, { useContext } from "react";
import "./profile.scss";
import { Link, useNavigate } from "react-router-dom";
import { listData } from "../../lib/dummyData";
import Card from "../../components/Card/Card";
import Chat from "../../components/Chat/Chat";
import { toast } from "react-toastify";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../components/Context/AuthContext";

function Profile() {
  const data = listData;
  const navigate = useNavigate();
  const { currentUser, updateUser } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      const { data: responseData } = await apiRequest.get("/api/auth/logout");
      toast.success(responseData.message, {
        position: "top-right",
        autoClose: 1000,
      });
      localStorage.removeItem("user");

      setTimeout(() => {
        updateUser(null);
        navigate("/");
      }, 1500);
    } catch (error) {
      toast.error("Logout failed. Please try again.", {
        position: "top-right",
        autoClose: 1500,
      });
    }
  };

  return (
    <div className="profile">
      <div className="leftContainer">
        <div className="wrapper">
          <div className="row">
            <h2>User Information</h2>
            <Link to="update-user" className="button">Update Profile</Link>
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
            <Link className="button">Add New Post</Link>
          </div>
          <div className="list">
            {data.map((item, index) => (
              <Card key={index} data={item} />
            ))}
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
