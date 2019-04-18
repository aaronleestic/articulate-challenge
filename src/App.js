import React, { Component } from 'react';
import { TabBlock } from "./TabBlock/TabBlock";
import { original } from "./data";
import styles from "./App.module.scss";

class App extends Component {

  render() {
    return (
      <main className={styles.container}>
        <TabBlock tabs={original}/>
      </main>
    );
  }
}

export default App;
