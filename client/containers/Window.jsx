import React from "react";
import { FixedSizeList } from "react-window";
import { connect } from "react-redux";
import styled from "styled-components";
import KeyValue from "../components/KeyValue.js";

const mapStateToProps = store => {
  return {
    itemCount: store.rows.length,
    rows: store.rows
  };
};

const Row = ({ index, data, style }) => {
  const { props, rows } = data;
  props.rowData = rows[index];
  props.key = `row-${index}`;
  props.rowIndex = index;
  return (
    <KeyValue
      style={style}
      className={index % 2 === 0 ? "even" : "odd"}
      keyValueProps={props}
    />
  );
};

class Window extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dataForKeyValue = {
      props: this.props.keyValueProps,
      rows: this.props.rows
    };

    return (
      <FixedSizeList
        height={500}
        itemCount={this.props.itemCount}
        itemSize={10}
        width={100 + "%"}
        itemData={dataForKeyValue}
        layout='vertical'
      >
        {Row}
      </FixedSizeList>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(Window);

