import React, { useEffect } from "react";
import Issue from "./Issue";
import IssuesHook from "../hooks/IssuesHooks";
import HeaderComponent from './Header';
import IconIssueComponent from './IconIssue';
import DateIssueComponent from './DateIssue';
import PaginationComponent from './Pagination';
import getIssues from '../lib/api/getIssues';
import renderLoading from '../lib/renderLoading';
import renderError from '../lib/renderError';
import incrementPage from '../lib/incrementPage';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bulma/css/bulma.css';
import '../css/Issues.css';


const Issues = () => {
    const { issues, getIssues } = IssuesHook();
    const user = "Giuliacia97";
    const repo = "example";

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
  
