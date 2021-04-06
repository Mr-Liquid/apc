export const SET_SEARCH_DATA = "SET_SEARCH_DATA";
export const CLEAR_SEARCH_DATA = "CLEAR_SEARCH_DATA";

type SearchDataParams = {
  org: string;
  repo: string;
};
export const setSearchData = (data: SearchDataParams) => ({
  type: SET_SEARCH_DATA,
  payload: data,
});

export const clearSearchData = () => ({
  type: CLEAR_SEARCH_DATA,
});
