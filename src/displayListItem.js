import { deleteItem } from "./modifyItem.js";

const listItemsContainer = document.querySelector("#listItemsContainer");

const displayListItems = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i].itemTitle);
        const item = document.createElement("div");
        const titleRow = document.createElement("tr");
        const title = document.createElement("td").innerText = arr[i].itemTitle;
        const itemData = document.createElement("table");
        const priority = document.createElement("td").innerText = arr[i].priority;
        const description = document.createElement("td").innerText = arr[i].description;
        const dueDate = document.createElement("td").innerText = arr[i].dueDate;
        const notes = document.createElement("td").innerText = arr[i].notes;
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", () => {
            deleteItem(arr[i].itemId);
        })
        
        listItemsContainer.append(item);
        item.append(titleRow, itemData);
        titleRow.append(title);
        itemData.append(description, priority, dueDate, notes, deleteBtn);

    }
}

export default displayListItems;