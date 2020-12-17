import React, { useEffect } from "react";
import Issue from "./Issue";
import IssuesHook from "../hooks/IssuesHooks";
import PaginationComponent from './Pagination';
import incrementPage from '../lib/incrementPage';
import 'bulma/css/bulma.css';
import '../css/Issues.css';


const Issues = ({user, repo}) => {
    const { issues, getIssues } = IssuesHook();

    useEffect(() => {
      getIssues(user, repo);
    }, []);
  
    return (
      <div className="card border-0">
        <ul className="list-group ">    
          {issues.map((item) => (
            <Issue key={item.id} issue={item} />
          ))}
        </ul>
      </div>
    );
  };
  
  export default Issues;
  
