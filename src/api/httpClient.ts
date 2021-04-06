import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const API_URL = `http://localhost:3001/api`;

const DEFAULT_OPTIONS: AxiosRequestConfig = {
  baseURL: API_URL,
  method: "get",
  headers: {
    "Content-Type": "application/json",
  },
};

const httpClient = (options: AxiosRequestConfig = {}): AxiosInstance => {
  // Create instance
  const instance = axios.create({ ...DEFAULT_OPTIONS, ...options });

  // Set the AUTH token for any request
  instance.interceptors.request.use(
    function (config) {
      const { url } = config;
      if (url === "/callback") {
        return config;
      }
      if (localStorage.getItem("github_access_token")) {
        const token = localStorage.getItem("github_access_token");
        config.headers.Authorization = `Bearer ${token}`;
        if (typeof config.params !== "undefined") {
          config.params = Object.keys(config.params).reduce(
            (acc: { [key: string]: string | number }, curKey) => {
              if (config.params[curKey] !== "") {
                acc[curKey] = config.params[curKey];
              }
              return acc;
            },
            {}
          );
        }
      } else {
        throw Error("No access token");
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (config) {
      return config;
    },
    function (err) {
      return Promise.reject(err);
    }
  );

  return instance;
};

export default httpClient();
