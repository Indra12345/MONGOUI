import * as types from "../constants/types";

export const addRow = () => ({
  type: types.ADD_ROW,
  payload: {
    key: "",
    type: "",
    required: false,
    unique: false
  }
});



export const updateKey = (index, newKey) => ({
  type: types.UPDATE_KEY,
  payload: {
    index,
    newKey
  }
});

export const updateType = (row, newType) => ({
  type: types.UPDATE_TYPE,
  payload: {
    row,
    newType
  }
});

export const updateRequired = rowNum => ({
  type: types.UPDATE_REQUIRED,
  payload: rowNum
});

export const updateUnique = rowNum => ({
  type: types.UPDATE_UNIQUE,
  payload: rowNum
});

export const updateSchema = schemaString => ({
  type: types.UPDATE_SCHEMA,
  payload: schemaString
});

export const updateSchemaName = schemaName => ({
  type: types.UPDATE_SCHEMA_NAME,
  payload: schemaName
});


export const updateText = text => ({
  type : types.UPDATE_TEXT_FROM_TEXTAREA,
  payload:Text 
})