import React, { Component } from "react";
// eslint-disable-next-line
import i18n from "./i18n";

import WrapperApp from "./components/WrapperApp/WrapperApp";

class App extends Component {
  render() {
    return (
      <div>
        <main>
          <WrapperApp />
        </main>
      </div>
    );
  }
}

export default App;
