import React, { useEffect, ReactElement } from "react";
import "./App.css";
import {
  Route,
  Switch,
  RouteComponentProps,
  useHistory,
} from "react-router-dom";
import { NoMatch } from "./components/NoMatch";
import { Home } from "./components/Home";
import { useAuth } from "./hooks/useAuth";
import GitHubIcon from "@material-ui/icons/GitHub";

import {
  Button,
  Link,
  Grid,
  Typography,
  Container,
  useScrollTrigger,
  CssBaseline,
  AppBar,
  Toolbar,
  Box,
} from "@material-ui/core";

function ElevationScroll(props: { children: ReactElement }) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export const App: React.FC<{}> = () => {
  const [isAuthenticated, handleAuthentication, logOut] = useAuth();
  const authenticationHandler = (props: RouteComponentProps) => {
    if (/access_token/.test(props.location.search)) {
      handleAuthentication();
    }
  };
  const handleLogout = () => logOut();
  return (
    <div>
      <CssBaseline />
      <ElevationScroll>
        <AppBar>
          <Toolbar>
            <Box mr={2}>
              <GitHubIcon />
            </Box>
            <Typography
              variant="h6"
              style={{
                flexGrow: 1,
              }}
            >
              Github Issue Searcher
            </Typography>
            {isAuthenticated() && (
              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route
          exact
          path="/callback"
          render={(props) => {
            authenticationHandler(props);
            return null;
          }}
        />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
};
