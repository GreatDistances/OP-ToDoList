import ListManager from "./ListManager.js";
import List from "./list.js";
import displaySideBarLists from "./displaySideBarLists.js";
import { displayList } from "./displayList.js";
import { displayAllTasks2 } from "./displayAllTasks2.js";
import createListButtons from './createListButtons.js';

let listManager;

const initializeApp = () => {
  displaySideBarLists(); // display all available lists
  createListButtons();
  displayAllTasks2(); // initialize app to All Tasks list

};

const loadLocalStorage = () => {
  const listManagerFromStorage = localStorage.getItem("ListManager");
  if (!listManagerFromStorage || listManagerFromStorage === undefined) {
    // if ListManager is not available in localStorage, create a new one
    listManager = new ListManager();
    // Save new ListManager to localStorage
    localStorage.setItem("ListManager", JSON.stringify(listManager));
    console.log("New ListManager created and saved to localStorage.");
  } else {
    // if ListManager is in localStorage, parse and assign it
    const listManagerData = JSON.parse(listManagerFromStorage);
    // Manually reconstruct the ListManager instance
    listManager = new ListManager();
    // Assign properties from the parsed data to the new ListManager instance
    Object.assign(listManager, listManagerData);
    console.log("ListManager loaded from localStorage:", listManager);
  }
  // Call initializeApp after setting listManager
  initializeApp();

};

loadLocalStorage();

export { listManager };