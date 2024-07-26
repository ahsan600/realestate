import React from "react";
import "./profile.scss";
import { Link } from "react-router-dom";
import { listData, userData } from "../../lib/dummyData";
import Card from "../../components/Card/Card";
import Chat from "../../components/Chat/Chat";
function Profile() {
  const user = userData;
  const data = listData;
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
                Avatar: <img src={user.img} alt="" />
              </p>
              <p>
                Username: <span>{user.name}</span>
              </p>
              <p>
                Email: <span>ahsan@gmail.com</span>
              </p>
            </div>
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
