import React, { useState, useEffect } from "react";
import Issue from "./Issue";
import PaginationComponent from "./Pagination";
import incrementPage from '../lib/incrementPage';
import IssuesHook from "../hooks/IssuesHooks";
import PageHook from "../hooks/PageHook";
//import Pagination from "react-js-pagination";
import 'bulma/css/bulma.css';
import '../css/Issues.css';


const Issues = ({user, repo}) => {
    const { issues, getIssues } = IssuesHook();
    // const { handlePageChange, activePage } = PageHook();

    useEffect(() => {
      getIssues(user, repo);
    }, []);

  
    return (
      <>
        <div className="text-right mb-2">
          <a className="btn btn-success" role="button" href="/new/issue">New issue</a>
        </div>
        <div className="card border-0">
          <ul className="list-group ">    
            {issues.map((item) => (
              <Issue key={item.id} issue={item} />
            ))}
          </ul>
        </div>
        <div>
        {/* <Pagination
          activePage={activePage}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          onChange={handlePageChange(this)}
          onClick={handlePageChange(this)}
        /> */}
      </div>
      </>
    );
  };
  
  export default Issues;
  
