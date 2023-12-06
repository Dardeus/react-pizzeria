import ReactPaginate from "react-paginate";
import React from "react";

import styles from './Pagination.module.scss'

const Pagination = ({setCurrentPage}) => {
  return(
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => setCurrentPage(e.selected+1)}
      pageRangeDisplayed={8}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  )
}
export default Pagination