// import keyreducer from "./keyreducer";
// import dropdownreducer from "./dropdownreducer";
import rowReducer from "./rowreducer";
import schemaReducer from "./schemaReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  rows: rowReducer,
  schemas: schemaReducer,
});

export default reducers;
