import React, { useEffect } from "react";
import Labels from './Labels';
import Milestones from './Milestones';
import '../css/Issues.css';
import { faArrowDown, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PacmanLoader} from 'react-spinners';
import Issues from "./Issues";

const Sidebar = ({user, repo, issue}) => {
    return (
        <>
            <div className="py-3">
                <p>Assignees</p>
                <p>
                    {issue.assignee != null && (
                        <>
                        <img className="mr-1" src={issue.assignee.avatar_url} alt={`${user}/${repo}`} width="30px" height="30px"/>
                        <strong className="text-white">{issue.assignee.login}</strong>  
                        </>
                    ) || 
                    issue.assignee == null && (
                    <span className="ml-1">Nobody</span> 
                    )}
                </p>
            </div>
            <div className="card-bordered py-3">
                <p>Labels</p>
                <Labels labels={issue.labels} />
            </div>
            <div className="card-bordered py-3">
              <p>Milestone</p>
              <Milestones milestone={issue.milestone} />
            </div>
        </>
    )
}
export default Sidebar;