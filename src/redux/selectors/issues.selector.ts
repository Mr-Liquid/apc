import { createSelector } from "reselect";
import { State } from "../reducers";

const getIssues = (state: State) => state.issues;

export const makeIssues = () => createSelector(getIssues, (issues) => issues);
