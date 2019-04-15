import React, { Component } from 'react';
import { TabBlock } from "./TabBlock";
import { original, originalX3 } from "./data";
import styles from "./App.module.scss";

class App extends Component {

  render() {
    return (
      <main className={styles.container}>
        <TabBlock tabs={originalX3}/>
      </main>
    );
  }
}

export default App;
