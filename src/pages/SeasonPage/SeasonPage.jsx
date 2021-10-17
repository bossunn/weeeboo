import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import FilterByYear from "../../components/FilterByYear/FilterByYear";
import Navbar from "../../components/Navbar/Navbar";
import RightSide from "../../components/RightSide/RightSide";
import "../HomePage/home.css";

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

  const history = useHistory();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [years, setYears] = useState(year);

  // const ref = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://api.jikan.moe/v3/season/${years}/winter`
      );
      setData(res.data.anime);
      console.log("Data season", res.data.anime);
      // ref.current = res.data.anime;
    };
    fetchData();
    // console.log("year");
  }, [years]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const onChange = (value) => {
    setYears(value);
  };

  const handleClick = (id) => {
    history.push(`/${id}`);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar />
        <div className="col-9 bg-9">
          <h1 className="home_name">Top Anime {year}</h1>
          <div className="row row--grid">
            {data ? (
              data.map((x) => (
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
                        <span className="card_info_date">{year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
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
