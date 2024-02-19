import {lists, getCurrentListId, setCurrentListId, getListsLength } from './lists.js';
import displayListItems from './displayListItem.js';
import { addItem } from './addItem.js';
import { createListItem } from './createListItem.js';

const displayList = (id) => {
    
    listItemsContainer.replaceChildren(); // TODO:  update later to show multiple lists at a time.
    if (!id || id === -1) {
        listItemsContainer.innerText = "Add or Select a Project";
        return;
    }

    setCurrentListId(id);
    
    const titleTd = document.createElement("h1");
    let displayTitle;
    listItemsContainer.append(titleTd);

    const addItemDialog = document.querySelector("#addItemDialog");
    const openItemDialogBtn = document.createElement("button");
    openItemDialogBtn.classList.add("normal-button");
    openItemDialogBtn.innerText = "Add a task";
    openItemDialogBtn.addEventListener("click", () => {
        addItemDialog.showModal();
    })
    listItemsContainer.append(openItemDialogBtn);

    for (let i = 0; i < lists.length; i++) {
        if (getListsLength === 0) {
            console.log("no lists");
            return;
        }
        if (lists[i].listId === id) {
            displayTitle = `Project: ${lists[i].listTitle}`
            titleTd.innerText = displayTitle;
            if (lists[i].listItems.length > 0) {
                displayListItems(lists[i].listItems);
                console.log(lists[i].listItems);
            }
        }
    }
}

const closeAddItemDialogBtn = document.querySelector("#closeAddItemDialogBtn");
closeAddItemDialogBtn.addEventListener("click", () => {
    addItemDialog.close();
})

const addItemForm = document.querySelector('#addItemForm');

const submitItemBtn = document.querySelector("#submitItemBtn");
submitItemBtn.addEventListener("click", () => {
    const newItemName = document.querySelector("#itemTitle").value;
    const newItemDescription = document.querySelector("#itemDescription").value;
    const newItemPriority = document.querySelector("#itemPriority").value;
    const newItemDueDate = document.querySelector("#itemDueDate").value;
    const newItemNotes = document.querySelector("#itemNotes").value;
    addItem(createListItem(newItemName, newItemDescription, newItemPriority, newItemDueDate, newItemNotes));
    displayList(getCurrentListId());
    addItemDialog.close();
    addItemForm.reset();
});

export {displayList}