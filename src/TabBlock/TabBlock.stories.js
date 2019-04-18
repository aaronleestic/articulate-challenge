import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { object, withKnobs } from "@storybook/addon-knobs";
import styles from "../App.module.scss";
import { longContent, variedTabs, minimalContent, original, originalX3, manyShortTabs } from "../data";
import { TabBlock } from "./TabBlock";

addDecorator(withA11y);

storiesOf('TabBlock', module)
.addDecorator(withKnobs({ escapeHTML: false }))
.addDecorator(storyFn => <main className={styles.container}>{storyFn()}</main>)
.add('original', () => <TabBlock tabs={object('tabs', original)}/>)
.add('original x 3', () => <TabBlock tabs={originalX3}/>)
.add('minimal', () => <TabBlock tabs={object('tabs', minimalContent)}/>)
.add('many short tabs', () => <TabBlock tabs={manyShortTabs}/>)
.add('varied tabs', () => <TabBlock tabs={variedTabs}/>)
.add('long content', () => <TabBlock tabs={longContent}/>)
;
