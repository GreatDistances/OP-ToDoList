import ListManager from "./ListManager.js";
import List from "./list.js";
import displayAllLists from "./displayAllLists.js";
import { displayList } from "./displayList.js";

/* // INITIALIZE APP
let listManager;
//let listManager = new ListManager;

const loadLocalStorage = () => {
    if (localStorage) {
        listManager = new ListManager;
        const listManagerStringified = JSON.stringify(listManager);
        localStorage.setItem("ListManager", listManagerStringified);
        console.log("ListManager saved to localStorage:", listManagerStringified); // Add this line
    }
    const listManagerFromStorage = localStorage.getItem("ListManager");
    console.log("ListManager from localStorage:", listManagerFromStorage); // Add this line
    const listManagerParsed = JSON.parse(listManagerFromStorage);
    console.log("Parsed ListManager from localStorage:", listManagerParsed); // Add this line
    return listManagerParsed;
}

listManager = loadLocalStorage();

listManager.setCurrentListId(-1); // initialize app with no list selected
displayAllLists(); // display all available lists
displayList(listManager.getCurrentListId()); // initialize app with no list displayed */

let listManager;

const initializeApp = () => {
  listManager.setCurrentListId(-1); // initialize app with no list selected
  displayAllLists(); // display all available lists
  displayList(listManager.getCurrentListId()); // initialize app with no list displayed
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

  const newListBtn = document.querySelector("#newListBtn");
  newListBtn.addEventListener("click", () => {
    listManager.addNewList(List.createList(""));
  });
};

loadLocalStorage();

export { listManager };

// TEST INPUT
/* 
addNewList(List.createNewList("Test List C"));
addNewList(List.createNewList("Test List D"));

addListItem(CurrentListId, createListItem("Do the dishes", "Wash and dry dishes before party", 1, "2024/03/01", "don't forget!"));
addListItem(CurrentListId, createListItem("2nd sample add", "asdf", 2, "2024/04/02", "no notes"));
addListItem(CurrentListId, createListItem("2nd sample add", "asdf", 2, "2024/04/02", "no notes"));

displayList("L98");
console.log(CurrentListId);

deleteList("L99");
deleteList("A");  // should return error message in console
console.log(CurrentListId);

renameList("X01", "John"); // should return error message in console
renameList("L98", "Pork Soda");

displayList("L10001");
deleteItem("234")  // should return error message in console
deleteItem("I100002");

setItemTitle("I100001", "New edited title"); // should return error message in console
setItemTitle("I100002", "New edited title"); // should return error message in console
setItemTitle("I100003"); // title will not change
setItemTitle("I100003", ""); // title will not change
setItemTitle("I100003", "Another new edited title"); // should return error message in console

setItemDescription("I100003")
setItemDescription("I100003", "new item description");

setItemNotes("Iasdf")
setItemNotes("I100002")
setItemDescription("I100003");
setItemDescription("I100003");

setItemNotes("Iasdf")
setItemNotes("I100002")
setItemNotes("I100003", "updated note");

setItemPriority("Iasdf")
setItemPriority("I100002", 2)
setItemPriority("I100003", "A");
setItemPriority("I100003", 0);
setItemPriority("I100003", 1);
setItemPriority("I100003", 2);
setItemPriority("I100003", 3);
setItemPriority("I100003", 2.0);
setItemPriority("I100003", 3.01);
setItemPriority("I100003", 3.000);
setItemPriority("I100003", 4);

setItemDueDate("asdfadsf")
setItemDueDate("I100002", 2)
setItemDueDate("I100003", "A");
setItemDueDate("I100003", 3.0);
setItemDueDate("I100003", 4);
setItemDueDate("I100003", 20240101);
setItemDueDate("I100003", 2025, "12", 13);
setItemDueDate("I100003", "2022", "1", "1");
setItemDueDate("I100003", 2024, 5, 2);
setItemDueDate("I100003", "-");

displayAllLists(); */
