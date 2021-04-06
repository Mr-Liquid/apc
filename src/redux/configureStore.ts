import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import promise from "redux-promise-middleware";
import createRootReducer, { State } from "./reducers";

export const history = createBrowserHistory();

const middleware = [promise];

const initialState: State = {
  issues: {
    isPending: false,
    isFulfilled: false,
    isRejected: false,
    data: {},
    error: null,
  },
  searchData: {
    org: "",
    repo: "",
  },
  filter: {
    state: "open",
    direction: "asc",
    sort: "created",
  },
};

export const configureStore = () => {
  const composeEnhancer: typeof compose =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancer(applyMiddleware(...middleware))
  );
  return store;
};
