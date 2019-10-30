import React, {Component} from "react";
import { connect } from "react-redux";
import { HalfPage } from "./App.jsx";
import { updateSchema } from "../actions/actions.js"

const mapStateToProps = store => ({
  myschemas: store.schemas.schemaGenerated,
});

const mapDispatchToProps = dispatch => ({
  updateSchema: (schemaString) => dispatch(updateSchema(schemaString)),
})

const textStyle = { backgroundColor: "white", width: '400px', height: '300px', };

class Schema extends Component { 
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    return this.props.updateSchema(e.target.value);
  }

  render(){
    return (
      <HalfPage color={"rgba(225,255,225,0.8)"}>
        <textarea style={textStyle} id="schema" value={this.props.myschemas} onChange={this.handleChange} />
      </HalfPage>
    );
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Schema);
