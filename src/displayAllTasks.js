import { listManager } from "./index.js";
import displayListItemsByListId from "./displayListItemsByListId.js";
import displayListItemsFromArr from "./displayListItemsFromArr.js";
import { createListItem } from "./createListItem.js";

const displayAllTasks = () => {

  let sortFlag = "";

  const sortItemsAsc = (property = "itemDueDate", arr = allListItems) => {
    arr.sort((a, b) => {
      if (b[property] > a[property]) {
        return -1;
      } else if (b[property] < a[property]) {
        return 1;
      }
      return 0;
    });
    console.log(arr);
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
    console.log(arr);
  };

  const itemContainerContainer = document.createElement("div");

  const listItemsContainer = document.querySelector("#listItemsContainer");
  listItemsContainer.replaceChildren();
  // clear listItemsContainer
  listItemsContainer.replaceChildren(); // TODO:  update later to show multiple lists at a time.
  listItemsContainer.innerHTML = "";

  let allListItems = [];
    listManager.getAllListItemsAllLists().forEach((item) => {
      item.listId = item.listId; // Add listId to each item
      allListItems.push(item);
    });

  console.log(allListItems);

  const noTasksMessage = document.createElement("div");
  const listTitleContainer = document.createElement("div");
  const listTitleH1 = document.createElement("h1");
  const listIdH1 = document.createElement("h3");
  const listItemBtnDivContainer = document.createElement("div");
  const listItemSortBtnDiv = document.createElement("div");

  const newItemBtn = document.createElement("button");
  const sortByDateBtn = document.createElement("button");
  const sortByPriorityBtn = document.createElement("button");
  const sortByItemIsCompletedBtn = document.createElement("button");

  let displayTitle;
  let displayListId;

  listItemsContainer.append(listTitleContainer, listTitleH1, listIdH1);
  listTitleContainer.append(listTitleH1, listIdH1);
  listTitleContainer.classList.add("listTitleContainer");

  listItemBtnDivContainer.classList.add("listItemBtnDivContainer");

  listItemSortBtnDiv.classList.add("listItemSortBtnDiv");

  // new item button
  const createNewItemBtn = () => {
    newItemBtn.classList.add("main-button");
    newItemBtn.innerText = "New Task";
    newItemBtn.addEventListener("click", () => {
      listManager.addListItem(createListItem(), "L10000");
      displayListItemsFromArr(allListItems);
      displayAllTasks();
    });
    listItemBtnDivContainer.append(newItemBtn);
  };

// sort by date button
const createSortByDateBtn = () => {
  sortByDateBtn.classList.add("normal-button");
  sortByDateBtn.innerText = "Sort By Date";
  listItemsContainer.append(sortByDateBtn);
  sortByDateBtn.addEventListener("click", () => {
    if (sortFlag === "itemDueDateAsc") {
      sortItemsDesc("itemDueDate", allListItems);
      sortFlag = "itemDueDateDesc";
    } else {
      sortItemsAsc("itemDueDate", allListItems);
      sortFlag = "itemDueDateAsc";
    }
    console.log("sortByDate");
    console.log(allListItems);
    displayListItemsFromArr(allListItems);
  });
  listItemSortBtnDiv.append(sortByDateBtn);
};

  // sort by priority button
  const createSortByPriorityBtn = () => {
    sortByPriorityBtn.classList.add("normal-button");
    sortByPriorityBtn.innerText = "Sort By Priority";
    listItemsContainer.append(sortByPriorityBtn);
    sortByPriorityBtn.addEventListener("click", () => {
      if (sortFlag !== "itemPriorityDesc") {
        sortFlag = "itemPriorityDesc";
        sortItemsDesc("itemPriority", allListItems);
      } else if (sortFlag === "itemPriorityDesc") {
        sortItemsAsc("itemPriority", allListItems);
        sortFlag = "itemPriorityAsc";
      }
      displayListItemsFromArr(allListItems);
    });
    listItemSortBtnDiv.append(sortByPriorityBtn);
  };

  // sort by is completed button
  const createSortByItemIsCompletedBtn = () => {
    sortByItemIsCompletedBtn.classList.add("normal-button");
    sortByItemIsCompletedBtn.innerText = "Sort By Completion";
    listItemsContainer.append(sortByItemIsCompletedBtn);
    sortByItemIsCompletedBtn.addEventListener("click", () => {
      if (sortFlag !== "itemIsCompletedAsc") {
        sortFlag = "itemIsCompletedAsc";
        sortItemsAsc("itemIsCompleted", allListItems);
      } else if (sortFlag === "itemIsCompletedAsc") {
        sortItemsDesc("itemIsCompleted", allListItems);
        sortFlag = "itemIsCompletedDesc";
      }
      displayListItemsFromArr(allListItems);
    });
    listItemSortBtnDiv.append(sortByItemIsCompletedBtn);
  };

  createNewItemBtn();
  createSortByDateBtn();
  createSortByPriorityBtn();
  createSortByItemIsCompletedBtn();
  listItemBtnDivContainer.append(listItemSortBtnDiv);
  listItemsContainer.append(listItemBtnDivContainer);

  // loop through list to dynamically generate title and id fields, or no tasks message
  if (allListItems.length === 0) {
    noTasksMessage.classList.add("itemContainerNoTasks");
    noTasksMessage.innerText = "There are currently no tasks in this project.";
    listItemsContainer.append(noTasksMessage);
    return;
  } else if (allListItems.length > 0) {
    displayTitle = `All Tasks`;
    displayListId = "";
    listTitleH1.innerText = displayTitle;
    listIdH1.innerText = displayListId;
  }
  if (allListItems.length > 0) {
    displayListItemsFromArr(allListItems);
  }
};

export { displayAllTasks };
