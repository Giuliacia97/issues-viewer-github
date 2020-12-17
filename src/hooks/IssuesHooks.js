import { useState } from "react";
import http from "../services/https";

const IssuesHook = () => {
  const { request } = http();

  const [issues, setIssues] = useState([]);
  const [issue, setIssue] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const getIssues = async (user, repo) => {
    const { data } = await request.get(`${user}/${repo}/issues`);
    setIssues(data);
  };

  const getIssue = async (number, user, repo) => {
    const { data } = await request.get(`${user}/${repo}/issues/${number}`);
    setIssue(data);
    getComment(data.number, user, repo);
    console.log(data)
  };

  const getComment = async (number, user, repo) => {
    let ignore = false;
    try{
      setLoading(true);
      setError({});
      const { data } = await request.get(
        `${user}/${repo}/issues/${number}/comments`
      );
      if (!ignore) setComments(data);
    } 
    catch (err){
      setError(err);
    }
    setLoading(false);
  }

  return {
    issues,
    issue,
    setIssues,
    getIssues,
    getIssue,
    getComment,
    comments,
    loading,
    error
  };
};

export default IssuesHook;
