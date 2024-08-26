import React, { useEffect, useState } from "react";
import "./listpage.scss";
import Fliter from "../../components/Filter/Fliter";
import { listData } from "../../lib/dummyData";
import Card from "../../components/Card/Card";
import Map from "../../components/Map/Map";
import { useParams, useSearchParams } from "react-router-dom";
import PostServices from "../../services/PostServices";

function ListPage() {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const { city, type, bedroom, minPrice, maxPrice, property } = params;

  const [data, setPosts] = useState([]);
  const fetchListPosts = async () => {
    const response = await PostServices.getListPost(params);
    setPosts(response.data);
  };
  useEffect(() => {
    fetchListPosts();
  }, [city, type, bedroom, minPrice, maxPrice, property]);

  return (
    <div className="listpage">
      <div className="listContainer">
        <div className="wrapper">
          <Fliter />
          {data.length === 0 ? (
            <h1 style={{textAlign:'center', textTransform:"capitalize"}}>There is no Property Available</h1>
          ) : (
            data?.map((item, index) => <Card key={index} data={item} />)
          )}
        </div>
      </div>
      <div className="mapContainer">
        <Map items={data} />
      </div>
    </div>
  );
}

export default ListPage;
