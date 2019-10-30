import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addRow,
  deleteRow,
  updateKey,
  updateType,
  updateRequired,
  updateUnique,
  updateSchema,
  updateSchemaName
} from "../actions/actions";
import styled from "styled-components";
import Window from "./Window.jsx";
import Schema from "../components/Schema.jsx";

const DashboardWrapper = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  min-height: 500px;
`;

const WindowWrapper = styled.section`
  width: 100%;
  border: 2px solid #009e28;
  border-radius: 10px;
`;

const mapStateToProps = store => ({
  myrows: store.rows,
  myschema: store.schemas
});

// think about the new prop function here as this.setState for our Redux Store
const mapDispatchToProps = dispatch => ({
  addRow: () => dispatch(addRow()),
  deleteRow: index => dispatch(deleteRow(index)),
  updateKey: (index, newKey) => dispatch(updateKey(index, newKey)),
  updateType: (index, newType) => dispatch(updateType(index, newType)),
  updateRequired: index => dispatch(updateRequired(index)),
  updateUnique: index => dispatch(updateUnique(index)),
  updateSchema: schemaString => dispatch(updateSchema(schemaString)),
  updateSchemaName: schemaName => dispatch(updateSchemaName(schemaName))
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.toggle = false;
  }
  componentDidMount(){
    this.props.schemaHandler();
  }
  componentDidUpdate(){
    if(this.toggle){
      this.props.schemaHandler();
      this.toggle=false;
    }
  }
  deleteRow(rowIndex) {
    this.toggle=true;
    return this.props.deleteRow(rowIndex);
  }

  handleChangeRequired(event, rowIndex) {
    this.toggle=true;
    return this.props.updateRequired(rowIndex);
  }

  handleChangeUnique(event, rowIndex) {
    this.toggle=true
    return this.props.updateUnique(rowIndex);
  }

  handleChangeKey(event, rowIndex) {
    this.toggle=true;
    return this.props.updateKey(rowIndex, event.target.value);
  }

  handleChangeType(event, rowIndex) {
    this.toggle=true;
    return this.props.updateType(rowIndex, event.label);
  }

  render() {
    const keyValueProps = {
      deleteRow: this.deleteRow.bind(this),
      handleChangeRequired: this.handleChangeRequired.bind(this),
      handleChangeUnique: this.handleChangeUnique.bind(this),
      handleChangeKey: this.handleChangeKey.bind(this),
      handleChangeType: this.handleChangeType.bind(this)
    };

    return (
      <DashboardWrapper>
        <WindowWrapper>
          <Window keyValueProps={keyValueProps} />
        </WindowWrapper>
      </DashboardWrapper>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

