import { listManager } from "./index.js";
import { displayAllTasks } from "./displayAllTasks.js";

// NOTE:  This module renders views of individual listItems, and is called by displayAllTasks.
// This code is slightly distinct from code in "displayList" and "displayListItemsByListId", which are used to render views of individual lists and their listItems.

const displayListItemFromObj = (item) => {

  let listIdArr = listManager.getAllListIds();
  let listTitlesArr = listManager.getAllListTitles();

  // parent of itemContainer
  const itemContainerContainer = document.querySelector(
    "#itemContainerContainer"
  );
  itemContainerContainer.classList.add("itemContainerContainer");

  // child of itemContainerContainer, parent of itemIsCompletedCheckBoxDiv, itemContainer, deleteItemBtnContainer
  const itemContainer = document.createElement("div");
  itemContainer.classList.add("itemContainer");

  // child of itemContainer, sibling of itemFieldsContainer, deleteItemBtnContainer
  const itemIsCompletedCheckBoxDiv = document.createElement("div");
  itemIsCompletedCheckBoxDiv.classList.add("itemIsCompletedCheckBoxDiv");
  itemContainer.append(itemIsCompletedCheckBoxDiv);

  // child of itemContainer, sibling of itemIsCompletedCheckBoxDiv, deleteItemBtnContainer
  const itemFieldsContainer = document.createElement("div");
  itemFieldsContainer.classList.add("itemFieldsContainer");
  itemContainer.append(itemFieldsContainer);

  // child of itemContainer, sibling of itemFieldsContainer, itemIsCompletedCheckBoxDiv
  const deleteItemBtnContainer = document.createElement("div");
  deleteItemBtnContainer.classList.add("deleteItemBtnContainer");
  itemContainer.append(deleteItemBtnContainer);

  // create text inputs on listItems
  const createTextField = (text, container, method) => {
    const value = item[text];
    let enterKeyPressed = false;
    const cellContainer = document.createElement("div");
    const cell = document.createElement("input");
    cell.setAttribute(`data-${text}`, item.itemId);
    cell.classList.add("fields");
    const br = document.createElement("br");
    const label = document.createElement("label");
    cell.value = value;
    label.classList.add("listItemLabel");
    label.innerText = text.slice(4);
    cell.contentEditable = "true";
    cell.addEventListener("keypress", function (e) {
      listManager.setCurrentListId(item.listId);
      if (e.key === "Enter") {
        cell.innerText;
        listManager[method](item.itemId, cell.value); // sets value in listManager
        cell.blur();
        e.preventDefault();
      }
    });
    cell.onblur = () => {
      listManager.setCurrentListId(item.listId);
      if (enterKeyPressed) {
        enterKeyPressed = false;
        return;
      }
      listManager[method](item.itemId, cell.value); // sets value in listManager
    };
    cellContainer.append(cell, br, label);
    container.append(cellContainer);
  };

  // create date inputs on listItems
  const createDateField = (text, container, method) => {
    const value = item.itemDueDate;
    const cellContainer = document.createElement("div");
    const cell = document.createElement("input");
    cell.setAttribute(`data-${text}`, item.itemId);
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
    cell.onchange = () => {
      listManager.setCurrentListId(item.listId);
      listManager[method](item.itemId, cell.value); // sets value in listManager
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

  // create priority select inputs on listItems
  const createSelectPriority = (text, container, method) => {
    const value = item[text];
    const cellContainer = document.createElement("div");
    const cell = document.createElement("select");
    cell.setAttribute(`data-${text}`, item.itemId);
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
      listManager.setCurrentListId(item.listId);
      listManager[method](item.itemId, cell.value); // sets value in listManager
    };
    cellContainer.append(cell, br, label);
    container.append(cellContainer);
  };

    // create listId select inputs on listItems
  const createSelectListId = (text, container, method) => {
    const value = item.listId;
    const cellContainer = document.createElement("div");
    const cell = document.createElement("select");
    cell.setAttribute(`data-${text}`, item.itemId);
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
      listManager.setCurrentListId(item.listId); // without this, "All Tasks" list will not reference item fields + buttons correctly on load.
      listManager[method](item.itemId, item.listId, cell.value); // sets value in listManager
    };
    cellContainer.append(cell, br, label);
    container.append(cellContainer);
  };

  // create itemIsCompleted check box on listItems
  const createItemIsCompletedCheckbox = () => {
    const itemIsCompletedCheckbox = document.createElement("INPUT");
    itemIsCompletedCheckbox.setAttribute("type", "checkbox");
    itemIsCompletedCheckbox.checked = item.itemIsCompleted;
    itemIsCompletedCheckbox.addEventListener("click", () => {
      listManager.setCurrentListId(item.listId); // without this, "All Tasks" list will not reference item fields + buttons correctly on load.
      listManager.setItemIsCompleted(item.itemId);
    });
    itemIsCompletedCheckBoxDiv.classList.add("itemIsCompletedCheckBoxDiv");
    itemIsCompletedCheckBoxDiv.append(itemIsCompletedCheckbox);
  };

  // create delete item btn on listItems
  const createDeleteItemBtn = () => {
    const deleteItemBtn = document.createElement("button");
    deleteItemBtn.innerText = "X";
    deleteItemBtn.classList.add("deleteBtn");
    deleteItemBtn.addEventListener("click", () => {
      listManager.setCurrentListId(item.listId); // without this, "All Tasks" list will not reference item fields + buttons correctly on load.
      listManager.deleteItem(item.itemId, item.listId);
      displayAllTasks();
    });
    deleteItemBtnContainer.append(deleteItemBtn);
    itemContainer.append(deleteItemBtnContainer);
  };

  // render listItem view with buttons, add to DOM
  createItemIsCompletedCheckbox();
  createTextField("itemTitle", itemFieldsContainer, "setItemTitle");
  createTextField("itemDescription", itemFieldsContainer, "setItemDescription");
  //createTextField("itemNotes", itemFieldsContainer, "setItemNotes"); // has worked well, just removed to de-clutter view
  createSelectListId("listId", itemFieldsContainer, "setItemToDifferentList");
  createDateField("itemDueDate", itemFieldsContainer, "setItemDueDate");
  createSelectPriority("itemPriority", itemFieldsContainer, "setItemPriority");
  createDeleteItemBtn();
  itemContainerContainer.append(itemContainer);
};

export { displayListItemFromObj };
