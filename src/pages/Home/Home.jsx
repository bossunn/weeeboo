import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import { makeStyles } from "@material-ui/core/styles";
import "./home.css";
import Navbar from "../../components/Navbar/Navbar";

const useStyles = makeStyles((theme) => ({
  pagination: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  },
}));

export default function Home() {
  const [page, setPage] = useState(1);
  const [cat, setCat] = useState("movie");
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://api.jikan.moe/v3/top/anime/${page}/${cat}`
      );
      setData(res.data.top);
      console.log(res.data.top);
    };
    fetchData();
  }, [page, cat]);

  useEffect(() => {
    const fetchDataSearch = async () => {
      const res = await axios.get(
        `https://api.jikan.moe/v3/search/anime?q=${query}`
      );
      console.log(res.data.results);
      setData(res.data.results);
    };
    fetchDataSearch();
  }, [query]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const onChange = (value) => {
    setQuery(value);
  };

  return (
    <div className="home">
      <Navbar onChange={onChange} />
      <div className="home_container">
        {data.map((x) => (
          <Card key={x.mal_id} data={x} />
        ))}
      </div>
      <div className={classes.pagination}>
        <Pagination
          count={10}
          page={page}
          onChange={handleChange}
          size="large"
          color="primary"
        />
      </div>
    </div>
  );
}
