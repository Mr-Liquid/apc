import { GET_ISSUES } from "../actions";

type IssesState = {
  isPending: boolean;
  isFulfilled: boolean;
  isRejected: boolean;
  data: any;
  error: any;
};

export const IssuesReducer = (
  state: IssesState = {
    isPending: false,
    isFulfilled: false,
    isRejected: false,
    data: {},
    error: null,
  },
  action: any
) => {
  switch (action.type) {
    case `${GET_ISSUES}_PENDING`:
      return Object.assign({}, state, {
        isPending: true,
        isFulfilled: false,
        isRejected: false,
        data: state.data,
        error: null,
      });
    case `${GET_ISSUES}_FULFILLED`:
      return Object.assign({}, state, {
        isPending: false,
        isFulfilled: true,
        isRejected: false,
        data: action.payload,
        error: null,
      });
    case `${GET_ISSUES}_REJECTED`:
      return Object.assign({}, state, {
        isPending: false,
        isFulfilled: false,
        isRejected: true,
        data: {},
        error: action.payload,
      });
    default:
      return state;
  }
};
