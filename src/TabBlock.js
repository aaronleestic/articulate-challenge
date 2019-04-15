import React, { useState, useRef, useEffect } from 'react';
import cx from 'classnames';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ImageZoom from 'react-medium-image-zoom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from "./TabBlock.module.scss";
import { Types } from "./data";
import debounce from "lodash.debounce";

library.add(faChevronLeft, faChevronRight);
const LEFT = 'left';
const RIGHT = 'right';

export function TabBlock({ tabs }){

  const [selectedTab, setTab] = useState(tabs.length && tabs[0]);
  const [showLeftControl, setLeftCtrlVisible] = useState(false);
  const [showRightControl, setRightCtrlVisible] = useState(false);
  const tabsRef = useRef(null);

  //removes the focus outline for visual users, but inserts it for keyboard ARIA users
  useEffect(() => {
    const tabsList = tabsRef.current;

    const addClass = () => tabsList.classList.add('mouse');
    const rmClass = () => tabsList.classList.remove('mouse');

    tabsList.addEventListener('mouseover', addClass);
    tabsList.addEventListener('keyup', rmClass);

    return () => {
      tabsList.removeEventListener('mouseover', addClass);
      tabsList.removeEventListener('keyup', rmClass);
    }
  }, []);

  //initializes tab control visibility and watches for updates
  useEffect(() => {
    updateTabControlVisibility();

    const handleScroll = debounce(updateTabControlVisibility, 50);

    const tabsList = tabsRef.current;
    tabsList.addEventListener('scroll', handleScroll);
    return () => tabsList.removeEventListener('scroll', handleScroll);
  }, []);

  const updateTabControlVisibility = () => {

    //hides left chevron if tabs should not be scrolled further left
    const scrollPos = tabsRef.current.scrollLeft;
    setLeftCtrlVisible(scrollPos > 0);

    //shows right chevron if there are more scrolling available
    const { totalWidth, viewWidth } = getTabListWidths();
    setRightCtrlVisible(totalWidth - viewWidth - scrollPos > 0);
  };

  const onTabClick = (e, tab) => {
    e.preventDefault();
    setTab(tab);
  };

  const navigateTab = (e, currentTabIndex) => {

    if ( !isLeftOrRightArrowPress(e.keyCode) )
      return;

    const newTabIndex = calcNextTabIndex(e.keyCode, currentTabIndex, tabs.length);
    setTab(tabs[newTabIndex]);
    scrollTabIntoView(newTabIndex);
  };

  function isLeftOrRightArrowPress(code){
    return code === 37 || code === 38;
  }

  function calcNextTabIndex(keyCode, oldIndex, maxIndex){
    switch(keyCode){

      case 37: //left arrow, wraps to end
        return ( oldIndex - 1 + maxIndex ) % maxIndex;

      case 39: //right arrow, modulo'ed to wrap to beginning
        return ( oldIndex + 1 ) % maxIndex;

      default: return 0;
    }
  }

  const scrollTabIntoView = (tabIndex) => {

    //retrieves element dimensions
    const tabRef = tabsRef.current.children[tabIndex];
    const { left: tabLeft, right: tabRight, width: scrollAmount } = tabRef.getBoundingClientRect();
    const { left: containerLeft, right: containerRight } = tabsRef.current.getBoundingClientRect();

    //uses dimension to determine whether imperative scrolling is needed to make tab visible
    if ( tabRight > containerRight )
      tabsRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    else if ( tabLeft < containerLeft )
      tabsRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });

    tabRef.focus();
  };

  const scrollTabList = (direction) => {
    const { totalWidth, viewWidth } = getTabListWidths();
    const tabWidth = getTabWidth();
    const scrollAmount = calcScrollAmount(tabsRef.current.scrollLeft, viewWidth, totalWidth, tabWidth, direction);
    tabsRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" })
  };

  const getTabListWidths = () => ({
    viewWidth: tabsRef.current.getBoundingClientRect().width,
    totalWidth: tabsRef.current.scrollWidth
  });

  const getTabWidth = () => tabsRef.current.children[0].clientWidth;

  function calcScrollAmount(currentPos, viewWidth, totalWidth, discreteSize, direction){
    if ( direction === RIGHT ){

      //new offset position for one page
      const proposedPosition = currentPos + viewWidth;

      //adjust down the position by discrete length of one tab width
      const targetPosition = discretize(proposedPosition, discreteSize) - 60;

      //don't want to overshoot the maximum width
      return Math.min(targetPosition, totalWidth - viewWidth);

    } else {
      //same logic but in the other direction
      const proposedPosition = currentPos - viewWidth;
      const targetPosition = discretize(proposedPosition, discreteSize) + discreteSize + 60;
      return Math.max(targetPosition, 0);
    }
  }

  function discretize(totalLength, discreteLength){
    const maxSteps = Math.floor(totalLength/discreteLength);
    return maxSteps * discreteLength;
  }

  return (
    <article className={styles.container}>

      <div className={styles.tabsWrap}>

        <div
          className={styles.tabList}
          ref={tabsRef}
          role="tablist">

        { tabs.map((t, index) => (
          <a className={cx(styles.tab, { [styles.active]: t === selectedTab })}
             key={t.id}
             tabIndex={ index ? -1 : 0 }
             aria-selected={ t === selectedTab }
             role="tab"
             id={`tab-${t.id}`}
             aria-controls={`tab-${t.id}-content`}
             onKeyDown={e => navigateTab(e, index)}
             onClick={e => onTabClick(e, t)}>
            <span>{t.title}</span>
          </a>
        ))}
          <span //dummy tab
            onClick={() => setTab(null)}
            className={cx(
              styles.tab,
              styles.dummyTab,
              { [styles.active]: null === selectedTab }
            )}/>
        </div>

        <div className={styles.controls}>
          <CSSTransition
            className={cx(styles.controlWrapper, styles.leftCtrl)}
            in={showLeftControl}
            timeout={300}
            mountOnEnter>
            <div onClick={() => scrollTabList(LEFT)}>
              <div role="button" className={styles.control}>
                <FontAwesomeIcon icon="chevron-left"/>
              </div>
            </div>
          </CSSTransition>
          <CSSTransition
            className={cx(styles.controlWrapper, styles.rightCtrl)}
            in={showRightControl}
            timeout={300}
            mountOnEnter>
            <div onClick={() => scrollTabList(RIGHT)}>
              <div role="button" className={styles.control}>
                <FontAwesomeIcon icon="chevron-right"/>
              </div>
            </div>
          </CSSTransition>
        </div>

      </div>

      <TransitionGroup className={styles.tabPanelWrapper}>
      { selectedTab &&
        <CSSTransition
          key={selectedTab.id}
          className={styles.tabPanel}
          role="tabpanel"
          aria-labelledby={`tab-${selectedTab.id}`}
          id={`tab-${selectedTab.id}-content`}
          timeout={300}
          exit={false}>
          <div>
          { selectedTab.content.map((c, index) => (
            <div key={index}>
            { c.type === Types.TEXT &&
              <p>{c.text}</p>}
            { c.type === Types.IMAGE &&
              <ImageZoom
                image={{src: c.src, alt: c.alt, className: styles.img}}
                zoomImage={{src: c.src, alt: c.alt}}
              />}
            </div>
          ))}
          </div>
        </CSSTransition>}
      </TransitionGroup>

    </article>
  )
}

TabBlock.defaultProps = {
  tabs: []
};
