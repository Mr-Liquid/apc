import React, { useMemo } from "react";
import { TextField, Button, makeStyles, Theme } from "@material-ui/core";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { getIssues, setSearchData, makeFilter } from "../redux";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
type FormData = {
  org: string;
  repo: string;
};

export const SearchForm: React.FC<{}> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectFilter = useMemo(makeFilter, []);
  const filter = useSelector(selectFilter);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({ mode: "onSubmit" });

  const handleSearch: SubmitHandler<FormData> = (data) => {
    dispatch(getIssues({ ...data }, { ...filter }));
    dispatch(setSearchData(data));
  };

  return (
    <>
      <form
        className={classes.form}
        noValidate
        onSubmit={handleSubmit(handleSearch)}
      >
        <Controller
          defaultValue=""
          render={({ field }) => {
            return (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                required
                id="org"
                label="Organization"
                fullWidth
                autoComplete="off"
                autoFocus
                error={errors.org?.type === "required"}
                helperText={errors.org?.message}
              />
            );
          }}
          name="org"
          rules={{ required: "Organizarion cannot be empty!" }}
          control={control}
        />
        <Controller
          defaultValue=""
          render={({ field }) => {
            return (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                required
                id="repo"
                label="Repository"
                fullWidth
                autoComplete="off"
                autoFocus
                error={errors.repo?.type === "required"}
                helperText={errors.repo?.message}
              />
            );
          }}
          name="repo"
          rules={{ required: "Repository cannot be empty!" }}
          control={control}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Search
        </Button>
      </form>
    </>
  );
};
