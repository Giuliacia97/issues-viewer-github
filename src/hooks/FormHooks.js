import React, {useState} from 'react';
import http from "../services/https";

const FormHook = (callback) => {
  const [inputs, setInputs] = useState({});
  const [newissue, setNewIssue] = useState({});

  const { request } = http();

  const sendNewIssue = async (user, repo, title, body) => {
    debugger;
    const { data } = await request.post(`${user}/${repo}/issues`,{
      owner:user,
      repo,
      title,
      body
    });
    setNewIssue(data);
  };
    const handleSubmit = (user, repo, title, body) => {
      sendNewIssue(user, repo, title, body);
    }
    const handleInputChange = (event) => {
      event.persist();
      setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    }
    return {
      handleSubmit,
      handleInputChange,
      sendNewIssue,
      inputs
    };
  }


  export default FormHook;