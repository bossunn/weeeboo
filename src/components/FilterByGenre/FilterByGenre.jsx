import React from "react";
import { useHistory } from "react-router";
import { genres } from "../../constants";
import "./filterbygenre.css";

export default function FilterByGenre() {
  const history = useHistory();

  const handleClick = (id) => {
    history.push({
      pathname: "/search/search",
      state: { genre: id },
    });
    console.log(id);
  };

  return (
    <div className="year_container">
      <h1 className="rightside_name">Genres</h1>
      <div className="year_bg">
        <ul className="list_year">
          {genres.map((genre) => (
            <li
              key={genre.id}
              className="item_year"
              onClick={() => handleClick(genre.id)}
            >
              {genre.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
