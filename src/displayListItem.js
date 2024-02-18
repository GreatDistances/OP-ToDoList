import { deleteItem } from "./addItem.js";

const listItemsContainer = document.querySelector("#listItemsContainer");

const displayListItems = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i].itemTitle);

        const item = document.createElement("div");
        const itemTable = document.createElement("table");
        const itemTitleRow = document.createElement("tr");
        const itemDataRow = document.createElement("tr");

        const createTableCell = (text, container) => {
            const cell = document.createElement("td");
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
        item.append(itemTable);
        itemTable.append(itemTitleRow);
        itemTable.append(itemDataRow);

        createTableCell("itemTitle", itemTitleRow);

        const itemIsCompletedCheckBoxTd = document.createElement("td");
        itemDataRow.append(itemIsCompletedCheckBoxTd);

        const itemIsCompletedCheckbox = document.createElement("INPUT");
        itemIsCompletedCheckbox.setAttribute("type", "checkbox");
        itemIsCompletedCheckbox.checked = arr[i].itemIsCompleted;
        itemIsCompletedCheckbox.addEventListener("click", () => {
            arr[i].itemIsCompleted = !arr[i].itemIsCompleted;
        })
        itemIsCompletedCheckBoxTd.append(itemIsCompletedCheckbox);

        const itemFields = ["itemDescription", "itemPriority", "itemDueDate", "itemNotes"];
        for (let field of itemFields) {
            createTableCell(field, itemDataRow);
        }


        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", () => {
            deleteItem(arr[i].itemId);
        })
    }
}

export default displayListItems;