import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import FilterByYear from "../../components/FilterByYear/FilterByYear";
import Navbar from "../../components/Navbar/Navbar";
import RightSide from "../../components/RightSide/RightSide";
import "./home.css";

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

export default function HomePage() {
  const [page, setPage] = useState(1);
  // const [cat, setCat] = useState("airing");
  // const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://api.jikan.moe/v3/top/anime/${page}/airing`
      );
      setData(res.data.top);
      // console.log(res.data.top);
    };
    fetchData();
  }, [page]);

  // useEffect(() => {
  //   const fetchDataSearch = async () => {
  //     const res = await axios.get(
  //       `https://api.jikan.moe/v3/search/anime?q=${query}`
  //     );
  //     // console.log(res.data.results);
  //     setData(res.data.results);
  //   };
  //   fetchDataSearch();
  // }, [query]);

  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  // const onChange = (value) => {
  //   setQuery(value);
  // };

  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar />
        <div className="col-9 bg-9">
          <h1 className="home_name">Top Airing Anime</h1>
          <div className="row row--grid">
            {data.map((x) => (
              <Card key={x.mal_id} data={x} />
            ))}
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
          <FilterByYear />
          <h1 className="rightside_name">Most Viewed</h1>
          <RightSide />
        </div>
      </div>
    </div>
  );
}
