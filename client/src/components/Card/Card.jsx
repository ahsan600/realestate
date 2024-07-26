import React from "react";
import "./card.scss";
import bed from "../../assets/bed.png";
import bath from "../../assets/bath.png";
import pin from "../../assets/pin.png";
import chat from "../../assets/chat.png";
import save from "../../assets/save.png";
import { Link } from "react-router-dom";
function Card({ data }) {
  return (
    <Link to={`/${data.id}`}>
      <div className="card">
        <div className="imageContainer">
          <img src={data.img} alt="" />
        </div>
        <div className="textContainer">
          <h1 className="title">{data.title}</h1>
          <div className="adress">
            <img src={pin} alt="" />
            <p>{data.address}</p>
          </div>
          <div className="price">
            <p>${data.price}</p>
          </div>

          <div className="bottom">
            <div className="right">
              <div className="item">
                <img src={bed} alt="" />
                <p>{data.bedroom} bedroom</p>
              </div>
              <div className="item">
                <img src={bath} alt="" />
                <p>{data.bathroom} bathroom</p>
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
    </Link>
  );
}

export default Card;
