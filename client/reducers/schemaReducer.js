import * as types from "../constants/types";

const defaultState = {
  schemaName:'',
  schemaGenerated:'',
}

export default (state = defaultState, action) => {
  let schemaName,schemaGenerated;
  switch(action.type){
    case types.UPDATE_SCHEMA:
      schemaGenerated = action.payload;
      console.log('SCHEMA GENERATEDDDDDDDDDDDD \N',schemaGenerated)
      return {
        ...state,
        schemaGenerated,
      }

    case types.UPDATE_SCHEMA_NAME:
      schemaName = action.payload;
      return {
        ...state,
        schemaName,
      }
      
    default:
      return {...state}
  }
}
