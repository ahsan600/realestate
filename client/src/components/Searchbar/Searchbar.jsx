import { useState } from "react";
import search from "../../assets/search.png";
import "./searchbar.scss";
function Searchbar() {
  const [activeType, setActiveType] = useState({
    type: "Buy",
    location: "",
    maxPrice: "",
    minPrice: "",
  });
  const btnTypes = ["Buy", "Rent"];
  const handleTypeChange = (type) => {
    setActiveType((pv) => ({ ...pv, type }));
  };
  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setActiveType((pv) => ({ ...pv, [name]: value }));
  };
  const onHandleSubmit = (e) => {
    e.preventDefault();
    console.log(activeType);
    setActiveType((pv) => ({
      ...pv,
      location: "",
      maxPrice: "",
      minPrice: "",
    }));
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
        <input
          type="text"
          name="location"
          placeholder="City Location"
          onChange={onHandleChange}
          value={activeType.location}
        />
        <input
          type="number"
          name="minPrice"
          value={activeType.minPrice}
          min={0}
          max={10000000}
          placeholder="Min Price"
          onChange={onHandleChange}
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          value={activeType.maxPrice}
          placeholder="Max Price"
          onChange={onHandleChange}
        />
        <button type="submit">
          <img src={search} alt="" />
        </button>
      </form>
    </div>
  );
}

export default Searchbar;
