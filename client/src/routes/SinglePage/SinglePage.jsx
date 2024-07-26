import React from "react";
import "./singlepage.scss";
import { singlePostData, userData } from "../../lib/dummyData";
import utility from "../../assets/utility.png";
import pet from "../../assets/pet.png";
import fee from "../../assets/fee.png";
import size from "../../assets/size.png";
import bed from "../../assets/bed.png";
import bath from "../../assets/bath.png";
import school from "../../assets/school.png";
import restaurant from "../../assets/restaurant.png";
import bus from "../../assets/bus.png";
import chat from "../../assets/chat.png";
import pin from "../../assets/pin.png";
import save from "../../assets/save.png";
import Map from "../../components/Map/Map";
import Slider from "../../components/Slider/Slider";
function SinglePage() {
  const singlePageData = singlePostData;

  return (
    <div className="singlepage">
      <div className="leftContainer">
        <div className="wrapper">
          <div className="top">
            <Slider images={singlePageData.images} />
          </div>
          <div className="center">
            <div className="info-left">
              <h1>{singlePageData.title}</h1>
              <div className="address">
                <p>
                  <img src={pin} alt="" />
                  {singlePageData.address}
                </p>
              </div>
              <span>${singlePageData.price}</span>
            </div>
            <div className="info-right">
              <img src={userData.img} alt="" />
              <br />
              <span>{userData.name}</span>
            </div>
          </div>
          <div className="bottom">
            <p>{singlePageData.description}</p>
          </div>
        </div>
      </div>
      <div className="rightContainer">
        <div className="wrapper">
          <h3>General</h3>
          <div className="general">
            <div className="item">
              <div className="icon">
                <img src={utility} alt="" />
              </div>
              <div className="text">
                <b>Utilities</b>
                <p>Render is responsible</p>
              </div>
            </div>
            <div className="item">
              <div className="icon">
                <img src={pet} alt="" />
              </div>

              <div className="text">
                <b>Pet Policy</b>
                <p>Pets Allowed</p>
              </div>
            </div>
            <div className="item">
              <div className="icon">
                <img src={fee} alt="" />
              </div>

              <div className="text">
                <b>Property Fees</b>
                <p>Must have 3x the rent in total household income</p>
              </div>
            </div>
          </div>
          <h3>Room Sizes</h3>
          <div className="roomsize">
            <div className="item">
              <div className="icon">
                <img src={size} alt="" />
              </div>
              <div className="text">
                <span>80sqm ({singlePageData.size}sqft)</span>
              </div>
            </div>
            <div className="item">
              <div className="icon">
                <img src={bed} alt="" />
              </div>

              <div className="text">
                <span>{singlePageData.bedroom} bedrooms</span>
              </div>
            </div>
            <div className="item">
              <div className="icon">
                <img src={bath} alt="" />
              </div>

              <div className="text">
                <span>{singlePageData.bathroom} bathrooms</span>
              </div>
            </div>
          </div>
          <h3>Nearby Places</h3>
          <div className="nearbyplaces">
            <div className="item">
              <div className="icon">
                <img src={school} alt="" />
              </div>
              <div className="text">
                <b>School</b>
                <p>{singlePageData.school}</p>
              </div>
            </div>
            <div className="item">
              <div className="icon">
                <img src={bus} alt="" />
              </div>

              <div className="text">
                <b>Bus Stop</b>
                <p>{singlePageData.bus}</p>
              </div>
            </div>
            <div className="item">
              <div className="icon">
                <img src={restaurant} alt="" />
              </div>

              <div className="text">
                <b>Restaurant</b>
                <p>{singlePageData.restaurant}</p>
              </div>
            </div>
          </div>
          <h3>Location</h3>
          <div className="mapContainer">
            <Map items={[singlePostData]} />
          </div>
          <div className="buttons">
            <button>
              <img src={chat} alt="" />
              Send a Message
            </button>
            <button>
              <img src={save} alt="" />
              Save the Place
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
