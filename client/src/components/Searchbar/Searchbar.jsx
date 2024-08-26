import { useState } from "react";
import search from "../../assets/search.png";
import "./searchbar.scss";
import { useNavigate } from "react-router-dom";
function Searchbar() {
  const [activeType, setActiveType] = useState({
    type: "Buy",
  });
  const btnTypes = ["Buy", "Rent"];
  const navigate = useNavigate();
  const handleTypeChange = (type) => {
    setActiveType((pv) => ({ ...pv, type }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const fromData = new FormData(e.target);
    let { city, minPrice, maxPrice } = Object.fromEntries(fromData);
    if (
      [city, minPrice, maxPrice].some((input) => {
        input.trim() === "";
      })
    ) {
      console.log("Required All Fields");
      return;
    }
    city = city.charAt(0).toUpperCase() + city.slice(1);
    navigate(
      `/list?type=${activeType.type}&city=${city}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
  };
  return (
    <div className="searchBar">
      <div className="type">
        {btnTypes.map((type) => (
          <button
            key={type}
            className={`${activeType.type === type && "active"}`}
            onClick={() => handleTypeChange(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <form onSubmit={onHandleSubmit}>
        <input type="text" name="city" placeholder="City Location" />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
        />
        <button type="submit">
          <img src={search} alt="" />
        </button>
      </form>
    </div>
  );
}

export default Searchbar;
