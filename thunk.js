const redux = require("redux");
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");
const reduxLogger = require("redux-logger");

const createStore = redux.createStore;
const applyMiddleWare = redux.applyMiddleware;

/* ===== Initial State ==== */
const initialState = {
  loading: false,
  users: [],
  error: "",
};

/* ==== Actions ==== */

const FETCH_USER_REQUESTED = "FETCH_USER_REQUESTED";
const FETCH_USER_SUCCEEDED = "FETCH_USER_SUCCEEDED";
const FETCH_USER_FAILED = "FETCH_USER_FAILED";

const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUESTED,
  };
};

const fetchUserSuccess = (users) => {
  return {
    type: FETCH_USER_SUCCEEDED,
    payload: users,
  };
};

const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILED,
    payload: error,
  };
};

const fetchUser = () => {
  return function (dispatch, getState) {
    dispatch(fetchUserRequest());

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const users = res.data.map((user) => user.name);
        dispatch(fetchUserSuccess(users));
      })
      .catch((err) => {
        dispatch(fetchUserFailure(err.message));
      });
  };
};

/* ==== reducer ==== */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCEEDED:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: ``,
      };
    case FETCH_USER_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

/* ==== Store ==== */

const store = createStore(
  reducer,
  applyMiddleWare(thunkMiddleware, reduxLogger.logger)
);

store.dispatch(fetchUser());
