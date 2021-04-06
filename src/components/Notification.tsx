import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

type Props = {
  type: "error" | "warning" | "info" | "success";
  message: string;
};

export const Notification: React.FC<Props> = ({ type, message }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity={type}>{message}</Alert>
    </div>
  );
};
