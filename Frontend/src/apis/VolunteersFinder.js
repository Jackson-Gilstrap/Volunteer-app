import axios from "axios";

// NODE_ENV = 'development'
// NODE_ENV = 'production'

const baseURL =
  process.env.NODE_ENV === "production"
    ? "api/v1/volunteers"
    : "http://localhost:3006/api/v1/volunteers";

export default axios.create({
  baseURL,
});
