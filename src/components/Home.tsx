import React from "react";
import { RouteComponentProps } from "react-router";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  Button,
  Link,
  Grid,
  Typography,
  Container,
  Box,
} from "@material-ui/core";
import { SearchForm } from "../components/SearchForm";
import { IssueList } from "../components/IssueList";
import { useAuth } from "../hooks/useAuth";

type Props = {} & RouteComponentProps;

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  authBtn: {
    marginTop: theme.spacing(2),
    "&:hover": {
      textDecoration: "none",
    },
  },
}));

export const Home: React.FC<Props> = (props) => {
  const [isAuthenticated] = useAuth();
  const classes = useStyles();
  return (
    <>
      <Container maxWidth={"xl"}>
        <Grid container spacing={3}>
          {!isAuthenticated() && (
            <Grid item xs={12}>
              <Box
                mt={2}
                display="flex"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
              >
                <Typography variant="h6">
                  You are not authorized to github.
                </Typography>
                <Link
                  href="http://localhost:3001/oauth"
                  className={classes.authBtn}
                >
                  <Button variant="contained">Authorize</Button>
                </Link>
              </Box>
            </Grid>
          )}

          {isAuthenticated() && (
            <>
              <Grid item xs={12} md={4} xl={4} lg={3}>
                <SearchForm />
              </Grid>
              <Grid item xs={12} md={8} xl={8} lg={9}>
                <IssueList />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </>
  );
};
