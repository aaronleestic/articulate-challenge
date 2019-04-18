import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { object, withKnobs } from "@storybook/addon-knobs";
import styles from "../App.module.scss";
import { longContent, variedTabs, minimalContent, original, dualTabs } from "../data";
import { TabBlock } from "./TabBlock";

addDecorator(withA11y);

storiesOf('TabBlock', module)
.addDecorator(withKnobs({ escapeHTML: false }))
.addDecorator(storyFn => <main className={styles.container}>{storyFn()}</main>)
.add('original', () => <TabBlock tabs={object('tabs', original)}/>)
.add('minimal', () => <TabBlock tabs={object('tabs', minimalContent)}/>)
.add('dual tabs', () => <TabBlock tabs={dualTabs}/>)
.add('varied tabs', () => <TabBlock tabs={variedTabs}/>)
.add('long content', () => <TabBlock tabs={longContent}/>)
;
