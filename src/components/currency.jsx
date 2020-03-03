import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CurrencyRow from "./currencyRow";
/*
Backup Api key --> apiKey=fdfd4b2f3d4f2354c476

"https://free.currconv.com/api/v7/convert?q=USD_PHP&compact=ultra&apiKey=c52ea75fad9ead5135f0" --> to fetch the exact coversion from one currency to another

"https://free.currconv.com/api/v7/convert?q=USD_PHP,PHP_USD&compact=ultra&apiKey=c52ea75fad9ead5135f0" --> to fetch the bi-directional api

"https://free.currconv.com/api/v7/currencies?apiKey=c52ea75fad9ead5135f0"  -->  to fetch a list of all currencies

"https://free.currconv.com/api/v7/countries?apiKey=c52ea75fad9ead5135f0" -->  to fetch a list of all countries

"https://free.currconv.com/others/usage?apiKey=c52ea75fad9ead5135f0"  --> returns the usage of current api


"https://free.currconv.com/api/v7/convert?q=USD_PHP,PHP_USD&compact=ultra&date=[yyyy-mm-dd]&endDate=[yyyy-mm-dd]&apiKey=c52ea75fad9ead5135f0"  --> gives data of last 365 days
*/

class Convert extends Component {
  constructor(props) {
    super(props);
    this.handleChangeNum = this.handleChangeNum.bind(this);
    this.state = {
      dataB: [],
      countries: [],
      rate: [],
      x: 0,
      y: 0,
      source: "INR",
      destination: "INR",
      flag: 0
    };
  }

  componentDidMount() {
    axios.get("https://api.exchangeratesapi.io/latest").then(response => {
      // console.log(response.data);
      this.setState({
        dataB: response.data.rates,
        countries: Object.keys(response.data.rates),
        rate: Object.values(response.data.rates)
      });
      console.log("Data fetched successfully");
      console.log(this.state.dataB);
      console.log(this.state.countries);
      console.log(this.state.rate);
    });
  }

  changeInSource = () => {
    // change in x
    let a = this.state.x;
    let b;
    let d, s;
    d = this.state.rate[this.state.countries.indexOf(this.state.destination)];
    s = this.state.rate[this.state.countries.indexOf(this.state.source)];
    console.log("a=" + a + " d= " + d + " s=" + s);
    b = (a * d) / s;
    console.log(b);
    this.setState({
      y: b
    });
  };

  changeInDestination = () => {
    let b = this.state.y;

    let d, s;

    d = this.state.rate[this.state.countries.indexOf(this.state.destination)];
    s = this.state.rate[this.state.countries.indexOf(this.state.source)];
    console.log("b=" + b + " d= " + d + " s=" + s);
    let a = (b * s) / d;
    console.log(a);
    this.setState({
      x: a
    });
  };

  handleChangeNum = input => e => {
    // here , input has the id

    if (input == "x") {
      this.setState(
        {
          x: e.target.value
        },
        () => {
          this.changeInSource();
        }
      );

      // if change in x output will be y
      //  console.log("change in x");
    } else {
      this.setState(
        {
          y: e.target.value
        },
        () => {
          this.changeInDestination();
        }
      );

      // if change in y, output will be x
      //console.log("change in y");
    }

    //console.log("After change, a= " + a + " and b= " + b);
  };

  handleChangeCur = input => e => {
    // here , input has the id
    if (input == "x") {
      // set source currency
      this.setState(
        {
          source: e.target.value
        },
        () => {
          this.changeInSource();
        }
      );
    } else {
      this.setState(
        {
          destination: e.target.value
        },
        () => {
          this.changeInDestination();
        }
      );
    }
  };
  displayList() {
    console.log(this.state.countries);
    console.log(this.state.rate);
  }

  render() {
    return (
      <div className="main-curr">
        <Container maxWidth="sm" className="mycon">
          <h1>Currency Converter</h1>
          {/* {console.log(this.state.flag)} */}
          <CurrencyRow
            myList={this.state.countries}
            defaultVal={this.state.x}
            handleCN={this.handleChangeNum}
            handleCC={this.handleChangeCur}
            id="x"
          />
          <h1> = </h1>
          <CurrencyRow
            myList={this.state.countries}
            defaultVal={this.state.y}
            handleCN={this.handleChangeNum}
            handleCC={this.handleChangeCur}
            id="y"
          />
        </Container>
      </div>
    );
  }
}

export default Convert;
