import { listManager } from './index.js';

const listItemsContainer = document.querySelector("#listItemsContainer");

const displayListItems = (id) => {

    const arr = [...listManager.getListItems(id)];

    arr.forEach((item) => console.log(item));

    for (let i = 0; i < arr.length; i++) {

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

        listItemsContainer.append(itemContainer);

        const createTextField = (text, container, method) => {
            const value = arr[i][text];
            const enterKeyPressed = false;
            const cellContainer = document.createElement("div");
            const cell = document.createElement("input");
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
                    listManager[method](arr[i].itemId, cell.value); // sets value in listManager
                    cell.blur();
                    e.preventDefault()
                }
            });
            cell.onblur = () => {
                if (enterKeyPressed) {
                    enterKeyPressed = false;
                    return;
                }
                listManager[method](arr[i].itemId, cell.value); // sets value in listManager
            }
            cellContainer.append(cell, br, label);
            container.append(cellContainer);
        }
        
        const createDateField = (text, container, method) => {
            const value = arr[i][text];
            const cellContainer = document.createElement("div");
            const cell = document.createElement("input");
            cell.classList.add("fields");
            const br = document.createElement("br");
            const label = document.createElement("label");
            label.classList.add("listItemLabel");
            label.innerText = "Due Date";
            cell.setAttribute("type", "date");
            cell.value = value;
            cell.onblur = () => {
                listManager[method](arr[i].itemId, cell.value); // sets value in listManager
            }
            cellContainer.append(cell, br, label);
            container.append(cellContainer);
        }

        const createSelectField = (text, container, method) => {
            const value = arr[i][text];
            const cellContainer = document.createElement("div");
            const cell = document.createElement("select");
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
            }
            cellContainer.append(cell, br, label);
            container.append(cellContainer);
        }

        const itemIsCompletedCheckbox = document.createElement("INPUT");
        itemIsCompletedCheckbox.setAttribute("type", "checkbox");
        itemIsCompletedCheckbox.checked = arr[i].itemIsCompleted;
        itemIsCompletedCheckbox.addEventListener("click", () => {
            arr[i].itemIsCompleted = !arr[i].itemIsCompleted;
        })
        itemIsCompletedCheckBoxDiv.classList.add("itemIsCompletedCheckBoxDiv");
        itemIsCompletedCheckBoxDiv.append(itemIsCompletedCheckbox);

        createTextField("itemTitle", itemFieldsContainer, "setItemTitle");
        createTextField("itemDescription", itemFieldsContainer, "setItemDescription");
        createTextField("itemNotes", itemFieldsContainer, "setItemNotes");
        createDateField("itemDueDate", itemFieldsContainer, "setItemDueDate");
        createSelectField("itemPriority", itemFieldsContainer, "setItemPriority");

        const deleteItemBtn = document.createElement("button");
        deleteItemBtn.innerText = "X";
        deleteItemBtn.classList.add("deleteBtn");
        deleteItemBtn.addEventListener("click", () => {
            listManager.deleteItem(arr[i].itemId);
        })
        deleteItemBtnContainer.append(deleteItemBtn);
        itemContainer.append(deleteItemBtnContainer);
    }
}

export default displayListItems;