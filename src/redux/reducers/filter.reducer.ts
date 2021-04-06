import { SET_FILTER, CLEAR_FILTER } from "../actions";
import { State } from "./";

type ReducerState = State["filter"];

export const FilterReducer = (
  state: ReducerState = {
    state: "all",
    sort: "created",
    direction: "asc",
  },
  action: any
) => {
  switch (action.type) {
    case SET_FILTER:
      return Object.assign({}, state, { ...action.payload });
    case CLEAR_FILTER:
      return {};
    default:
      return state;
  }
};
