import { listManager } from "./index.js";
import { displayList } from "./displayList.js";

const displayAllLists = () => {
  const listContainer = document.querySelector("#listContainer");
  listContainer.replaceChildren(); // clears prior view of existing lists

  const lists = listManager.getAllLists();

  for (let i = 0; i < lists.length; i++) {
    const thisListId = lists[i].listId;

    const thisList = document.createElement("div");
    listContainer.append(thisList);

    // viewListBtn - same on all Lists
    const createViewListBtn = () => {
      const viewListBtn = document.createElement("button");
      viewListBtn.innerText = "View";
      viewListBtn.classList.add("normal-button");
      viewListBtn.addEventListener("click", () => {
        displayList(thisListId);
      });
      thisList.append(viewListBtn);
    };

    // listTitleField - different for unassigned tasks vs. user lists
    const createListTitleField = (listId) => {
        let listTitleField;
        if (listId === "L10000") {
            listTitleField = document.createElement("div");
            listTitleField.innerText = "Unassigned Tasks";
            listTitleField.classList.add("unassignedItemsListTitle");
        } else {
            listTitleField = document.createElement("input");
            listTitleField.value = lists[i].listTitle;
            listTitleField.classList.add("fields");
        }
      listTitleField.setAttribute("data-list-title-id", thisListId);
      thisList.append(listTitleField);
      listTitleField.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          listTitleField.blur();
          displayList(thisListId);
          e.preventDefault();
        }
      });
      listTitleField.addEventListener("change", function () {
        const newValue = listTitleField.value.trim();
        const oldValue = lists[i].listTitle.trim();
    
        if (newValue !== oldValue) {
            listManager.setListTitle(thisListId, newValue);
            displayList(thisListId);
        }
    });
      thisList.append(listTitleField);
    };

    // listIDField - same on each list
    const createListIdField = () => {
      const listIdField = document.createElement("div");
      listIdField.innerText = lists[i].listId;
      listIdField.classList.add("listIdField");
      listIdField.setAttribute("data-list-title-id", thisListId);
      thisList.append(listIdField);
    };

    // Normal, editable list DOM builds
    const createDeleteListBtnDiv = (listId) => {
      const deleteListBtnDiv = document.createElement("div");
      deleteListBtnDiv.classList.add("deleteBtnDiv");
      const deleteListBtn = document.createElement("button");
      deleteListBtn.addEventListener("click", function () {
        listManager.deleteList(thisListId);
      });
      deleteListBtn.classList.add("deleteBtn");
      deleteListBtn.innerText = "X";
      thisList.append(deleteListBtnDiv);
      if (listId === "L10000") {
        return;
      }
      deleteListBtnDiv.append(deleteListBtn);
    };

    const setThisListStyling = (listId) => {
      if (listId === "L10000") {
        thisList.classList.add("unassignedItemsList");
      } else {
        thisList.classList.add("thisList");
      }
    };

    createViewListBtn();
    createListTitleField(thisListId);
    createListIdField(thisListId);
    createDeleteListBtnDiv(thisListId);
    setThisListStyling(thisListId);
  }
};

export default displayAllLists;
