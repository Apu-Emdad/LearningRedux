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

/*  action starts  */
const CAKE_ORDERED = "CAKE_ORDERED";
/* action creator function */
function orderCake() {
  return {
    type: CAKE_ORDERED,
  };
}
/*  action ends  */

/* reducer starts */
const initialState = {
  numOfCakes: 10,
  numOfIceCreams: 20,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};
/* A reducer is a function that receives the current state and an action object, decides how to update the state if necessary, and returns the new state */
/* reducer ends */

/* store starts */
/* importing createStore method from redux. Createstore method takes reducer as its parameter */
const createStore = redux.createStore;
const store = createStore(reducer);

console.log(`Initial state`, store.getState()); // to get the current state

const unsubscribe = store.subscribe(() =>
  console.log(`update state`, store.getState())
); //to subscribe a listener

store.dispatch(orderCake()); // dispatching action creator as  function which returns an object = { type: CAKE_ORDERED,}
store.dispatch(orderCake());
store.dispatch(orderCake());

unsubscribe();

/* store ends */

/*==== Redux ends here =====  */

app.get("/", (req, res) => {
  res.send("hello from my first ever node");
});

app.listen(port, () => {
  console.log("listening to port", port);
});
