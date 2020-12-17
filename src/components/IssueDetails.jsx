import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import IssuesHook from "../hooks/IssuesHooks";
import { moment_relative_time } from "../services/dates";
import '../css/Issues.css';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IssueDetails = ({user, repo}) => {
  const { getIssue, comments, issue } = IssuesHook();
  const { id } = useParams();

  useEffect(() => {
    getIssue(id, user, repo);
  }, []);

  return (
    issue !== null && (
      <div className="container">
        <button className="btn btn-back" onClick={() => window.history.back()}>
        <FontAwesomeIcon className="mr-2" icon={faArrowLeft} />
          BACK</button>
        <div className="row text-white mb-4">
          <div className="col">
            <span className="h2">{issue.title}</span>{" "}
            <span className="h2 text-muted">#{issue.number}</span>
            <p>
              <strong className="text-muted">{issue.user.login}</strong> opened
              this issue {moment_relative_time(issue.created_at)} ·{" "}
              {issue.comments} comment
            </p>
            <div className="issue-decription">{issue.body}</div>
          </div>
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
    )
  );
};

export default IssueDetails;
