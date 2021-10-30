import React from "react";
import { useDispatch } from "react-redux";
import { isActive } from "../../action/index";
import "./pagination.css";

export const Pagination = (props) => {
  const { moviePerPage, totalMovie, paginate, currentPage } = props;

  // const isActived = useSelector((state) => state.isActive);

  const dispatch = useDispatch();

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMovie / moviePerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (number) => {
    paginate(number);
    dispatch(isActive());
  };

  return (
    <nav>
      <ul className="paginationn">
        {pageNumbers.map((number) => (
          <li key={number} className="page-itemm">
            <div
              onClick={() => handleClick(number)}
              className={`page-linkk ${currentPage === number ? "active" : ""}`}
            >
              {number}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};
