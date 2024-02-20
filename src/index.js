import ListManager from './ListManager.js';
import List from './list.js';
import displayAllLists from './displayAllLists.js';
import {displayList} from './displayList.js';

// INITIALIZE APP
const listManager = new ListManager(); // new instance of ListManager class
listManager.setCurrentListId(-1); // initialize app with no list selected
displayAllLists(); // display all available lists
displayList(listManager.getCurrentListId()); // initialize app with no list displayed

const addListDialog = document.querySelector("#addListDialog");
const addListForm = document.querySelector("#addListForm");

const openAddListDialogBtn = document.querySelector("#openAddListDialogBtn");
openAddListDialogBtn.addEventListener("click", () => {
    addListDialog.showModal();
})

const closeAddListDialogBtn = document.querySelector("#closeAddListDialogBtn");
closeAddListDialogBtn.addEventListener("click", () => {
    addListDialog.close();
})

const submitListBtn = document.querySelector("#submitListBtn");
submitListBtn.addEventListener("click", () => {
    const newListName = document.querySelector("#listTitle").value;
    listManager.addNewList(List.createList(newListName));
    addListForm.reset();
    addListDialog.close();
});

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