import React from "react";
import "./card.scss";
import bed from "../../assets/bed.png";
import bath from "../../assets/bath.png";
import pin from "../../assets/pin.png";
import chat from "../../assets/chat.png";
import save from "../../assets/save.png";
import { Link, useNavigate } from "react-router-dom";
function Card({ data, userPost = "false", deletePost = "" }) {
  const navigate = useNavigate();
  const handleRoute = () => {
    navigate("/list/" + data._id);
  };
  return (
    <div className="card" onClick={handleRoute}>
      <div className="imageContainer">
        <img src={data?.images[0]} alt="" />
      </div>
      <div className="textContainer">
        <h1
          className="title"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {data?.title}
          {userPost === "true" && (
            <i
              className="fa-solid fa-trash"
              onClick={(e) => {
                e.stopPropagation();
                deletePost(data._id);
              }}
            ></i>
          )}
        </h1>
        <div className="adress">
          <img src={pin} alt="" />
          <p>{data?.address}</p>
        </div>
        <div className="price">
          <p>${data?.price}</p>
        </div>

        <div className="bottom">
          <div className="right">
            <div className="item">
              <img src={bed} alt="" />
              <p>{data?.bedroom} bedroom</p>
            </div>
            <div className="item">
              <img src={bath} alt="" />
              <p>{data?.bathroom} bathroom</p>
            </div>
          </div>
          <div className="left">
            <button>
              <img src={save} alt="" />
            </button>
            <button>
              <img src={chat} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
