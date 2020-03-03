import React, { Component } from "react";
import { Select, TextField } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";

class CurrencyRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0
    };
  }

  handleChange = e => {
    //  console.log("change event");
  };

  render() {
    const { myList, defaultVal, handleCN, handleCC, id } = this.props;
    // console.log(typeof myList[0]);
    return (
      <div className="curr-row ">
        <TextField
          onInput={e => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 10);
          }}
          type="number"
          className="myText"
          value={defaultVal}
          onChange={handleCN(id)}
        />
        <Select
          defaultValue="INR"
          className="mySelect"
          autoWidth
          onChange={handleCC(id)}
        >
          {myList.map(country => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
        {/* {console.log("in currency row  " + myList)} */}
      </div>
    );
  }
}

export default CurrencyRow;
