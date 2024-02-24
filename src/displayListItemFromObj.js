import { listManager } from './index.js';
import { displayAllTasks2 } from './displayAllTasks2.js';

const displayListItemFromObj = (item) => {

    console.log("fromOb");
    console.log(item);

    let listIdArr = listManager.getAllListIds();
    let listTitlesArr = listManager.getAllListTitles();

        const itemContainerContainer = document.querySelector("#itemContainerContainer");
        itemContainerContainer.classList.add("itemContainerContainer");

        // parent of itemIsCompletedCheckBoxDiv, itemContainer, deleteItemBtnContainer
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

        const createTextField = (text, container, method) => {
            const value = item[text];
            const enterKeyPressed = false;
            const cellContainer = document.createElement("div");
            const cell = document.createElement("input");
            cell.setAttribute(`data-${text}`, item.itemId);
            cell.classList.add("fields");
            const br = document.createElement("br");
            const label = document.createElement("label");
            cell.value = value;
            label.classList.add("listItemLabel");
            label.innerText = text.slice(4);
            cell.contentEditable="true";
            cell.addEventListener("keypress", function(e) {
                if (e.key === "Enter") {
                    cell.innerText
                    listManager[method](item.itemId, cell.value); // sets value in listManager
                    cell.blur();
                    e.preventDefault()
                }
            });
            cell.onblur = () => {
                if (enterKeyPressed) {
                    enterKeyPressed = false;
                    return;
                }
                listManager[method](item.itemId, cell.value); // sets value in listManager

            }
            cellContainer.append(cell, br, label);
            container.append(cellContainer);
        }
        
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
            cell.onchange = () => {
                console.log(cell.value);
                console.log(item.itemId);
                listManager[method](item.itemId, cell.value); // sets value in listManager
            }
            cellContainer.append(cell, br, label);
            container.append(cellContainer);
        }

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
                listManager[method](item.itemId, cell.value); // sets value in listManager
            }
            cellContainer.append(cell, br, label);
            container.append(cellContainer);
        }

         const createSelectListId = (text, container, method) => {
            const value = item.listId;
            const cellContainer = document.createElement("div");
            const cell = document.createElement("select");
            cell.setAttribute(`data-${text}`, item.itemId);
            cell.classList.add("fields");
            const br = document.createElement("br");
            const label = document.createElement("label");
            label.classList.add("listItemLabel");
            label.innerText = "List"
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
                listManager[method](item.itemId, item.listId, cell.value); // sets value in listManager
            }
            cellContainer.append(cell, br, label);
            container.append(cellContainer);
        }

        const createItemIsCompletedCheckbox = () => {
        const itemIsCompletedCheckbox = document.createElement("INPUT");
        itemIsCompletedCheckbox.setAttribute("type", "checkbox");
        itemIsCompletedCheckbox.checked = item.itemIsCompleted;
        itemIsCompletedCheckbox.addEventListener("click", () => {
            item.itemIsCompleted = !item.itemIsCompleted;
        })
        itemIsCompletedCheckBoxDiv.classList.add("itemIsCompletedCheckBoxDiv");
        itemIsCompletedCheckBoxDiv.append(itemIsCompletedCheckbox);
    }

    const createDeleteItemBtn = () => {
        const deleteItemBtn = document.createElement("button");
        deleteItemBtn.innerText = "X";
        deleteItemBtn.classList.add("deleteBtn");
        deleteItemBtn.addEventListener("click", () => {
            console.log(item.itemId);
            console.log(item.listId);
            listManager.deleteItem(item.itemId, item.listId);
            displayAllTasks2();
        })
        deleteItemBtnContainer.append(deleteItemBtn);
        itemContainer.append(deleteItemBtnContainer);
    }

        createItemIsCompletedCheckbox();
        createTextField("itemTitle", itemFieldsContainer, "setItemTitle");
        createTextField("itemDescription", itemFieldsContainer, "setItemDescription");
        //createTextField("itemNotes", itemFieldsContainer, "setItemNotes");
        createSelectListId("listId", itemFieldsContainer, "setItemToDifferentList");
        createDateField("itemDueDate", itemFieldsContainer, "setItemDueDate");
        createSelectPriority("itemPriority", itemFieldsContainer, "setItemPriority");
        createDeleteItemBtn();
        itemContainerContainer.append(itemContainer);

}

export {displayListItemFromObj}