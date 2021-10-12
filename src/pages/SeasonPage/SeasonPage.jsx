import { Card } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useRouteMatch } from "react-router";
import FilterByYear from "../../components/FilterByYear/FilterByYear";
import Navbar from "../../components/Navbar/Navbar";
import RightSide from "../../components/RightSide/RightSide";
import "../Home/home.css";

const useStyles = makeStyles((theme) => ({
  pagination: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    "& .MuiPaginationItem-root": {
      backgroundColor: "#FAA300",
    },
  },
}));

export default function SeasonPage() {
  const classes = useStyles();

  const {
    params: { year },
  } = useRouteMatch();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [years, setYears] = useState(year);

  const ref = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://api.jikan.moe/v3/season/${years}/winter`
      );
      setData(res.data.anime);
      ref.current = res.data.anime;
    };
    fetchData();
    console.log("year", ref.current);
  }, [years]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const onChange = (value) => {
    setYears(value);
  };

  const datas = data.slice(0, 9);
  console.log("data", datas);

  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar />
        <div className="col-9 bg-9">
          <h1 className="home_name">Top Airing Anime</h1>
          <div className="row row--grid">
            {datas ? (
              datas.map((x) => <Card key={x.mal_id} data={x} />)
            ) : (
              <div style={{ color: "white" }}>null</div>
            )}
          </div>
          <div className={classes.pagination}>
            <Pagination
              count={20}
              page={page}
              onChange={handleChange}
              size="large"
            />
          </div>
        </div>
        <div className="col-3 bg-3">
          <h1 className="rightside_name">Best Anime of All Time</h1>
          <FilterByYear onChange={onChange} />
          <h1 className="rightside_name">Most Viewed</h1>
          <RightSide />
        </div>
      </div>
    </div>
  );
}
