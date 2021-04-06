import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, makeStyles } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { setFilter, makeFilter } from "../redux";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  select: {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

type Props = {};

export const IssueFilters: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const selectFilter = useMemo(makeFilter, []);
  const filter = useSelector(selectFilter);

  const handleChange = (event: any) =>
    dispatch(
      setFilter({
        ...filter,
        [event.target.name]: event.target.value,
      })
    );

  return (
    <Box display="flex" width="100%" justifyContent="flex-end">
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
        <Select
          name="state"
          classes={{ root: classes.select }}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={filter["state"]}
          onChange={handleChange}
          label="Status"
        >
          <MenuItem value={"all"}>All</MenuItem>
          <MenuItem value={"open"}>Open</MenuItem>
          <MenuItem value={"closed"}>Closed</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          Direction
        </InputLabel>
        <Select
          classes={{ root: classes.select }}
          name="direction"
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={filter["direction"]}
          onChange={handleChange}
          label="Direction"
        >
          <MenuItem value={"asc"}>Asc</MenuItem>
          <MenuItem value={"desc"}>Desc</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Sort by</InputLabel>
        <Select
          classes={{ root: classes.select }}
          name="sort"
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={filter["sort"]}
          onChange={handleChange}
          label="Sort by"
        >
          <MenuItem value={"created"}>Created</MenuItem>
          <MenuItem value={"updated"}>Updated</MenuItem>
          <MenuItem value={"comments"}>Comments</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
