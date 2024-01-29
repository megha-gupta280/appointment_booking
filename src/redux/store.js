import { createStore, applyMiddleware } from 'redux';
import TimeSlots from "./reducers/TimeSlots";
import {thunk} from 'redux-thunk';

//create a store and bind reducer and middleware i.e., thunk
const store = createStore(
    TimeSlots,
    applyMiddleware(thunk)
  );

export default store;