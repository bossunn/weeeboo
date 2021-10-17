import { makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import axios from "axios";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import FilterByGenre from "../../components/FilterByGenre/FilterByGenre";
import FilterByYear from "../../components/FilterByYear/FilterByYear";
import Navbar from "../../components/Navbar/Navbar";
import RightSide from "../../components/RightSide/RightSide";
import { status } from "../../constants";
import "./searchpage.css";

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

  const history = useHistory();
  const location = useLocation();
  console.log("Location", location);

  // const id = location.state;
  // const query = location.state?.q;

  const [filter, setFilter] = useState(() => {
    const genre = location.state?.genre;
    return { page: 1, genre };
  });

  // const [filter, setFilter] = useState({ page: 1 });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://api.jikan.moe/v3/search/anime", {
        params: filter,
      });
      setData(res.data.results);
      console.log("Data", res.data.results);
    };
    fetchData();
  }, [filter]);

  const handleClick = (id) => {
    history.push(`/${id}`);
  };

  // const onChange = (value) => {
  //   setFilter((prev) => ({
  //     ...prev,
  //     ...value,
  //   }));
  // };

  // useEffect(() => {
  //   setFilter((prev) => ({
  //     ...prev,
  //     genre: id,
  //     query: query,
  //   }));
  // }, [id, query]);

  // const onChangeName = (value) => {
  //   setFilter((prev) => ({
  //     ...prev,
  //     ...value,
  //   }));
  // };

  //Để xuất hiện những filter trên thanh URL
  useEffect(() => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filter),
    });
  }, [history, filter]);

  // setFilter((prev) => ({
  //   ...prev,
  //   genre: id,
  // }));

  // setFilter({ ...filter, genre: location.state?.genre });

  console.log("filter", filter);

  const handleChange = (event, value) => {
    setFilter((prev) => ({
      ...prev,
      page: value,
    }));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar />
        <div className="col-9 bg-9">
          <div className="banner_search">
            <h1 className="home_name">Top Airing Anime</h1>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-warning dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sort
              </button>
              <div className="dropdown-menu">
                <div
                  className="dropdown-item"
                  onClick={() =>
                    setFilter((prev) => ({ ...prev, sort: "descending" }))
                  }
                >
                  Giảm
                </div>
                <div
                  className="dropdown-item"
                  onClick={() =>
                    setFilter((prev) => ({ ...prev, sort: "ascending" }))
                  }
                >
                  Tăng
                </div>
              </div>
            </div>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-warning dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Status
              </button>
              <div className="dropdown-menu">
                {status.map((x) => (
                  <div
                    className="dropdown-item"
                    key={x.id}
                    onClick={() =>
                      setFilter((prev) => ({ ...prev, status: x.id }))
                    }
                  >
                    {x.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
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
          <FilterByGenre filter={filter} />
        </div>
      </div>
    </div>
  );
}
