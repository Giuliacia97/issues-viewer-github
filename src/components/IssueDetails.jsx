import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import IssuesHook from "../hooks/IssuesHooks";
import { moment_relative_time } from "../services/dates";
import '../css/Issues.css';
import { faArrowDown, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PacmanLoader} from 'react-spinners';
import Sidebar from "./Sidebar";

const IssueDetails = ({user, repo}) => {
  const { getIssue, comments, issue, loading} = IssuesHook();
  const { id } = useParams();

  useEffect(() => {
    getIssue(id, user, repo);
  }, []);

  if(loading){
    return (
      <div className='container d-table'>
        <PacmanLoader
          color={'goldenrod'}
          size={'50px'} 
          loading={loading}/>
      </div>
    )
  }

  return (
    issue !== null && (
      <div className="container">
        <button className="btn btn-back" onClick={() => window.history.back()}>
        <FontAwesomeIcon className="mr-2" icon={faArrowLeft} />BACK
        </button>
        <div className="d-flex">
          <div className="col-9 pl-0">
            <div className="text-white mb-4">
              <span className="h2">{issue.title}</span>{" "}
              <span className="h2 text-muted">#{issue.number}</span>
              <p>
                <strong className="text-muted">{issue.user.login}</strong> opened
                this issue {moment_relative_time(issue.created_at)} ·{" "}
                {issue.comments} comment
              </p>
              <div className="issue-decription">{issue.body}</div>
            </div>
            <div className="text-center">
            <FontAwesomeIcon className="font-sizeSVG" icon={faArrowDown} />
            </div>
            <span className="h2 text-white">Comments:</span>
              {comments.map((item) => (
                <div className="row mt-2 mb-4" key={item.id}>
                  <div className="col">
                    <div className="card card-comment">
                      <div className="card-header">
                        {item.user.login} commented{" "}
                        {moment_relative_time(item.created_at)}
                      </div>
                      <div className="card-body">{item.body}</div>
                    </div>
                  </div>
                </div>
              ))}
              {comments == 0 && (
                <div className="h5 gold-color">
                  No comments Available!
                </div>
              )}
          </div>
          <div className="col-3 text-white">
            <Sidebar issue={issue} user={user} repo={repo} />
          </div>
        </div>
      </div>
    )
  );
};

export default IssueDetails;
