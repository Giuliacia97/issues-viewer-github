import React, { useEffect } from "react";
import 'bulma/css/bulma.css';
import '../css/Issues.css';
import { moment_relative_time } from "../services/dates";
import IssuesHook from "../hooks/IssuesHooks";
import FormHook from "../hooks/FormHooks";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Form} from 'react-bootstrap';


const AddIssue = ({user, repo}) => {
  const { issues, getIssues, avatarUrl} = IssuesHook();
    useEffect(() => {
      getIssues(user, repo);
    }, []);

    const signup = () => {
      alert(`User Created!
             title: ${inputs.title}
             body: ${inputs.body}
             user: ${inputs.user}
             repo: ${inputs.repo}`);
    }
    const {inputs, handleInputChange, handleSubmit} = FormHook(signup);


    return (
      <>
        <div className="mb-2">
          <button className="btn btn-back" onClick={() => window.history.back()}>
            <FontAwesomeIcon className="mr-2" icon={faArrowLeft} />BACK
          </button>
        </div>
        <div className="my-2">
          <span className="h2 text-white">Add Issue</span>
          <p>
            <strong className="text-muted">Insert the information needed to add a new issue to the repository</strong>
          </p>
        </div>
        <div className="col-12 d-flex p-0">
          <div className="col-1 pl-0">
            <img src={avatarUrl} alt={`${user}/${repo}`}/>
          </div>
          <div className="issue-decription col-11">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="title">
                <Form.Control type="text" name="title" value={inputs.title || ''} placeholder="Title"  onChange={handleInputChange} required/>
              </Form.Group>
              <Form.Group controlId="body">
              <Form.Control as="textarea" name="body" value={inputs.body || ''} placeholder="Leave a comment" rows={3}  onChange={handleInputChange}/>
              </Form.Group>
              <Form.Group className="d-none" controlId="user">
                <Form.Control type="text" name="user" value={user} placeholder="User" onChange={handleInputChange}/>
              </Form.Group>
              <Form.Group className="d-none" controlId="repo">
                <Form.Control type="text" name="repo" value={repo} placeholder="Repo" onChange={handleInputChange}/>
              </Form.Group>
              <div className="text-right">
                <button type="submit" className="btn btn-success">Submit new issue
                </button>
              </div>
            </Form>
          </div>
        </div>
      </>
    );
}

export default AddIssue;