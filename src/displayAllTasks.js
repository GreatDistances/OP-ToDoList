import { listManager } from "./index.js";
import { createListItem } from "./createListItem.js";
import { displayListItemFromObj } from "./displayListItemFromObj.js";

// NOTE:  This module renders the "All Tasks" view, by use of displayListItemFromObj.js.
// This code is slightly distinct from code in "displayList" and "displayListItemsByListId", which are used to render views of individual lists and their listItems.

const displayAllTasks = () => {
  let displayTitle;

  const noTasksMessage = document.createElement("div");

  const itemViewHeaderContainer = document.querySelector(
    "#itemViewHeaderContainer"
  );
  const itemContainerContainer = document.querySelector(
    "#itemContainerContainer"
  );
  const listTitleContainer = document.createElement("div");
  const listTitleH1 = document.createElement("h1");
  const listIdP = document.createElement("p");
  const listItemBtnDivContainer = document.createElement("div");
  listItemBtnDivContainer.classList.add("listItemBtnDivContainer");
  const listItemSortBtnDiv = document.createElement("div");
  listItemSortBtnDiv.classList.add("listItemSortBtnDiv");

  itemViewHeaderContainer.innerHTML = "";

  const newItemBtn = document.createElement("button");
  const sortByDateBtn = document.createElement("button");
  const sortByItemIsCompletedBtn = document.createElement("button");
  const sortByPriorityBtn = document.createElement("button");

  listTitleContainer.classList.add("listTitleContainer");

  let sortFlag = "";
  let allListItems = [];
  allListItems = listManager.getAllListItemsAllLists();
  itemContainerContainer.innerHTML = "";

  displayTitle = `All Tasks`;
  listTitleH1.innerText = displayTitle;
  listIdP.innerText = "Viewing All";

  const loopThruItems = () => {
    itemContainerContainer.innerHTML = "";
    if (allListItems.length < 1) {
      noTasksMessage.classList.add("itemContainerNoTasks");
      noTasksMessage.innerText = "There are currently no tasks in the system.";
      itemContainerContainer.append(noTasksMessage);
    } else {
      allListItems.forEach((item) => displayListItemFromObj(item));
    }
  };

  const sortItemsAsc = (property = "itemDueDate", arr = allListItems) => {
    arr.sort((a, b) => {
      if (b[property] > a[property]) {
        return -1;
      } else if (b[property] < a[property]) {
        return 1;
      }
      return 0;
    });
    // console.log(arr);
  };

  const sortItemsDesc = (property, arr) => {
    arr.sort((a, b) => {
      if (b[property] < a[property]) {
        return -1;
      } else if (b[property] > a[property]) {
        return 1;
      }
      return 0;
    });
    // console.log(arr);
  };

  // new item button
  const createNewItemBtn = () => {
    newItemBtn.classList.add("main-button");
    newItemBtn.innerText = "New Task";
    newItemBtn.addEventListener("click", () => {
      listManager.addListItem(createListItem(), "L10000");
      allListItems = listManager.getAllListItemsAllLists();
      displayAllTasks();
    });
    listItemBtnDivContainer.append(newItemBtn);
  };

  // sort by date button
  const createSortByDateBtn = () => {
    sortByDateBtn.classList.add("normal-button");
    sortByDateBtn.innerText = "Sort By Date";
    listItemSortBtnDiv.append(sortByDateBtn);
    sortByDateBtn.addEventListener("click", () => {
      if (sortFlag === "itemDueDateAsc") {
        sortItemsDesc("itemDueDate", allListItems);
        sortFlag = "itemDueDateDesc";
      } else {
        sortItemsAsc("itemDueDate", allListItems);
        sortFlag = "itemDueDateAsc";
      }
      loopThruItems();
    });
    listItemSortBtnDiv.append(sortByDateBtn);
  };

  // sort by priority button
  const createSortByPriorityBtn = () => {
    sortByPriorityBtn.classList.add("normal-button");
    sortByPriorityBtn.innerText = "Sort By Priority";
    listItemSortBtnDiv.append(sortByPriorityBtn);
    sortByPriorityBtn.addEventListener("click", () => {
      if (sortFlag !== "itemPriorityDesc") {
        sortFlag = "itemPriorityDesc";
        sortItemsDesc("itemPriority", allListItems);
      } else if (sortFlag === "itemPriorityDesc") {
        sortItemsAsc("itemPriority", allListItems);
        sortFlag = "itemPriorityAsc";
      }
      loopThruItems();
    });
    listItemSortBtnDiv.append(sortByPriorityBtn);
  };

  // sort by is completed button
  const createSortByItemIsCompletedBtn = () => {
    sortByItemIsCompletedBtn.classList.add("normal-button");
    sortByItemIsCompletedBtn.innerText = "Sort By Completion";
    listItemSortBtnDiv.append(sortByItemIsCompletedBtn);
    sortByItemIsCompletedBtn.addEventListener("click", () => {
      if (sortFlag !== "itemIsCompletedAsc") {
        sortFlag = "itemIsCompletedAsc";
        sortItemsAsc("itemIsCompleted", allListItems);
      } else if (sortFlag === "itemIsCompletedAsc") {
        sortItemsDesc("itemIsCompleted", allListItems);
        sortFlag = "itemIsCompletedDesc";
      }
      loopThruItems();
    });
    listItemSortBtnDiv.append(sortByItemIsCompletedBtn);
  };

  // Loop through list to dynamically generate title and id fields, or no tasks message
  if (allListItems.length === 0) {
    noTasksMessage.classList.add("itemContainerNoTasks");
    noTasksMessage.innerText = "There are currently no tasks in this project.";
    itemContainerContainer.append(noTasksMessage);
  }

  sortItemsDesc("itemId", allListItems); // TODO - improved logic would be to copy the array, then unshift new item to it.
  createNewItemBtn();
  createSortByDateBtn();
  createSortByItemIsCompletedBtn();
  createSortByPriorityBtn();
  listTitleContainer.append(listTitleH1, listIdP); // add list title & list id to header container
  listItemBtnDivContainer.append(newItemBtn); // add new item button to header button main container
  listItemSortBtnDiv.append(sortByDateBtn);
  listItemSortBtnDiv.append(sortByItemIsCompletedBtn);
  listItemSortBtnDiv.append(sortByPriorityBtn);
  listItemBtnDivContainer.append(listItemSortBtnDiv); // add sort buttons to header button main container
  itemViewHeaderContainer.append(listTitleContainer); // add title and id container to header container
  itemViewHeaderContainer.append(listItemBtnDivContainer); // add buttons to header container

  loopThruItems(); // initial load of listItems for display
};

export { displayAllTasks };
