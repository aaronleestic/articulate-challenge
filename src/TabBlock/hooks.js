import debounce from "lodash.debounce";
import { useState, useEffect } from 'react';

export function useStyleModifiers(eventName, ref, { add = [], remove = [] }, opts = {}){
  useEffect(() => {
    const element = ref.current;
    const eventListener = () => {
      add.forEach(cls => element.classList.add(cls));
      remove.forEach(cls => element.classList.remove(cls));
    };
    element.addEventListener(eventName, eventListener, opts);
    return () => element.removeEventListener(eventName, eventListener, opts);
  }, [])
}

//initializes tab control visibility and watches for updates
export function useControlVisibilityListener(tabsRef){

  const [showLeftControl, setLeftCtrlVisible] = useState(false);
  const [showRightControl, setRightCtrlVisible] = useState(false);

  const updateVisibility = () => {

    //hides left chevron if tabs should not be scrolled further left
    const scrollPos = tabsRef.current.scrollLeft;
    setLeftCtrlVisible(scrollPos > 0);

    //shows right chevron if there are more scrolling available
    const { scrollWidth, width } = getWidthsOf(tabsRef.current);
    setRightCtrlVisible(scrollWidth - width - scrollPos > 0);
  };

  useEffect(() => {

    //sets initial visibility
    updateVisibility();

    //listens for scrolling to update visibility
    const tabsList = tabsRef.current;
    const handleScroll = debounce(updateVisibility, 50);
    tabsList.addEventListener('scroll', handleScroll);

    return () => tabsList.removeEventListener('scroll', handleScroll);
  }, []);

  return [showLeftControl, showRightControl];
}

export const getWidthsOf = (tabsList) => ({
  width: tabsList.getBoundingClientRect().width,
  scrollWidth: tabsList.scrollWidth
});

export function useAutoScrollTabIntoView(tabsRef, tabs, selectedTab){
  useEffect(() => {

    //retrieve positions of tab and tab list
    const tabIndex = tabs.indexOf(selectedTab);
    const tabsList = tabsRef.current;
    const tabRef = tabsList.children[tabIndex];
    const {
      left: containerLeft,
      right: containerRight
    } = tabsList.getBoundingClientRect();
    const {
      left: tabLeft,
      right: tabRight,
      width: scrollAmount
    } = tabRef.getBoundingClientRect();

    //uses dimension to determine whether imperative scrolling is needed to make tab visible
    if ( tabRight > containerRight ) {
      tabsList.scrollBy({left: scrollAmount, behavior: "smooth"});
      console.log(123);
    }
    else if ( tabLeft < containerLeft )
      tabsList.scrollBy({ left: -scrollAmount, behavior: "smooth" });

    tabRef.focus();

  }, [selectedTab]);
}
