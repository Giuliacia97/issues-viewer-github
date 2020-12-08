import { useState } from "react";
import http from "../services/https";

const IssuesHook = () => {
  const { request } = http();

  const [issues, setIssues] = useState([]);
  const [issue, setIssue] = useState(null);
  const [comments, setComments] = useState([]);

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
    const { data } = await request.get(
      `${user}/${repo}/issues/${number}/comments`
    );
    setComments(data);
  };

  return {
    issues,
    issue,
    setIssues,
    getIssues,
    getIssue,
    getComment,
    comments
  };
};

export default IssuesHook;
