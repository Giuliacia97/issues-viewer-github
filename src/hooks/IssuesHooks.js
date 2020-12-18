import { useState } from "react";
import http from "../services/https";

const IssuesHook = () => {
  const { request } = http();

  const [issues, setIssues] = useState([]);
  const [issue, setIssue] = useState(null);
  const [comments, setComments] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  
  const getIssues = async (user, repo) => {
    const { data } = await request.get(`${user}/${repo}/issues`);
    setIssues(data);
    getAvatarUrl(user, repo);
  };

  const getIssue = async (number, user, repo) => {
    const { data } = await request.get(`${user}/${repo}/issues/${number}`);
    setIssue(data);
    getAvatarUrl(user, repo);
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

const getAvatarUrl = async (user, repo) => {
  const { data } = await request.get(`${user}/${repo}`);
  setAvatarUrl(data.owner.avatar_url);
  console.log(data);
};

  return {
    issues,
    issue,
    setIssues,
    getIssues,
    getIssue,
    getComment,
    getAvatarUrl,
    comments,
    avatarUrl,
    loading,
    error
  };
};

export default IssuesHook;
