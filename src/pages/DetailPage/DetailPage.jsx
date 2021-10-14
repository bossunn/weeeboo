import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import "./detailpage.css";

export default function DetailPage() {
  const [anime, setAnime] = useState([]);

  const {
    params: { id },
  } = useRouteMatch();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`https://api.jikan.moe/v3/anime/${id}`);
      setAnime(res.data);
    };
    fetchData();
  }, [id]);

  console.log();

  console.log(anime);
  return (
    <div className="detail_page">
      <div className="anime_info">
        <div className="anime_info-img">
          <img src={anime.image_url} alt="" />
        </div>
        <div className="anime_detail">
          <h2>{anime.title}</h2>
          <div className="anime_button">
            <button className="button_watch">Watch now</button>
            <button className="button_add">Add to List</button>
          </div>
          <div className="anme_desc">{anime.synopsis}</div>
        </div>

        <div className="wrapper">
          <div className="wrapper_info">
            <div className="wrap wrapper_info-score">
              <span className="wrapper_name">Score: </span>
              <span>{anime.score} / 9.99</span>
            </div>
            <div className="wrap wrapper_info-premiered">
              <span className="wrapper_name">Premiered: </span>
              <span>{anime.premiered}</span>
            </div>
            <div className="wrap wrapper_info-duration">
              <span className="wrapper_name">Duration: </span>
              <span>{anime.duration} / episode</span>
            </div>
            <div className="wrap wrapper_info-source">
              <span className="wrapper_name">Source: </span>
              <span>{anime.source}</span>
            </div>
            <div className="wrap wrapper_info-producers">
              <span className="wrapper_name">Producers: </span>
              <span>{anime.producers?.[0]?.name}</span>
            </div>
            <div className="wrap wrapper_info-status">
              <span className="wrapper_name">Status: </span>
              <span>{anime.status}</span>
            </div>
            <div className="wrapper_info-genres">
              <span className="wrapper_name">Genres: </span>
              {anime.genres?.map((genre) => (
                <span key={genre.mal_id} className="wrapper_genre">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="trailer">
        <iframe
          width="720"
          height="345"
          title="This is video trailer"
          src={anime.trailer_url}
        ></iframe>
      </div>
    </div>
  );
}
