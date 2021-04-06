import { createSelector } from "reselect";
import { State } from "../reducers";

const getSearchData = (state: State) => state.searchData;

export const makeSearchData = () =>
  createSelector(getSearchData, (searchData) => searchData);
