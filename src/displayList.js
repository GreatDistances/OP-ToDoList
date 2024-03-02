import { listManager } from "./index.js";
import displayListItemsByListId from "./displayListItemsByListId.js";
import { createListItem } from "./createListItem.js";

// NOTE:  This module renders views of individual lists, by use of displayListItemsByListId.js module.
// This code is slightly distinct from code in "displayAllTasks" and "displayListItemFromObj", which are used to render "All Tasks" view.

let sortFlag = "";

const displayList = (id) => {

  const lists = [...listManager.getAllLists()];

  listManager.setCurrentListId(id);

  let displayTitle;
  let displayListId;

const noTasksMessage = document.createElement("div");

const itemViewHeaderContainer = document.querySelector("#itemViewHeaderContainer");
const itemContainerContainer = document.querySelector("#itemContainerContainer");
const listTitleContainer = document.createElement("div");
const listTitleH1 = document.createElement("h1");
const listIdH1 = document.createElement("h3");
const listItemBtnDivContainer = document.createElement("div");
listItemBtnDivContainer.classList.add("listItemBtnDivContainer");
const listItemSortBtnDiv = document.createElement("div");

itemViewHeaderContainer.innerHTML = "";

const newItemBtn = document.createElement("button");
const sortByDateBtn = document.createElement("button");
const sortByItemIsCompletedBtn = document.createElement("button");
const sortByPriorityBtn = document.createElement("button");

  listTitleContainer.classList.add("listTitleContainer");

  listItemSortBtnDiv.classList.add("listItemSortBtnDiv");

  // new item button
  const createNewItemBtn = () => {
    newItemBtn.classList.add("main-button");
    newItemBtn.innerText = "New Task";
    newItemBtn.addEventListener("click", () => {
      const currentListId = listManager.getCurrentListId();
      listManager.addListItem(createListItem(), currentListId);
      displayListItemsByListId(currentListId);
    });
    listItemBtnDivContainer.append(newItemBtn);
  };

  // sort by date button
  const createSortByDateBtn = () => {
    sortByDateBtn.classList.add("normal-button");
    sortByDateBtn.innerText = "Sort By Date";
    sortByDateBtn.addEventListener("click", () => {
        if (sortFlag !== "itemDueDateAsc") {
            sortFlag = "itemDueDateAsc";
            sortItemsDesc("itemDueDate");
        } else if (sortFlag === "itemDueDateAsc") {
            sortItemsAsc("itemDueDate");
            sortFlag = "itemDueDateDesc";
        }
        loopThruList();
    });
    listItemSortBtnDiv.append(sortByDateBtn);
  };

  // sort by priority button
  const createSortByPriorityBtn = () => {

    sortByPriorityBtn.classList.add("normal-button");
    sortByPriorityBtn.innerText = "Sort By Priority";
    sortByPriorityBtn.addEventListener("click", () => {
      if (sortFlag !== "itemPriorityDesc") {
        sortFlag = "itemPriorityDesc";
        sortItemsDesc("itemPriority");
      } else if (sortFlag === "itemPriorityDesc") {
        sortItemsAsc("itemPriority");
        sortFlag = "itemPriorityAsc";
      }
      loopThruList();
    });
    listItemSortBtnDiv.append(sortByPriorityBtn);
  };

  // sort by is completed button
  const createSortByItemIsCompletedBtn = () => {
    sortByItemIsCompletedBtn.classList.add("normal-button");
    sortByItemIsCompletedBtn.innerText = "Sort By Completion";
    sortByItemIsCompletedBtn.addEventListener("click", () => {
      if (sortFlag !== "itemIsCompletedAsc") {
        sortFlag = "itemIsCompletedAsc";
        sortItemsAsc("itemIsCompleted");
      } else if (sortFlag === "itemIsCompletedAsc") {
        sortItemsDesc("itemIsCompleted");
        sortFlag = "itemIsCompletedDesc";
      }
      loopThruList();
    });
    listItemSortBtnDiv.append(sortByItemIsCompletedBtn);
  };

  // loop through list to dynamically generate title and id fields, or no tasks message
  const loopThruList = () => {
    itemContainerContainer.innerHTML = "";
  for (let i = 0; i < lists.length; i++) {
    if (lists[i].listId === id) {
      if (lists[i].listTitle === "") {
        displayTitle = "Untitled Project";
      } else {
        displayTitle = `${lists[i].listTitle}`;
      }
      displayListId = `ID # ${lists[i].listId}`;
      listTitleH1.innerText = displayTitle;
      listIdH1.innerText = displayListId;
      if (lists[i].listItems.length > 0) {
        displayListItemsByListId(id);
      } else {
        noTasksMessage.classList.add("itemContainerNoTasks");
        noTasksMessage.innerText =
          "There are currently no tasks in this project.";
        itemContainerContainer.append(noTasksMessage);
      }
    }
    }
  }

  // render page view with buttons and DOM elements
  createNewItemBtn();
  createSortByDateBtn();
  createSortByItemIsCompletedBtn();
  createSortByPriorityBtn();
  listTitleContainer.append(listTitleH1, listIdH1); // add list title & list id to header container
  listItemBtnDivContainer.append(newItemBtn); // add new item button to header button main container
  listItemSortBtnDiv.append(sortByDateBtn);
  listItemSortBtnDiv.append(sortByItemIsCompletedBtn);
  listItemSortBtnDiv.append(sortByPriorityBtn);
  listItemBtnDivContainer.append(listItemSortBtnDiv); // add sort buttons to header button main container
  itemViewHeaderContainer.append(listTitleContainer); // add title and id container to header container
  itemViewHeaderContainer.append(listItemBtnDivContainer); // add buttons to header container
  // loopThruList of listItems
  loopThruList();

};

// logic for sorting items ascending
const sortItemsAsc = (text) => {
  const currentListId = listManager.getCurrentListId();
  let sortedItems = listManager.getAllListItems(currentListId);
  sortedItems = sortedItems.sort((a, b) => {
    if (a[text] < b[text]) {
      return -1;
    } else if (a[text] > b[text]) {
      return 1;
    }
    return 0;
  });
/*   sortedItems.forEach((listItem) => {
    console.log(listItem);
  }); */
  return sortedItems;
};

// logic for sorting items descending
const sortItemsDesc = (text) => {
  const currentListId = listManager.getCurrentListId();
  let sortedItems = listManager.getAllListItems(currentListId);
  sortedItems = sortedItems.sort((a, b) => {
    if (b[text] < a[text]) {
      return -1;
    } else if (b[text] > a[text]) {
      return 1;
    }
    return 0;
  });
/*   sortedItems.forEach((listItem) => {
    console.log(listItem);
  }); */
  return sortedItems;
};

export { displayList  };