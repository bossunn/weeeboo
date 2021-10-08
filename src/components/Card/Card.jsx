import React from "react";
import "./card.css";

export default function Card({ data }) {
  return (
    <div className="card">
      <img src={data.image_url} alt="" className="card-img-top" />
      <h5 className="card-title">{data.title}</h5>
    </div>
  );
}
