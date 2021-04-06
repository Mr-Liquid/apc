import React from "react";
import { Container, Typography } from "@material-ui/core";

export const NoMatch: React.FC<{}> = () => (
  <Container maxWidth={"xl"}>
    <Typography variant="h3">Page not found</Typography>
  </Container>
);
