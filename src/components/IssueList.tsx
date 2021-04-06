import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeIssues, makeSearchData, getIssues, makeFilter } from "../redux";
import dayjs from "dayjs";
import Chip from "@material-ui/core/Chip";
import { getContrast } from "./utils";
import clsx from "clsx";
import lodashGet from "lodash.get";
import {
  Typography,
  Box,
  makeStyles,
  Theme,
  LinearProgress,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { Skeleton } from "@material-ui/lab";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { IssueFilters } from "./IssueFilters";
import { Notification } from "./Notification";

type Props = {};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "flex",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(2, 0, 0),
  },
  loadingProgress: {
    visibility: "hidden",
    "&.show": {
      visibility: "visible",
    },
  },
  statusIcon: {
    color: "gray",
    "&.open": {
      color: "green",
    },
    "&.closed": {
      color: "red",
    },
  },
  listAvatar: {
    minWidth: "40px",
  },
}));

export const IssueList: React.FC<Props> = () => {
  const classes = useStyles();
  const selectIssues = useMemo(makeIssues, []);
  const selectSearchData = useMemo(makeSearchData, []);
  const selectFilter = useMemo(makeFilter, []);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const [_page, setPage] = useState(1);
  const {
    data: {
      issues = [],
      pagination = {
        last: {
          page: 0,
        },
      },
    },
    error,
    isPending,
    isFulfilled,
    isRejected,
  } = useSelector(selectIssues);

  const { org, repo } = useSelector(selectSearchData);
  const handleChange = (event: any, value: number) => {
    setPage(value);
    dispatch(
      getIssues(
        { org, repo },
        {
          ...filter,
          page: value,
        }
      )
    );
  };

  useEffect(() => {
    if (org && repo) {
      setPage(1);
      dispatch(
        getIssues(
          { org, repo },
          {
            ...filter,
          }
        )
      );
    }
  }, [filter]);

  useEffect(() => {
    setPage(1);
  }, [org, repo]);

  const renderLabels = (labels: any[]) => {
    return labels.map((item: any) => {
      return (
        <Chip
          key={item.id}
          size="small"
          label={item.name}
          style={{
            backgroundColor: `#${item.color}`,
            color: getContrast(item.color),
          }}
        />
      );
    });
  };

  const renderListItems = (item: any, index: number) => {
    return (
      <React.Fragment key={item.id}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar className={classes.listAvatar}>
            {isPending ? (
              <Skeleton
                animation="wave"
                variant="circle"
                width={22}
                height={22}
              />
            ) : (
              <ErrorOutlineIcon
                className={clsx(classes.statusIcon, item.state)}
              />
            )}
          </ListItemAvatar>
          <ListItemText
            primary={
              isPending ? (
                <Skeleton
                  animation="wave"
                  height={25}
                  width="60%"
                  style={{ marginBottom: 5 }}
                />
              ) : (
                <>
                  <strong>{item.title}</strong>
                  &nbsp;
                  {renderLabels(item.labels)}
                </>
              )
            }
            secondaryTypographyProps={{
              noWrap: true,
            }}
            secondary={
              isPending ? (
                <Skeleton animation="wave" height={18} width={"100%"} />
              ) : (
                <Box component="span" display="flex" mt={0.5}>
                  #{item.number} opened on&nbsp;
                  {dayjs(item.created_at).format("D MMM YYYY")}&nbsp;by&nbsp;
                  {item.user.login}
                  {item.comments > 0 && (
                    <Box display="flex" component="span" ml={1}>
                      <ChatBubbleOutlineIcon fontSize="small" />
                      &nbsp; {item.comments}
                    </Box>
                  )}
                </Box>
              )
            }
          />
        </ListItem>
        {issues.length - 1 !== index && (
          <Divider variant="middle" component="li" />
        )}
      </React.Fragment>
    );
  };

  let pageCount = 0;
  if (lodashGet(pagination, "last.page", false)) {
    pageCount = parseInt(pagination.last.page, 10);
  } else if (lodashGet(pagination, "prev.page", false)) {
    pageCount = parseInt(pagination.prev.page, 10) + 1;
  }

  return (
    <Box mt={2}>
      <LinearProgress
        color="primary"
        className={clsx(
          classes.loadingProgress,
          isPending && issues.length === 0 && "show"
        )}
      />
      {!isRejected && issues.length !== 0 && (
        <List className={classes.root}>
          <ListItem>
            <IssueFilters />
          </ListItem>
          {issues.map(renderListItems)}
        </List>
      )}
      {!isRejected && issues.length === 0 && (
        <Box display="flex" justifyContent="center" mt={5}>
          <Typography variant="h6">No data found</Typography>
        </Box>
      )}
      {isRejected && <Notification type="error" message={error.message} />}
      <Pagination
        variant="outlined"
        shape="rounded"
        className={classes.pagination}
        disabled={!issues.length || isPending}
        count={pageCount}
        page={_page}
        onChange={handleChange}
      />
    </Box>
  );
};
