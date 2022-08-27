const redux = require("redux");
const produce = require("immer").produce;
const createStore = redux.createStore;

const initialState = {
  name: "Apu Emdad",
  address: {
    city: "Dhaka",
    country: "Bangladesh",
  },
};

//action
const CITY_UPDATED = "CITY_UPDATED";
function updateCity(city) {
  return {
    type: CITY_UPDATED,
    payload: city,
  };
}

//reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CITY_UPDATED: {
      return produce(state, (draft) => {
        draft.address.city = action.payload;
      });
    }
    default: {
      return state;
    }
  }
};

//store
const store = createStore(reducer);
console.log(`initial state`, store.getState());

const unsubscribe = store.subscribe(() => {
  console.log(`updated state`, store.getState());
});
store.dispatch(updateCity("Chittagong"));

unsubscribe();

//store
