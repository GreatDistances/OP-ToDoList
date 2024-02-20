import { listManager } from './index.js';
import displayListItems from './displayListItem.js';
import { createListItem } from './createListItem.js';

let sortFlag = "";

const displayList = (id) => {

    const lists = [...listManager.getAllLists()];

    const listItemsContainer = document.querySelector("#listItemsContainer");
    
    listItemsContainer.replaceChildren(); // TODO:  update later to show multiple lists at a time.

    // if no listId is selected, display text that requests user add or select a project
    if (!id || id === -1) {
        const noListSelected = document.createElement("h1");
        noListSelected.innerText = "Add or Select a Project";
        listItemsContainer.append(noListSelected);
        return;
    }

    listManager.setCurrentListId(id);

    const titleTd = document.createElement("h1");
    let displayTitle;
    listItemsContainer.append(titleTd);

    const listItemBtnDivContainer = document.createElement("div");
    listItemBtnDivContainer.classList.add("listItemBtnDivContainer");

    const listItemSortBtnDiv = document.createElement("div");
    listItemSortBtnDiv.classList.add("listItemSortBtnDiv");

    const addItemDialog = document.querySelector("#addItemDialog");
    const openItemDialogBtn = document.createElement("button");
    openItemDialogBtn.classList.add("normal-button");
    openItemDialogBtn.innerText = "Add a task";
    openItemDialogBtn.addEventListener("click", () => {
        addItemDialog.showModal();
    })
    listItemBtnDivContainer.append(openItemDialogBtn);

    const sortByDateBtn = document.createElement("button");
    sortByDateBtn.classList.add("normal-button");
    sortByDateBtn.innerText = "Sort By Date";
    listItemsContainer.append(sortByDateBtn);
    sortByDateBtn.addEventListener("click", () => {
        if (sortFlag !== "itemDueDateAsc") {
            sortFlag = "itemDueDateAsc";
            sortItemsDesc("itemDueDate");
        } else if (sortFlag === "itemDueDateAsc") {
            sortItemsAsc("itemDueDate");
            sortFlag = "itemDueDateDesc";
        };
        displayList(listManager.getCurrentListId());
    });
    listItemSortBtnDiv.append(sortByDateBtn);

    const sortByPriorityBtn = document.createElement("button");
    sortByPriorityBtn.classList.add("normal-button");
    sortByPriorityBtn.innerText = "Sort By Priority";
    listItemsContainer.append(sortByPriorityBtn);
    sortByPriorityBtn.addEventListener("click", () => {
        if (sortFlag !== "itemPriorityDesc") {
            sortFlag = "itemPriorityDesc";
            sortItemsDesc("itemPriority");
        } else if (sortFlag === "itemPriorityDesc") {
            sortItemsAsc("itemPriority");
            sortFlag = "itemPriorityAsc";
        };
        displayList(listManager.getCurrentListId());
    });
    listItemSortBtnDiv.append(sortByPriorityBtn);

    const sortByItemIsCompletedBtn = document.createElement("button");
    sortByItemIsCompletedBtn.classList.add("normal-button");
    sortByItemIsCompletedBtn.innerText = "Sort By Completion";
    listItemsContainer.append(sortByItemIsCompletedBtn);
    sortByItemIsCompletedBtn.addEventListener("click", () => {
        if (sortFlag !== "itemIsCompletedAsc") {
            sortFlag = "itemIsCompletedAsc";
            sortItemsAsc("itemIsCompleted");
        } else if (sortFlag === "itemIsCompletedAsc") {
            sortItemsDesc("itemIsCompleted");
            sortFlag = "itemIsCompletedDesc";
        };
        displayList(listManager.getCurrentListId());
    });
    listItemSortBtnDiv.append(sortByItemIsCompletedBtn);

    listItemBtnDivContainer.append(listItemSortBtnDiv);
    listItemsContainer.append(listItemBtnDivContainer);

    for (let i = 0; i < lists.length; i++) {
        if (lists.length === 0) {
            console.log("no lists");
            return;
        }
        if (lists[i].listId === id) {
            displayTitle = `Project: ${lists[i].listTitle}`;
            titleTd.innerText = displayTitle;
            if (lists[i].listItems.length > 0) {
                displayListItems(id);
            } else {
                const noTasksMessage = document.createElement("div");
                noTasksMessage.classList.add("itemContainerNoTasks");
                noTasksMessage.innerText = "There are currently no tasks in this project.";
                listItemsContainer.append(noTasksMessage);
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
    listManager.addItem(createListItem(newItemName, newItemDescription, newItemPriority, newItemDueDate, newItemNotes));
    const currentListId = listManager.getCurrentListId();
    displayList(currentListId);
    addItemDialog.close();
    addItemForm.reset();
});

const sortItemsAsc = (text) => {
    const currentListId = listManager.getCurrentListId();
    let sortedItems = listManager.getListItems(currentListId);
    sortedItems = sortedItems.sort((a,b) => {
        if (a[text] < b[text]) {
            return -1;
        } else if (a[text] > b[text]) {
            return 1;
        }
        return 0;
    });
    sortedItems.forEach((listItem) =>  {
        console.log(listItem);
    });   
    return sortedItems;
}

const sortItemsDesc = (text) => {
    const currentListId = listManager.getCurrentListId();
    let sortedItems = listManager.getListItems(currentListId);
    sortedItems = sortedItems.sort((a,b) => {
        if (b[text] < a[text]) {
            return -1
        } else if (b[text] > a[text]) {
            return 1;
        }
        return 0;
    });
    sortedItems.forEach((listItem) =>  {
        console.log(listItem);
    });   
    return sortedItems;
}

export {displayList}