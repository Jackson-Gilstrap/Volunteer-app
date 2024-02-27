import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "api/v1/worksessions"
    : "http://localhost:3006/api/v1/worksessions";

export default axios.create({
  baseURL,
});
