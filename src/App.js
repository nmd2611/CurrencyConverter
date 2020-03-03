import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";

import Convert from "./components/currency";
import Footer from "./components/footer";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Convert />
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
