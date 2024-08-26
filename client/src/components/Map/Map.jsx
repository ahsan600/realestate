import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../Pin/Pin";
function Map({ items }) {
  return (
    <MapContainer
    key={Math.random()}
      className="map"
      center={
        items.length === 1
          ? [items[0].latitude, items[0].longitude]
          : [51.505, -0.09]
      }
      zoom={7}
      scrollWheelZoom={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {items.map((item) => (
        <Pin key={item._id} item={item} />
      ))}
    </MapContainer>
  );
}

export default Map;
