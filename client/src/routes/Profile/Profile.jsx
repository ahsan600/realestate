import React, { useEffect } from "react";
import "./profile.scss";
import { Link, useNavigate } from "react-router-dom";
import { listData, userData } from "../../lib/dummyData";
import Card from "../../components/Card/Card";
import Chat from "../../components/Chat/Chat";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../redux/authSlice";
import { toast } from "react-toastify";
import axios from "axios";
import apiRequest from "../../lib/apiRequest";
function Profile() {
  // const user = userData;
  const data = listData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const userData = JSON.parse(localStorage.getItem("user"));
  console.log(userData);
  const handleLogout = async () => {
    const { data: responseData } = await apiRequest.get("/api/auth/logout");
    // axios.get("/api/auth/logout");
    toast.success(responseData.message, {
      position: "top-right",
      autoClose: 1000,
    });
    localStorage.removeItem("user");
    setTimeout(() => {
      dispatch(setAuth(false));
      navigate("/");
    }, 1500);
  };

  return (
    <div className="profile">
      <div className="leftContainer">
        <div className="wrapper">
          <div className="row">
            <h2>User Information</h2>
            <Link className="button">Update Profile</Link>
          </div>
          <div className="center">
            <div className="detail">
              <p>
                Avatar: <img src={userData.avatar} alt="" />
              </p>
              <p>
                Username: <span>{userData.username}</span>
              </p>
              <p>
                Email: <span>{userData.email}</span>
              </p>
            </div>
            {auth && (
              <div onClick={handleLogout} className="logout">
                <Link className="button">
                  <span>Logout</span>
                </Link>
              </div>
            )}
          </div>
          <div className="row">
            <h2>My List</h2>
            <Link className="button">Add New Post</Link>
          </div>
          <div className="list">
            {data.map((item) => (
              <Card data={item} />
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
