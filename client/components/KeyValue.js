import React, { Component } from "react";
import ".././styles/KeyValue.css";
import Select from "react-select";

const typeOptions = [
  { value: "string", label: "String" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
  { value: "buffer", label: "Buffer" },
  { value: "boolean", label: "Boolean" },
  { value: "mixed", label: "Mixed" },
  { value: "objectID", label: "ObjectID" },
  { value: "array", label: "Array" },
  { value: "decimal128", label: "Decimal128" },
  { value: "map", label: "Map" }
];

const KeyValue = props => {
  const {
    rowData,
    rowIndex,
    handleChangeKey,
    handleChangeRequired,
    handleChangeUnique,
    handleChangeType,
    deleteRow,
  } = props.keyValueProps;

  React.useEffect(() => {
    console.log("keyvalue", rowData.key);
  });

  return (
    <div className="rowDiv">
        <input
          className="key"
          type="text"
          placeholder=""
          value={rowData.key}
          onChange={e => handleChangeKey(e, rowIndex)}
          required
        />
        <Select
          className= "select" 
          onChange= {e => handleChangeType(e, rowIndex)}
          options= {typeOptions}
          value={{
            label: rowData.type
          }}
          isSearchable="true"
          closeMenuOnSelect="true"
        />
        <label className="checkbox">
          <input
            name="required"
            type="checkbox"
            checked={rowData.required}
            onChange={e => handleChangeRequired(e, rowIndex)}
          />
        </label>
        <label className="checkbox">
          <input
            name="unique"
            type="checkbox"
            checked={rowData.unique}
            onChange={e => handleChangeUnique(e, rowIndex)}
          />
        </label>
        <button
          className="deleteButton"
          onClick={e => {
            e.preventDefault();
            deleteRow(rowIndex);
          }}
        >
          Delete Row
        </button>
    </div>
  );
};

export default KeyValue;
