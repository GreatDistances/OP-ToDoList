import { listManager } from "./index.js";
import { displayList, } from "./displayList.js";

// NOTE:  This module renders views of individual listItems, and is called by displayList.js module.
// This code is slightly distinct from code in "displayAllTasks" and "displayListItemFromObj", which are used to render "All Tasks" view.

const displayListItemsByListId = (id) => {
  const itemViewMain = document.querySelector("#itemViewMain");
  const itemContainerContainer = document.querySelector(
    "#itemContainerContainer"
  );
  itemViewMain.append(itemContainerContainer);
  itemContainerContainer.classList.add("itemContainerContainer");

  itemContainerContainer.innerHTML = "";

  const currentListId = id;

  const listIdArr = listManager.getAllListIds();
  const listTitlesArr = listManager.getAllListTitles();

  const arr = [...listManager.getAllListItems(currentListId)];

  for (let i = 0; i < arr.length; i++) {
    // console.log(arr[i]);

    // parent of itemIsCompletedCheckBoxDiv, itemContainer, deleteItemBtnContainer
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("itemContainer");

    // child of itemContainer, sibling of itemFieldsContainer, deleteItemBtnContainer
    const itemIsCompletedCheckBoxDiv = document.createElement("div");
    itemIsCompletedCheckBoxDiv.classList.add("itemIsCompletedCheckBoxDiv");

    // child of itemContainer, sibling of itemIsCompletedCheckBoxDiv, deleteItemBtnContainer
    const itemFieldsContainer = document.createElement("div");
    itemFieldsContainer.classList.add("itemFieldsContainer");

    // child of itemContainer, sibling of itemFieldsContainer, itemIsCompletedCheckBoxDiv
    const deleteItemBtnContainer = document.createElement("div");
    deleteItemBtnContainer.classList.add("deleteItemBtnContainer");

    const createTextField = (text, container, method) => {
      const value = arr[i][text];
      let enterKeyPressed = false;
      const cellContainer = document.createElement("div");
      const cell = document.createElement("input");
      cell.setAttribute(`data-${text}`, arr[i].itemId);
      cell.classList.add("fields");
      const br = document.createElement("br");
      const label = document.createElement("label");
      cell.value = value;
      label.classList.add("listItemLabel");
      label.innerText = text.slice(4);
      cell.contentEditable = "true";
      cell.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          cell.innerText;
          listManager[method](arr[i].itemId, cell.value); // sets value in listManager
          cell.blur();
          e.preventDefault();
        }
      });
      cell.onblur = () => {
        if (enterKeyPressed) {
          enterKeyPressed = false;
          return;
        }
        listManager[method](arr[i].itemId, cell.value); // sets value in listManager
      };
      cellContainer.append(cell, br, label);
      container.append(cellContainer);
    };

    const createDateField = (text, container, method) => {
      const value = arr[i][text];
      const cellContainer = document.createElement("div");
      const cell = document.createElement("input");
      cell.setAttribute(`data-${text}`, arr[i].itemId);
      cell.classList.add("fields");
      const br = document.createElement("br");
      const label = document.createElement("label");
      label.classList.add("listItemLabel");
      label.innerText = "Due Date";
      cell.setAttribute("type", "date");
      cell.value = value;
      if (value === "" || value === null || value === undefined) {
        cell.style.color = "lightGrey";
      }
      cell.onblur = () => {
        listManager[method](arr[i].itemId, cell.value); // sets value in listManager
        if (
          cell.value !== "" &&
          cell.value !== null &&
          cell.value !== undefined
        ) {
          cell.style.color = "black";
        } else if (
          cell.value === "" ||
          cell.value === null ||
          cell.value === undefined
        ) {
          cell.style.color = "lightGrey";
        }
      };
      cellContainer.append(cell, br, label);
      container.append(cellContainer);
    };

    const createSelectPriority = (text, container, method) => {
      const value = arr[i][text];
      const cellContainer = document.createElement("div");
      const cell = document.createElement("select");
      cell.setAttribute(`data-${text}`, arr[i].itemId);
      cell.classList.add("fields");
      const br = document.createElement("br");
      const label = document.createElement("label");
      label.classList.add("listItemLabel");
      label.innerText = text.slice(4);
      const optArr = ["", "!", "!!", "!!!"];
      for (let i = 0; i < optArr.length; i++) {
        const opt = document.createElement("option");
        opt.value = optArr[i];
        opt.text = optArr[i];
        cell.style.fontWeight = "bold";
        cell.appendChild(opt);
      }
      cell.value = value;
      cell.onblur = () => {
        listManager[method](arr[i].itemId, cell.value); // sets value in listManager
      };
      cellContainer.append(cell, br, label);
      container.append(cellContainer);
    };

    const createSelectListId = (text, container, method) => {
      const value = currentListId;
      const cellContainer = document.createElement("div");
      const cell = document.createElement("select");
      cell.setAttribute(`data-${text}`, arr[i].itemId);
      cell.classList.add("fields");
      const br = document.createElement("br");
      const label = document.createElement("label");
      label.classList.add("listItemLabel");
      label.innerText = "List";
      const optArr = [...listIdArr];
      const optArrDisplay = [...listTitlesArr];
      for (let i = 0; i < optArr.length; i++) {
        const opt = document.createElement("option");
        opt.value = optArr[i];
        opt.text = `${optArrDisplay[i]} - ID# ${optArr[i]}`;
        cell.appendChild(opt);
      }
      cell.value = value;
      cell.onchange = () => {
        listManager[method](arr[i].itemId, currentListId, cell.value); // sets value in listManager
        displayListItemsByListId(currentListId);
      };
      cellContainer.append(cell, br, label);
      container.append(cellContainer);
    };

    const createItemIsCompletedCheckbox = () => {
      const itemIsCompletedCheckbox = document.createElement("INPUT");
      itemIsCompletedCheckbox.setAttribute("type", "checkbox");
      itemIsCompletedCheckbox.checked = arr[i].itemIsCompleted;
      itemIsCompletedCheckbox.addEventListener("click", () => {
        arr[i].itemIsCompleted = !arr[i].itemIsCompleted;
      });
      itemIsCompletedCheckBoxDiv.classList.add("itemIsCompletedCheckBoxDiv");
      itemIsCompletedCheckBoxDiv.append(itemIsCompletedCheckbox);
    };

    const createDeleteItemBtn = () => {
      const deleteItemBtn = document.createElement("button");
      deleteItemBtn.innerText = "X";
      deleteItemBtn.classList.add("deleteBtn");
      deleteItemBtn.addEventListener("click", () => {
        listManager.deleteItem(arr[i].itemId, currentListId);
        displayList(currentListId); // TODO - refactor logic between this and displayList so header is not re-rendered on every delete press, but "There are currently no tasks" card still shows.
      });
      deleteItemBtnContainer.append(deleteItemBtn);
    };

    createItemIsCompletedCheckbox();
    createTextField("itemTitle", itemFieldsContainer, "setItemTitle");
    createTextField(
      "itemDescription",
      itemFieldsContainer,
      "setItemDescription"
    );
    //createTextField("itemNotes", itemFieldsContainer, "setItemNotes");
    createSelectListId("listId", itemFieldsContainer, "setItemToDifferentList");
    createDateField("itemDueDate", itemFieldsContainer, "setItemDueDate");
    createSelectPriority(
      "itemPriority",
      itemFieldsContainer,
      "setItemPriority"
    );
    createDeleteItemBtn();

    // Append children to itemContainer
    itemContainer.append(itemIsCompletedCheckBoxDiv);
    itemContainer.append(itemFieldsContainer);
    itemContainer.append(deleteItemBtnContainer);

    // Append itemContainer to itemContainerContainer
    itemContainerContainer.append(itemContainer);
  }
};

export default displayListItemsByListId;
