import React, { useState, useEffect } from "react";
import "./rightside.css";
import axios from "axios";

export default function RightSide() {
  // const counter = useSelector((state) => state.counter);
  // const logged = useSelector((state) => state.logged);

  // const dispatch = useDispatch();
  const [animeTop, setAnimeTop] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://api.jikan.moe/v3/search/anime?order_by=score&sort=desc&page=1"
      );
      setAnimeTop(res.data.results);
    };
    fetchData();
  }, []);

  const animeTopSlice = animeTop.slice(0, 10);
  console.log(animeTopSlice);

  return (
    <div className="rightside">
      <div className="leftside">
        <ul className="listItem">
          {animeTopSlice.map((anime) => (
            <li className="item">
              <div>
                <h3 className="item_rank">
                  {animeTopSlice.indexOf(anime) >= 9 ? "" : "0"}
                  {animeTopSlice.indexOf(anime) + 1}
                </h3>
              </div>
              <img src={anime.image_url} alt="" className="item_img" />
              <div>
                <h3 className="item_name">{anime.title}</h3>
                <span className="item_view">{anime.members} members</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* <div>
        <h3>Counter {counter}</h3>
        <button
          className="btn btn-primary"
          onClick={() => dispatch(increment(5))}
        >
          +
        </button>
        <button
          className="btn btn-primary"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        {logged ? "logged" : "not log"}
        <button className="btn" onClick={() => dispatch(login())}>
          toggle
        </button>
      </div> */}
    </div>
  );
}
