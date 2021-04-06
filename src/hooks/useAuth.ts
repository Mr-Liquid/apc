import React from "react";
import qs from "query-string";
import { useHistory } from "react-router-dom";

export const useAuth = (): [
  isAuthenticated: () => boolean,
  handleAuthentication: () => void,
  logOut: () => void
] => {
  const history = useHistory();
  const handleAuthentication = () => {
    const queryParams = qs.parse(history.location.search) as {
      access_token: string;
    };
    if (queryParams && queryParams.access_token) {
      setSession(queryParams);
      history.replace({
        pathname: "/",
        search: "",
      });
    }
  };

  const setSession = (authResult: { access_token: string }) => {
    localStorage.setItem("github_access_token", authResult.access_token);
  };

  const logOut = () => {
    localStorage.removeItem("github_access_token");
    history.replace({
      pathname: "/",
      search: "",
    });
  };

  const isAuthenticated = () => !!localStorage.getItem("github_access_token");

  return [isAuthenticated, handleAuthentication, logOut];
};
