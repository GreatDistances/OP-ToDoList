import ListManager from "./ListManager.js";
import displaySideBarLists from "./displaySideBarLists.js";
import { displayAllTasks } from "./displayAllTasks.js";
import createListButtons from './createListButtons.js';
// import "./styles.css" // uncomment for workaround for generating styles.css in dist folder

let listManager;

const initializeApp = () => {
  displaySideBarLists();
  createListButtons();
  displayAllTasks();
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