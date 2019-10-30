import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { updateSchema, updateSchemaName, addRow } from "../actions/actions";
import Dashboard from "../containers/Dashboard.jsx";
import Schema from "../components/Schema.jsx";

const Header = styled.header`
  height: 90px;
  background-color: rgba(55, 155, 55, 0.8);
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const H1 = styled.h1`
  font-size: 35px;
  font-family: Monaco;
  color: rgba(255, 255, 255, 0.8);
`;

const Input = styled.input`
  border-radius: 10px;
  font-family: Monaco;
  font-size: 18px;
`;

const Buttons = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 33% 33% 34%;
`;

const Columns = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 35% 20% 12% 12% 20%;
  text-align: center;
  self-align: center;
  align-items: center;
  height: 42px;
`;

const P = styled.p`
  font-family: Monaco;
  font-size: 18px;
`
const PTiny = styled.p`
  font-family: Monaco;
  font-size: 11px;
`

const A = styled.a`
  box-shadow: inset -5px -5px rgba(55,55,255,0.6);
  border: 3px solid silver;
  border-radius: 10px;
  font-family: Monaco;
  font-size: 18px;
  background-color: rgba(55,55,255,0.6);
  text-align: center;
  text-decoration: none;
  color: white;
  display: grid;
  align-items: center;
  height 45px;
`

export const Button = styled.button`
  box-shadow: inset -5px -5px rgba(55,225,55,0.6);
  border-radius: 10px;
  font-family: Monaco;
  font-size: 18px;
  background-color: rgba(55,225,55,0.6);
`;

const PageWrapper = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 !important;
`;

export const HalfPage = styled.section`
  height: 150vh;
  width: 50%;
  background-color: ${props => props.color};
  @media only screen and (max-width: 540px) {
    width: 100%;
  }
  box-shadow: inset 10px 10px rgba(55,155,55,0.5);
`;

const mapStateToProps = store => ({
  myrows: store.rows,
  myschema: store.schemas
});

const mapDispatchToProps = dispatch => ({
  addRow: () => dispatch(addRow()),
  updateSchema: schemaString => dispatch(updateSchema(schemaString)),
  updateSchemaName: schemaName => dispatch(updateSchemaName(schemaName))
});
class App extends Component {
  constructor(props) {
    super(props);
    this.handleCreateSchema = this.handleCreateSchema.bind(this);
    this.handleSchemaName = this.handleSchemaName.bind(this);
    this.exportSchema = this.exportSchema.bind(this);
    this.toggle = false;
  }
  componentDidUpdate(){
    if(this.toggle){
      this.handleCreateSchema();
    }
  }
  handleCreateSchema() {
    const schema = {
      rows:this.props.myrows,
      name:this.props.myschema.schemaName
    };
    console.log(`now changing to ${schema.name}`)
    fetch("/createSchema", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(schema),
    })
      .then(response => response.json())
      .then(mongo => {this.props.updateSchema(mongo);})
      .catch(err => console.log(err));
  }

  handleSchemaName(e){
    this.toggle = true;
    return this.props.updateSchemaName(e.target.value);
  }

  exportSchema() {
    const { schemaGenerated } = this.props.myschema;
    const blobbers = new Blob([schemaGenerated], { type: "application/javascript" });
    const url = window.URL.createObjectURL(blobbers);
    document.getElementById("exportFile").download = this.props.myschema.schemaName;
    document.getElementById("exportFile").href = url;
  }

  render() {
    return (
      <PageWrapper>
        <HalfPage color={"rgba(0, 255, 0, 0.2)"}>
          <Header id="header">
            <H1>MongooseSchemaGen</H1>
          </Header>
          <Buttons>
            <Input type='text' placeholder='schema name' onChange={(e)=>this.handleSchemaName(e)}/>
            <Button onClick={() => this.props.addRow()}>Add Row</Button>
            <A
              onClick={this.exportSchema}
              id="exportFile"
              href=""
              download
            >
              Export
            </A>
          </Buttons>
          <Columns>
            <P>Key</P>
            <P>Type</P>
            <PTiny>Required</PTiny>
            <PTiny>Unique</PTiny>
            <P></P>
          </Columns>
          <Dashboard schemaHandler= {this.handleCreateSchema} />
        </HalfPage>
        <Schema />
      </PageWrapper>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
