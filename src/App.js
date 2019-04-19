import React, { Component } from 'react';
import { TabBlock } from "./TabBlock/TabBlock";
import { original, Types } from "./data";
import styles from "./App.module.scss";
import ImageZoom from 'react-medium-image-zoom';
import { Line, Bar } from 'react-chartjs-2';

class App extends Component {

  render() {

    //original sample data is stored in json per requirement
    //but it needs to be formmatted before use,
    //which also allows developer to customize contents
    const jsxFormatted = original.map(tab => ({
      ...tab,
      content: tab.content.map((c, index) => (
        <div key={index}>
          { c.type === Types.TEXT &&
          <p style={{ margin: '.5em 0 1.5em' }}>{c.text}</p>
          }
          { c.type === Types.IMAGE &&
          <ImageZoom
            image={{src: c.src, alt: c.alt, style: { maxWidth: '100%', margin: '.5em 0 1em' } }}
            zoomImage={{src: c.src, alt: c.alt}}/>
          }
          { c.type === Types.BAR_CHART &&
          <Bar data={c.data} options={c.options}/>
          }
          { c.type === Types.LINE_CHART &&
          <Line data={c.data} options={c.options}/>
          }
        </div>
      ))
    }));

    return (
      <main className={styles.container}>
        <TabBlock tabs={jsxFormatted}/>
      </main>
    );
  }
}

export default App;
