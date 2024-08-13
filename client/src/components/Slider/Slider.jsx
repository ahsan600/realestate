import React, { useState } from "react";
import "./slider.scss";
import arrow from "../../assets/arrow.png";
import cross from "../../assets/cross.png";
function Slider({ images }) {
  const [openSlider, setOpenSlider] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const openSliderImage = (state) => {
    if (!state) {
      setOpenSlider(state);
      setImageIndex(0);
    } else setOpenSlider(true);
  };
  const sliderChange = (index) => {
    if (index == -1) return;
    if (index >= images.length) return;
    setImageIndex(index);
  };
  return (
    <div className="slider">
      {openSlider && (
        <div className="fullImage">
          <div className="leftarrow">
            <img
              src={arrow}
              alt=""
              onClick={() => sliderChange(imageIndex - 1)}
            />
          </div>
          <div className="wholeImage">
            <img src={images[imageIndex]} alt="" />
          </div>
          <div className="rightarrow">
            <div className="cross">
              <img src={cross} alt="" onClick={() => openSliderImage(false)} />
            </div>
            <img
              src={arrow}
              alt=""
              onClick={() => sliderChange(imageIndex + 1)}
            />
          </div>
        </div>
      )}
      <div className="bigImage">
        <img
          src={images && images[0]}
          alt=""
          onClick={() => openSliderImage(true)}
        />
      </div>
      {images.length !== 1 && (
        <div className="smallImage">
          {images?.slice(1)?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              onClick={() => {
                sliderChange(index + 1);
                openSliderImage(true);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Slider;
