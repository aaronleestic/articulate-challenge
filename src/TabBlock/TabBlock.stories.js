import React from 'react';
import { storiesOf } from '@storybook/react';
import styles from "../App.module.scss";
import { original, variedTabs, longContent, minimalContent, dualTabs, charts, Types } from "../data";
import { TabBlock } from "./TabBlock";
import ImageZoom from 'react-medium-image-zoom';
import { Bar, Line } from "react-chartjs-2";

const paragraphStyles = { margin: '.5em 0 1.5em' };
const imgStyles =  {
  maxWidth: '100%',
  margin: '.5em 0 1em'
};

function formatIntoJsx(data){
  return data.map(tab => ({
    ...tab,
    content: tab.content.map((c, index) => (
      <div key={index}>
        { c.type === Types.TEXT &&
        <p style={paragraphStyles}>{c.text}</p>
        }
        { c.type === Types.IMAGE &&
        <ImageZoom
          image={{src: c.src, alt: c.alt, style: imgStyles}}
          zoomImage={{src: c.src, alt: c.alt}}/>
        }
        { c.type === Types.BAR_CHART &&
        <Bar data={c.data} options={c.options}/>
        }
        { c.type === Types.LINE_CHART &&
        <div style={{ marginBottom: '2em' }}>
          <Line data={c.data} options={c.options}/>
        </div>
        }
      </div>
    ))
  }));
}

const unformatted = [original, variedTabs, longContent, minimalContent, dualTabs, charts];
const [
  originalJsx,
  variedTabsJsx,
  longContentJsx,
  minimalContentJsx,
  dualTabsJsx,
  chartsJsx
] = unformatted.map(formatIntoJsx);


storiesOf('TabBlock', module)
.addDecorator(storyFn => <main className={styles.container}>{storyFn()}</main>)
.add('original', () => <TabBlock tabs={originalJsx}/>)
.add('minimal', () => <TabBlock tabs={minimalContentJsx}/>)
.add('dual tabs', () => <TabBlock tabs={dualTabsJsx}/>)
.add('varied tabs', () => <TabBlock tabs={variedTabsJsx}/>)
.add('long content', () => <TabBlock tabs={longContentJsx}/>)
.add('charts', () => <TabBlock tabs={chartsJsx}/>)
;
