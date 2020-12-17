import axios from "axios";

const http = () => {
  const request = axios.create({
    baseURL: "https://api.github.com/repos/",
    headers: {
      "Content-Type": "application/json",
      Authorization:"646756b1a7ef365f279ec571d90e0eade69a7645"
    }
  });

  return {
    request
  };
};

export default http;
