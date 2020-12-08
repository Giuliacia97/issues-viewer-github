import React from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Issue = ({ ...props }) => {
  const { issue } = props;
  const { title, number, user, created_at, comments } = issue;
  const history = useHistory();

  const goToDetails = (number) => {
    console.log("here");
    history.push(`/issues/${number}`);
  };
  return (
    <div className="panel-block panel-issue">
    <li
      className="list-group-item align-items-center bk-transparent"
      onClick={() => goToDetails(number)}
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="_title">{title}</h5>
        {comments > 0 && <small>Comments {comments}</small>}
      </div>
      <p className="time">
        # {number} opened {moment(created_at).fromNow()} by {user.login}
      </p>
    </li>
    <span className="column show-body has-text-right is-pulled-right green-icon" onClick={() => goToDetails(number)}>
      <FontAwesomeIcon icon={faEye} />
    </span>
    </div>
  );
};

export default Issue;
