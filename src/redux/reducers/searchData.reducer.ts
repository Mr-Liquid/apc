import { SET_SEARCH_DATA, CLEAR_SEARCH_DATA } from "../actions";

export const SearchDataReducer = (state = {}, action: any) => {
  switch (action.type) {
    case SET_SEARCH_DATA:
      return Object.assign({}, state, { ...action.payload });
    case CLEAR_SEARCH_DATA:
      return {};
    default:
      return state;
  }
};
