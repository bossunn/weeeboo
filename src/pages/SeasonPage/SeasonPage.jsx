import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import FilterByYear from "../../components/FilterByYear/FilterByYear";
import Navbar from "../../components/Navbar/Navbar";
import { Pagination } from "../../components/Pagination/Pagination";
import RightSide from "../../components/RightSide/RightSide";
import "../HomePage/home.css";

export default function SeasonPage() {
  const {
    params: { year },
  } = useRouteMatch();

  const history = useHistory();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [years, setYears] = useState(year);

  const itemPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://api.jikan.moe/v3/season/${years}/winter`
      );
      setData(res.data.anime);
      console.log("Data season", res.data.anime);
    };
    fetchData();
  }, [years]);

  const indexOfLastPost = page * itemPerPage;
  const indexOfFirstPost = indexOfLastPost - itemPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onChange = (value) => {
    setYears(value);
  };

  const handleClick = (id) => {
    history.push(`/${id}`);
  };

  console.log(currentPosts);

  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar />
        <div className="col-9 bg-9">
          <h1 className="home_name">Top Anime {year}</h1>
          <div className="row row--grid">
            {data ? (
              currentPosts.map((x) => (
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

          <Pagination
            moviePerPage={itemPerPage}
            totalMovie={data.length}
            paginate={paginate}
            currentPage={page}
          />
        </div>
        <div className="col-3 bg-3">
          <FilterByYear onChange={onChange} />
          <RightSide />
        </div>
      </div>
    </div>
  );
}
