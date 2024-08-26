import React, { useEffect, useState } from "react";
import "./singlepage.scss";
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
import PostServices from "../../services/PostServices";
import { useNavigate, useParams } from "react-router-dom";
import UserServices from "../../services/UserServices";

function SinglePage() {
  const [singlePageData, setSinglePageData] = useState(null);
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const postResponse = await PostServices.getSinglePost(id);
      if (!postResponse) {
        navigate("/list");
        return;
      }
      const userData = await UserServices.getUser(postResponse.owner);
      setUserData(userData);
      setSinglePageData(postResponse);
    } catch (error) {
      console.error("Failed to fetch post data:", error);
      navigate("/list");
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);
  if (!singlePageData) {
    return <div>Loading...</div>;
  }

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
                  <img src={pin} alt="Pin" />
                  {singlePageData.address}
                </p>
              </div>
              <span>${singlePageData.price}</span>
            </div>
            <div className="info-right">
              <img src={userData.avatar} alt={userData.name} />
              <br />
              <span>{userData.username}</span>
            </div>
          </div>
          <div className="bottom">
            <p>{singlePageData.desc}</p>
          </div>
        </div>
      </div>
      <div className="rightContainer">
        <div className="wrapper">
          <div className="title">
            <span>General</span>
          </div>
          <div className="general">
            <div className="item">
              <div className="icon">
                <img src={utility} alt="Utilities" />
              </div>
              <div className="text">
                <b>Utilities</b>
                <p style={{ textTransform: "capitalize" }}>
                  {singlePageData.utilities === "shared"
                    ? "Shared"
                    : singlePageData.utilities}{" "}
                  is responsible
                </p>
              </div>
            </div>
            <div className="item">
              <div className="icon">
                <img src={pet} alt="Pet Policy" />
              </div>
              <div className="text">
                <b>Pet Policy</b>
                <p style={{ textTransform: "capitalize" }}>
                  Pets {singlePageData.pet}
                </p>
              </div>
            </div>
            <div className="item">
              <div className="icon">
                <img src={fee} alt="Property Fees" />
              </div>
              <div className="text">
                <b>Property Fees</b>
                <p style={{ textTransform: "capitalize" }}>
                  {singlePageData.income}
                </p>
              </div>
            </div>
          </div>
          <div className="title">
            <span>Room Sizes</span>
          </div>
          <div className="roomsize">
            <div className="item">
              <div className="icon">
                <img src={size} alt="Room Size" />
              </div>
              <div className="text">
                <span>80sqm ({singlePageData.size}sqft)</span>
              </div>
            </div>
            <div className="item">
              <div className="icon">
                <img src={bed} alt="Bedrooms" />
              </div>
              <div className="text">
                <span>{singlePageData.bedroom} bedrooms</span>
              </div>
            </div>
            <div className="item">
              <div className="icon">
                <img src={bath} alt="Bathrooms" />
              </div>
              <div className="text">
                <span>{singlePageData.bathroom} bathrooms</span>
              </div>
            </div>
          </div>
          <div className="title">
            <span> Nearby Places</span>
          </div>
          <div className="nearbyplaces">
            <div className="item">
              <div className="icon">
                <img src={school} alt="School" />
              </div>
              <div className="text">
                <b>School</b>
                <p>{singlePageData.school}m away</p>
              </div>
            </div>
            <div className="item">
              <div className="icon">
                <img src={bus} alt="Bus Stop" />
              </div>
              <div className="text">
                <b>Bus Stop</b>
                <p>{singlePageData.bus}m away</p>
              </div>
            </div>
            <div className="item">
              <div className="icon">
                <img src={restaurant} alt="Restaurant" />
              </div>
              <div className="text">
                <b>Restaurant</b>
                <p>{singlePageData.restaurant}m away</p>
              </div>
            </div>
          </div>
          <div className="title">
            <span> Location</span>
          </div>
          <div className="mapContainer">
            <Map items={[singlePageData]} />
          </div>
          <div className="buttons">
            <button>
              <img src={chat} alt="Chat" />
              Send a Message
            </button>
            <button>
              <img src={save} alt="Save" />
              Save the Place
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
