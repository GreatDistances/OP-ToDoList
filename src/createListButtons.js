import List from "./list.js";
import { listManager } from "./index.js";
import displaySideBarLists from "./displaySideBarLists.js";
import { displayAllTasks } from "./displayAllTasks.js";
import { displayList } from "./displayList.js";

const createListButtons = () => {
  const newListBtn = document.querySelector("#newListBtn");
  newListBtn.addEventListener("click", () => {
    listManager.addNewList(List.createList(""));
  });

  const displayAllTasksBtn = document.querySelector("#displayAllTasksBtn");
  displayAllTasksBtn.addEventListener("click", () => {
    displayAllTasks();
  });

  const displayUnassignedTasksBtn = document.querySelector("#displayUnassignedTasksBtn");
  displayUnassignedTasksBtn.addEventListener("click", () => {
    displayList("L10000");
  });

  let sortFlag = "";

  const listBtnDivSecondaryTwo = document.querySelector("#listBtnDivSecondaryTwo");
  listBtnDivSecondaryTwo.classList.add("listBtnDivSecondaryTwo");

  const listBtnSubContainer = document.createElement("div");
  listBtnSubContainer.classList.add("listBtnSubContainer");

  const sortListsByIdBtn = document.createElement("button");
  sortListsByIdBtn.innerText = "Sort By ID";
  sortListsByIdBtn.classList.add("normal-button");
  sortListsByIdBtn.addEventListener("click", () => {
    if (sortFlag !== "listIdAsc") {
      sortFlag = "listIdAsc";
      sortListsAsc("listId");
    } else if (sortFlag === "listIdAsc") {
      sortListsDesc("listId");
      sortFlag = "listIdDesc";
    }
    displaySideBarLists();
  });

  const sortListsByTitleBtn = document.createElement("button");
  sortListsByTitleBtn.classList.add("normal-button");
  sortListsByTitleBtn.innerText = "Sort By Name";
  sortListsByTitleBtn.addEventListener("click", () => {
    if (sortFlag !== "listTitleAsc") {
      sortFlag = "listTitleAsc";
      sortListsAsc("listTitle");
    } else if (sortFlag === "listTitleAsc") {
      sortListsDesc("listTitle");
      sortFlag = "listTitleDesc";
    }
    displaySideBarLists();
  });

  listBtnDivSecondaryTwo.append(sortListsByTitleBtn, sortListsByIdBtn);

  const sortListsAsc = (text) => {
    let sortedLists = listManager.getAllLists();
    sortedLists = sortedLists.sort((a, b) => {
      if (a[text] < b[text]) {
        return -1;
      } else if (a[text] > b[text]) {
        return 1;
      }
      return 0;
    });
    sortedLists.forEach((listItem) => {
      console.log(listItem);
    });
    return sortedLists;
  };

  // logic for sorting items descending
  const sortListsDesc = (text) => {
    let sortedLists = listManager.getAllLists();
    sortedLists = sortedLists.sort((a, b) => {
      if (b[text] < a[text]) {
        return -1;
      } else if (b[text] > a[text]) {
        return 1;
      }
      return 0;
    });
    sortedLists.forEach((listItem) => {
      console.log(listItem);
    });
    return sortedLists;
  };
};

export default createListButtons;
