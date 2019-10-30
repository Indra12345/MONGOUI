import * as types from "../constants/types";

const defaultState = [
  {
    key: "friendlyName",
    type: "String",
    required: true,
    unique: false,
  },
  {
    key: "age",
    type: "Number",
    required: true,
    unique: false,
  },
  {
    key: "birthday",
    type: "Date",
    required: true,
    unique: false,
  },
  {
    key: "isAwesome",
    type: "Boolean",
    required: false,
    unique: true,
  },
  {
    key: "isAwesome",
    type: "Boolean",
    required: false,
    unique: true,
  },
];

export default (state = defaultState, action) => {
  let rows = Object.values(state);
  let rowNum;
  switch (action.type) {
    case types.ADD_ROW:
      rows[rows.length]=action.payload;
      return rows;
    case types.DELETE_ROW:
      rowNum = action.payload;
      rows.splice(rowNum,1);
      return rows;
    case types.UPDATE_KEY:
      const { index, newKey } = action.payload;
      rows[index].key = newKey;
      return rows;
    case types.UPDATE_TYPE:
      const { row, newType} = action.payload;
      rows[row].type = newType;
      return rows;
    case types.UPDATE_REQUIRED:
      rowNum = action.payload;
      rows[rowNum].required = !state[rowNum].required;
      return rows;
    case types.UPDATE_UNIQUE:
      rowNum = action.payload;
      rows[rowNum].unique = !state[rowNum].unique;
      return rows;
    default:
      return [...state];
  }
};
