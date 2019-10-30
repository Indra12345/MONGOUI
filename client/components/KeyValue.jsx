import React, { Component } from "react";
import styled from "styled-components";
import Select from "react-select";
import {Button} from "./App.jsx"

const Input = styled.input`
  border-radius: 10px;
  font-family: Monaco;
  font-size: 18px;
`

const CheckBox = styled.input`
  transform: scale(2);
  align-self: center;
  top: -5%;
  left: -5%;
`

const RowDiv = styled.div`
  font-family: 'Optima';
  font-size: 22px;
  background-color: ${props => (props.className === "even" ? `rgba(155,255,155,0.5)` : `rgba(0,255,0,0.2)`)};
  @media only screen and (max-width: 540px) {
      display: grid;
      grid-template-area: "a a a b b"
                          "c c c d d";
  };
  display: grid;
  grid-template-columns: 35% 20% 12% 12% 20%;
  border-radius: 5px;
  width: 100%;
  margin: 10px 0 10px 0;
  height: 45px;
  align-items: center;
  text-align: center;
`;

const typeOptions = [
  { value: "string", label: "String" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
  { value: "boolean", label: "Boolean" },
  { value: "mixed", label: "Mixed" },
  { value: "objectID", label: "ObjectID" },
  { value: "array", label: "Array" },
  { value: "decimal128", label: "Decimal128" },
  { value: "map", label: "Map" }
];

const KeyValue = props => {
  const {
    key,
    rowData,
    rowIndex,
    handleChangeKey,
    handleChangeRequired,
    handleChangeUnique,
    handleChangeType,
    deleteRow,
    updateKey
  } = props.keyValueProps;

  return (
    <RowDiv index={rowIndex} className={props.className}>
      <Input
        className="key"
        type="text"
        placeholder=""
        value={rowData.key}
        onChange={e => handleChangeKey(e, rowIndex)}
      />
      <Select
        className="select"
        onChange={e => handleChangeType(e, rowIndex)}
        options={typeOptions}
        value={{
          label: rowData.type
        }}
        isSearchable="true"
        value={{
          label: rowData.type
        }}
        closeMenuOnSelect="true"
      />
      <label className="checkbox">
        <CheckBox
          name="required"
          type="checkbox"
          checked={rowData.required}
          tooltip='required'
          onChange={e => handleChangeRequired(e, rowIndex)}
        />
      </label>
      <label className="checkbox">
        <CheckBox
          name="unique"
          type="checkbox"
          checked={rowData.unique}
          tooltip='unique'
          onChange={e => handleChangeUnique(e, rowIndex)}
        />
      </label>
      <Button
        className="deleteButton"
        onClick={e => {
          //e.preventDefault();
          deleteRow(rowIndex);
        }}
      >
      Delete
      </Button>
    </RowDiv>
  );
};

export default KeyValue;