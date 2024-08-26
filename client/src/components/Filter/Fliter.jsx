import React from "react";
import "./filter.scss";
import search from "../../assets/search.png";
import { useNavigate, useSearchParams } from "react-router-dom";
function Fliter() {
  const types = ["any", "Buy", "Rent"];
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);

  const propertys = ["any", "Apartment", "House", "Condo", "Land"];
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const fromData = new FormData(e.target);
    let { city, type, minPrice, maxPrice, bedroom, property } =
      Object.fromEntries(fromData);

    city = city.charAt(0).toUpperCase() + city.slice(1);
    navigate(
      `/list?type=${type}&city=${city}&minPrice=${minPrice}&maxPrice=${maxPrice}&bedroom=${bedroom}&property=${property}`
    );
  };
  return (
    <form onSubmit={handleSubmit} className="filter">
      <div className="top">
        <h1>Search results for {params.city}</h1>
      </div>
      <div className="center">
        <label htmlFor="city">Location</label>
        <input
          defaultValue={params.city}
          id="city"
          type="text"
          name="city"
          placeholder="City Location"
        />
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select name="type" id="type" defaultValue={params.type}>
            {types.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">Property</label>
          <select
            id="property"
            name="property"
            defaultValue={params.property || "Apartment"}
          >
            {propertys.map((property) => (
              <option key={property} value={property}>
                {property}
              </option>
            ))}
          </select>
        </div>
        <div className="item">
          <label htmlFor="minprice">Min Price</label>
          <input
            defaultValue={params.minPrice}
            id="minprice"
            name="minPrice"
            type="text"
            placeholder="any"
          />
        </div>
        <div className="item">
          <label htmlFor="maxprice">Max Price</label>
          <input
            defaultValue={params.maxPrice}
            id="maxprice"
            name="maxPrice"
            type="text"
            placeholder="any"
          />
        </div>
        <div className="item">
          <label htmlFor="bedroom">Bedroom</label>
          <input
            defaultValue={params.bethroom || 2}
            id="bedroom"
            type="number"
            name="bedroom"
            min={1}
            max={100}
            placeholder="Any"
          />
        </div>
        <div className="item">
          <button type="submit">
            <img src={search} alt="" />
          </button>
        </div>
      </div>
    </form>
  );
}

export default Fliter;
