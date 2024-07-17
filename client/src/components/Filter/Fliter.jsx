import React from "react";
import "./filter.scss";
import search from "../../assets/search.png";
function Fliter() {
  const types = ["any", "Buy", "Rent"];
  const propertys = ["any", "Apartment", "House", "Condo", "Land"];
  return (
    <div className="filter">
      <div className="top">
        <h1>Search results for</h1>
      </div>
      <div className="center">
        <label htmlFor="city">Location</label>
        <input id="city" type="text" placeholder="City Location" />
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select name="type" id="type">
            {types.map((type) => (
              <option value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">Property</label>
          <select id="property" value="" name="">
            {propertys.map((property) => (
              <option value={property}>{property}</option>
            ))}
          </select>
        </div>
        <div className="item">
          <label htmlFor="minprice">Min Price</label>
          <input id="minprice" type="text" placeholder="any" />
        </div>
        <div className="item">
          <label htmlFor="maxprice">Max Price</label>
          <input id="maxprice" type="text" placeholder="any" />
        </div>
        <div className="item">
          <label htmlFor="bethroom">Bedroom</label>
          <input
            id="bethroom"
            type="number"
            min={1}
            max={100}
            placeholder="Any"
          />
        </div>
        <div className="item">
          <button>
            <img src={search} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Fliter;
