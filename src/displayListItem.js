import { deleteItem } from "./addItem.js";

const listItemsContainer = document.querySelector("#listItemsContainer");

const displayListItems = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i].itemTitle);

        const item = document.createElement("div");
        item.classList.add("item");
        const itemTitle = document.createElement("div");
        itemTitle.classList.add("itemTitle");
        const itemDataContainer = document.createElement("div");
        itemDataContainer.classList.add("itemDataContainer");

        const createListDataContainer = (text, container) => {
            const cell = document.createElement("div");
            cell.innerText = arr[i][text];
            container.append(cell);
            cell.contentEditable="true";
            cell.onblur = () => {
                arr[i][text] = cell.innerText;
            }
            cell.addEventListener("keypress", function(e) {
                if (e.key === "Enter") {
                    arr[i][text] = cell.innerText;
                    cell.blur();
                }
            });
            container.append(cell);
        }

        listItemsContainer.append(item);
        item.append(itemTitle);
        item.append(itemDataContainer);

        createListDataContainer("itemTitle", itemTitle);

        const itemIsCompletedCheckBoxDiv = document.createElement("div");
        itemDataContainer.append(itemIsCompletedCheckBoxDiv);

        const itemIsCompletedCheckbox = document.createElement("INPUT");
        itemIsCompletedCheckbox.setAttribute("type", "checkbox");
        itemIsCompletedCheckbox.checked = arr[i].itemIsCompleted;
        itemIsCompletedCheckbox.addEventListener("click", () => {
            arr[i].itemIsCompleted = !arr[i].itemIsCompleted;
        })
        itemIsCompletedCheckBoxDiv.append(itemIsCompletedCheckbox);

        const itemFields = ["itemPriority", "itemDueDate", "itemDescription", "itemNotes"];
        for (let field of itemFields) {
            createListDataContainer(field, itemDataContainer);
        }


        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", () => {
            deleteItem(arr[i].itemId);
        })
    }
}

export default displayListItems;