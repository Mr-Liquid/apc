import { combineReducers } from "redux";
import { IssuesReducer } from "./issues.reducer";
import { SearchDataReducer } from "./searchData.reducer";
import { FilterReducer } from "./filter.reducer";

const rootReducer = () =>
  combineReducers({
    issues: IssuesReducer,
    searchData: SearchDataReducer,
    filter: FilterReducer,
  });

export interface State {
  issues: {
    isPending: boolean;
    isFulfilled: boolean;
    isRejected: boolean;
    data: any;
    error: any;
  };
  searchData: {
    org: string;
    repo: string;
  };
  filter: {
    sort: "created" | "updated" | "comments";
    direction: "asc" | "desc";
    state: "open" | "closed" | "all";
  };
}

export default rootReducer;
