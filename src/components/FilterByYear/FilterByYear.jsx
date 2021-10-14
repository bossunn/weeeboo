import React from "react";
import { useHistory } from "react-router";
import "./filterbyyear.css";

export default function FilterByYear({ onChange }) {
  const history = useHistory();

  const years = [
    2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010,
    2009, 2008, 2007, 2006, 2005,
  ];

  const handleClick = (value) => {
    //Đã qua trang Season nên có OnChange
    history.push(`/season/${value}`);
    if (onChange) {
      //Nếu history trong onChange sẽ không qua đc trang season
      // history.push(`/season/${value}`);
      onChange(value);
    }
  };

  return (
    <div className="year_bg">
      <ul className="list_year">
        {years.map((year, id) => (
          <li key={id} className="item_year" onClick={() => handleClick(year)}>
            {year}
          </li>
        ))}
      </ul>
    </div>
  );
}
