import { listManager } from './index.js';

const listItemsContainer = document.querySelector("#listItemsContainer");

const displayListItems = (arr) => {
    for (let i = 0; i < arr.length; i++) {

        // parent of itemIsCompletedCheckBoxDiv and itemSubContainer
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("itemContainer");

        // child of itemContainer, sibling of itemSubSubContainer
        const itemIsCompletedCheckBoxDiv = document.createElement("div");
        itemIsCompletedCheckBoxDiv.classList.add("itemIsCompletedCheckBoxDiv");
        itemContainer.append(itemIsCompletedCheckBoxDiv);

        // child of itemContainer, parent of itemSubSubContainer and itemNotesContainer
        const itemSubContainer = document.createElement("div");
        itemSubContainer.classList.add("itemSubContainer");
        itemContainer.append(itemSubContainer);

        // child of itemContainer, sibling of itemNotesContainer
        const itemSubSubContainer = document.createElement("div");
        itemSubSubContainer.classList.add("itemSubSubContainer");
        itemSubContainer.append(itemSubSubContainer);

        // child of itemContainer, sibling of itemSubSubContainer
        const itemNotesContainer = document.createElement("div");
        itemNotesContainer.classList.add("itemNotesContainer");
        itemSubContainer.append(itemNotesContainer);

            listItemsContainer.append(itemContainer);

        const createTextField = (text, container) => {
            const value = arr[i][text];
            const cellContainer = document.createElement("div");
            const cell = document.createElement("div");
            const label = document.createElement("label");
            cell.innerText = value;
            label.classList.add("listItemLabel");
            label.innerText = text.slice(4);
            cell.contentEditable="true";
            cell.onblur = () => {
                arr[i][text] = cell.innerText;
            }
            cell.addEventListener("keypress", function(e) {
                if (e.key === "Enter") {
                    arr[i][text] = cell.innerText;
                    cell.blur();
                    e.preventDefault()
                }
            });
            cellContainer.append(cell);
            cellContainer.append(label);
            container.append(cellContainer);
        }
        
        const createDateField = (text, container) => {
            const value = arr[i][text];
            const cellContainer = document.createElement("div");
            const cell = document.createElement("INPUT");
            const label = document.createElement("label");
            label.classList.add("listItemLabel");
            label.innerText = "Due Date";
            cell.setAttribute("type", "date");
            cell.value = value;
            cell.onblur = () => {
                arr[i][text] = cell.value;
            }
            cellContainer.append(cell);
            cellContainer.append(label);
            container.append(cellContainer);
        }

        const createSelectField = (text, container) => {
            const value = arr[i][text];
            const cellContainer = document.createElement("div");
            const cell = document.createElement("select");
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
                arr[i][text] = cell.value;
            }
            cellContainer.append(cell);
            cellContainer.append(label);
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

        createTextField("itemTitle", itemSubSubContainer);
        createTextField("itemDescription", itemSubSubContainer);
        createDateField("itemDueDate", itemSubSubContainer);
        createSelectField("itemPriority", itemSubSubContainer);
        createTextField("itemNotes", itemNotesContainer);

        const deleteItemBtn = document.createElement("button");
        deleteItemBtn.innerText = "X";
        deleteItemBtn.classList.add("deleteBtn");
        deleteItemBtn.addEventListener("click", () => {
            listManager.deleteItem(arr[i].itemId);
        })
        itemSubSubContainer.append(deleteItemBtn);
    }

}

export default displayListItems;