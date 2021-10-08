import { makeStyles } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import NavbarManga from "../../components/NavbarManga/NavbarManga";

const useStyles = makeStyles((theme) => ({
  pagination: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  },
}));

export default function Manga() {
  const classes = useStyles();

  const [page, setPage] = useState(1);
  const [subtype, setSubtype] = useState("manga");
  const [manga, setManga] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchManga = async () => {
      const res = await axios.get(
        `https://api.jikan.moe/v3/top/manga/${page}/${subtype}`
      );
      setManga(res.data.top);
    };
    fetchManga();
  }, [page, subtype]);

  useEffect(() => {
    const searchManga = async () => {
      const res = await axios.get(
        `https://api.jikan.moe/v3/search/manga?q=${query}`
      );
      console.log(res.data.results);
      setManga(res.data.results);
    };
    searchManga();
  }, [query]);

  //xử lý truyền xuống Navbar để nhận value
  const onChange = (value) => {
    setQuery(value);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="home">
      <NavbarManga onChange={onChange} />
      <div className="home_container">
        {manga.map((x) => (
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
