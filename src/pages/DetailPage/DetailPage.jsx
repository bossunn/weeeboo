import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";

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

  console.log(anime);
  return (
    <div>
      <img src={anime.image_url} alt="" />
    </div>
  );
}
