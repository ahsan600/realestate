import React from "react";
import "./listpage.scss";
import Fliter from "../../components/Filter/Fliter";
import { listData } from "../../lib/dummyData";
import Card from "../../components/Card/Card";
import Map from "../../components/Map/Map";

function ListPage() {
  const data = listData;
  return (
    <div className="listpage">
      <div className="listContainer">
        <div className="wrapper">
          <Fliter />
          {data.map((item) => (
            <Card data={item} />
          ))}
        </div>
      </div>
      <div className="mapContainer">
        <Map items={data} />
      </div>
    </div>
  );
}

export default ListPage;
