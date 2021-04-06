import { createSelector } from "reselect";
import { State } from "../reducers";

const getFilter = (state: State) => state.filter;

export const makeFilter = () => createSelector(getFilter, (filter) => filter);
