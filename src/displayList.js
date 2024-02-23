import { listManager } from './index.js';
import displayListItems from './displayListItems.js';
import { createListItem } from './createListItem.js';

let sortFlag = "";

const displayList = (id) => {

    listManager.setCurrentListId(id);

    const lists = [...listManager.getAllLists()];
    const noTasksMessage = document.createElement("div");
    const listTitleContainer = document.createElement("div");
    const listTitleH1 = document.createElement("h1");
    const listIdH1 = document.createElement("h3");
    const listItemBtnDivContainer = document.createElement("div");
    const listItemSortBtnDiv = document.createElement("div");

    const newItemBtn = document.createElement("button");
    const sortByDateBtn = document.createElement("button");
    const sortByPriorityBtn = document.createElement("button");
    const sortByItemIsCompletedBtn = document.createElement("button");

    let displayTitle;
    let displayListId;

    const listItemsContainer = document.querySelector("#listItemsContainer");
    // clear listItemsContainer
    listItemsContainer.replaceChildren(); // TODO:  update later to show multiple lists at a time.

    // if no listId is selected, display text that requests user add or select a project
    if (!id || id === -1) {
        listItemsContainer.innerText = "Add or Select a Project";
        listItemsContainer.classList.add("noListSelected");
        return;
    } else {
        listItemsContainer.classList.remove("noListSelected");
    }

    listItemsContainer.append(listTitleContainer, listTitleH1, listIdH1);
    listTitleContainer.append(listTitleH1, listIdH1);
    listTitleContainer.classList.add("listTitleContainer");

    listItemBtnDivContainer.classList.add("listItemBtnDivContainer");

    listItemSortBtnDiv.classList.add("listItemSortBtnDiv");

    // new item button
    newItemBtn.classList.add("main-button");
    newItemBtn.innerText = "New Task";
    newItemBtn.addEventListener("click", () => {
        const currentListId = listManager.getCurrentListId();
        listManager.addListItem(createListItem(), currentListId);
        displayList(currentListId);
    });
    listItemBtnDivContainer.append(newItemBtn);

    // sort by date button
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

    // sort by priority button
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

    // sort by is completed button
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

    // loop through list to dynamically generate title and id fields, or no tasks message
    for (let i = 0; i < lists.length; i++) {
        if (lists.length === 0) {
            console.log("no lists");
            return;
        }
        if (lists[i].listId === id) {
            displayTitle = `Project Name: ${lists[i].listTitle}`;
            displayListId = `ID # ${lists[i].listId}`
            listTitleH1.innerText = displayTitle;
            listIdH1.innerText = displayListId;
            if (lists[i].listItems.length > 0) {
                displayListItems(id);
            } else {

                noTasksMessage.classList.add("itemContainerNoTasks");
                noTasksMessage.innerText = "There are currently no tasks in this project.";
                listItemsContainer.append(noTasksMessage);
            }
        }
    }
}

// logic for sorting items ascending
const sortItemsAsc = (text) => {
    const currentListId = listManager.getCurrentListId();
    let sortedItems = listManager.getAllListItems(currentListId);
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

// logic for sorting items descending
const sortItemsDesc = (text) => {
    const currentListId = listManager.getCurrentListId();
    let sortedItems = listManager.getAllListItems(currentListId);
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