import "./Pages.css";
import React from 'react';

function addPages(pageInt, setPage) {
  return <a href="" onClick={(e)=>setPage(e)}>{pageInt}</a>;
}

const Pages = ({ pageNum = 5, setPage }) => {
  const pages = [];
  for (var i = 1; i <= pageNum; i++) {
    pages.push(addPages(i, setPage));
  }
  return <div className="pageFooter" >{pages}</div>;
};

export default Pages;
