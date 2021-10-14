import React from "react";
import "./card.css";
import { useHistory } from "react-router-dom";

export default function Card({ data }) {
  const year = data?.start_date?.split(" ")[1];

  const history = useHistory();
  const handleClick = (id) => {
    history.push(`/${id}`);
  };

  return (
    <div
      className="col-xl-2 col-lg-3 col-sm-4 col-6"
      onClick={() => handleClick(data.mal_id)}
    >
      <div className="card">
        <img src={data.image_url} alt="" className="card_img" />
        <div className="card_score">{data.score}</div>
        <div className="card_detail">
          <h6 className="card-title">{data.title}</h6>
          <div className="card_info">
            <span className="card_info_type">{data.type}</span>
            <span className="card_info_date">{year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
