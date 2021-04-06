import { createAsyncAction } from "redux-promise-middleware-actions";
import httpClient from "../../api/httpClient";

export const GET_ISSUES = "GET_ISSUES";
const makeUrl = (org: string, repo: string) =>
  `/issues/orgs/${org}/repos/${repo}`;

type QueryParams = {
  milestone?: string;
  state?: "open" | "closed" | "all";
  assignee?: string;
  creator?: string;
  mentioned?: string;
  labels?: string;
  sort?: "created" | "updated" | "comments";
  direction?: "asc" | "desc";
  since?: string;
  per_page?: number;
  page?: number;
};

type PathParams = {
  org: string;
  repo: string;
};

const DEFAULT_QUERY_PARMS = {
  per_page: 10,
  page: 1,
  direction: "asc",
};
export const getIssues = createAsyncAction(
  GET_ISSUES,
  async (pathParams: PathParams, queryParams?: QueryParams) => {
    const { org, repo } = pathParams;
    const { data } = await httpClient.get(makeUrl(org, repo), {
      params: { ...DEFAULT_QUERY_PARMS, ...queryParams },
    });
    return data;
  }
);
