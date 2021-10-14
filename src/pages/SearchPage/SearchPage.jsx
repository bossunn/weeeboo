import { makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FilterByYear from "../../components/FilterByYear/FilterByYear";
import Navbar from "../../components/Navbar/Navbar";
import RightSide from "../../components/RightSide/RightSide";

const useStyles = makeStyles(() => ({
  pagination: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    "& .MuiPaginationItem-root": {
      backgroundColor: "#FAA300",
    },
  },
}));

export default function SearchPage() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({ page: 1 });

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://api.jikan.moe/v3/search/anime", {
        params: filter,
      });
      setData(res.data.results);
    };
    fetchData();
  }, [filter]);

  const handleClick = (id) => {
    history.push(`/${id}`);
  };

  const onChange = (value) => {
    setFilter((prev) => ({
      ...prev,
      value,
    }));
  };
  console.log("filter", filter);

  const handleChange = (event, value) => {
    setFilter({ page: value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar onChange={onChange} />
        <div className="col-9 bg-9">
          <h1 className="home_name">Top Airing Anime</h1>
          <div className="row row--grid">
            {data.map((x) => (
              <div
                key={x.mal_id}
                className="col-xl-2 col-lg-3 col-sm-4 col-6"
                onClick={() => handleClick(x.mal_id)}
              >
                <div className="card">
                  <img src={x.image_url} alt="" className="card_img" />
                  <div className="card_score">{x.score}</div>
                  <div className="card_detail">
                    <h6 className="card-title">{x.title}</h6>
                    <div className="card_info">
                      <span className="card_info_type">{x.type}</span>
                      {/* <span className="card_info_date">{year}</span> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={classes.pagination}>
            <Pagination
              count={20}
              page={filter.page}
              onChange={handleChange}
              size="large"
            />
          </div>
        </div>
        <div className="col-3 bg-3">
          <h1 className="rightside_name">Best Anime of All Time</h1>
          <FilterByYear />
          <h1 className="rightside_name">Most Viewed</h1>
          <RightSide />
        </div>
      </div>
    </div>
  );
}
