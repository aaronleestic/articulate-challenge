import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { object, withKnobs } from "@storybook/addon-knobs";
import styles from "./App.module.scss";
import { original } from "./data";
import { TabBlock } from "./TabBlock";

addDecorator(withA11y);

const originalX3 = original
  .concat(original).concat(original)
  .map((tab, index) => ({ ...tab, id: index }));


storiesOf('TabBlock', module)
.addDecorator(withKnobs({ escapeHTML: false }))
.addDecorator(storyFn => <main className={styles.container}>{storyFn()}</main>)
.add('original', () => <TabBlock tabs={object('tabs', original)}/>)
.add('original x 3', () => <TabBlock tabs={originalX3}/>);
