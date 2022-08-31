const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;

const app = express(); //initializing express framework
require("dotenv").config();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json()); //to post json files

/*==== Redux starts here =====  */

const redux = require("redux");

const applyMiddleWare = redux.applyMiddleware;

/*----  action starts  ----*/
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";
/* action creator function */
function orderCake(qty = 1) {
  return {
    type: CAKE_ORDERED,
    payload: qty
  };
}
function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty
  };
}
function orderIceCream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty
  };
}
function restockIceCream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty
  };
}
/*----  action ends  ----*/

/*---- reducer starts ----*/
const combineReducers = redux.combineReducers;

const initialCakeState = {
  numOfCakes: 10
};

const initialIceCreamState = {
  numOfIceCreams: 20
};

/* const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
}; */
/* A reducer is a function that receives the current state and an action object, decides how to update the state if necessary, and returns the new state */

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
});
/*---- reducer ends ----*/

/*---- store starts ----*/
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

/* importing createStore method from redux. Createstore method takes reducer as its parameter.*/
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const store = createStore(rootReducer, applyMiddleWare(logger));

console.log(`Initial state`, store.getState()); // to get the current state

//to subscribe a listener
const unsubscribe = store.subscribe(() =>
  console.log(`update state`, store.getState())
);

// dispatching action creator as  function which returns an object = { type: CAKE_ORDERED,}
/* store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());

store.dispatch(restockCake(3)); */

//implementing bindActionCreators
const actions = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
);


// unsubscribe();

/*---- store ends ----*/

/* ---- Dispatching Actions starts ---- */
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(5);
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(2);
/* ---- Dispatching Actions ends ---- */

/*==== Redux ends here =====  */

app.get("/", (req, res) => {
  res.send("hello from my first ever node");
});

app.listen(port, () => {
  console.log("listening to port", port);
});
