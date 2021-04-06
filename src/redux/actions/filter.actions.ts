import { State } from "../reducers";

export const SET_FILTER = "SET_FILTER";
export const CLEAR_FILTER = "CLEAR_FILTER";

type DataParams = State["filter"];

export const setFilter = (data: DataParams) => ({
  type: SET_FILTER,
  payload: data,
});

export const clearFilter = () => ({ type: CLEAR_FILTER });
