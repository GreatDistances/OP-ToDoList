import { listManager } from "./index.js";
import displayListItemsByListId from "./displayListItemsByListId.js";
import { displayListItemFromObj } from "./displayListItemFromObj.js";
import { createListItem } from "./createListItem.js";

const displayAllTasks2 = () => {

    const itemContainerContainer = document.createElement("div");
    itemContainerContainer.classList.add("itemContainerContainer");

    const loopThruItems = () => {
        itemContainerContainer.innerHTML = "";
        if (allListItems.length > 0) {
            allListItems.forEach((item) => displayListItemFromObj(item));
        }
    };

    let sortFlag = "";

    const sortItemsAsc = (property = "itemDueDate", arr = allListItems) => {
        arr.sort((a, b) => {
            if (b[property] > a[property]) {
                return -1;
            } else if (b[property] < a[property]) {
                return 1;
            }
            return 0;
        });
        console.log(arr);
    };
    
    const sortItemsDesc = (property, arr) => {
        arr.sort((a, b) => {
            if (b[property] < a[property]) {
                return -1;
            } else if (b[property] > a[property]) {
                return 1;
            }
            return 0;
        });
        console.log(arr);
    };

    let allListItems = [];
    allListItems = listManager.getAllListItemsAllLists();
    console.log(allListItems);



    const listItemsContainer = document.querySelector("#listItemsContainer");
    listItemsContainer.innerHTML = "";

    console.log(allListItems);

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

    listItemsContainer.append(listTitleContainer, listTitleH1, listIdH1);

    listTitleContainer.append(listTitleH1, listIdH1);
    listTitleContainer.classList.add("listTitleContainer");

    listItemBtnDivContainer.classList.add("listItemBtnDivContainer");

    listItemSortBtnDiv.classList.add("listItemSortBtnDiv");

    // new item button
    const createNewItemBtn = () => {
        newItemBtn.classList.add("main-button");
        newItemBtn.innerText = "New Task";
        newItemBtn.addEventListener("click", () => {
            listManager.addListItem(createListItem(), "L10000");
            loopThruItems();
        });
        listItemBtnDivContainer.append(newItemBtn);
    };

    // sort by date button
    const createSortByDateBtn = () => {
        sortByDateBtn.classList.add("normal-button");
        sortByDateBtn.innerText = "Sort By Date";
        listItemsContainer.append(sortByDateBtn);
        sortByDateBtn.addEventListener("click", () => {
            if (sortFlag === "itemDueDateAsc") {
                sortItemsDesc("itemDueDate", allListItems);
                sortFlag = "itemDueDateDesc";
            } else {
                sortItemsAsc("itemDueDate", allListItems);
                sortFlag = "itemDueDateAsc";
            }
            console.log(sortFlag);
            console.log("sortByDate");
            console.log(allListItems);
            loopThruItems();
        });
        listItemSortBtnDiv.append(sortByDateBtn);
    };

    // sort by priority button
    const createSortByPriorityBtn = () => {
        sortByPriorityBtn.classList.add("normal-button");
        sortByPriorityBtn.innerText = "Sort By Priority";
        listItemsContainer.append(sortByPriorityBtn);
        sortByPriorityBtn.addEventListener("click", () => {
            if (sortFlag !== "itemPriorityDesc") {
                sortFlag = "itemPriorityDesc";
                sortItemsDesc("itemPriority", allListItems);
            } else if (sortFlag === "itemPriorityDesc") {
                sortItemsAsc("itemPriority", allListItems);
                sortFlag = "itemPriorityAsc";
            }
            itemContainerContainer.innerHTML = "";
            loopThruItems();
        });
        listItemSortBtnDiv.append(sortByPriorityBtn);
    };

    // sort by is completed button
    const createSortByItemIsCompletedBtn = () => {
        sortByItemIsCompletedBtn.classList.add("normal-button");
        sortByItemIsCompletedBtn.innerText = "Sort By Completion";
        listItemsContainer.append(sortByItemIsCompletedBtn);
        sortByItemIsCompletedBtn.addEventListener("click", () => {
            if (sortFlag !== "itemIsCompletedAsc") {
                sortFlag = "itemIsCompletedAsc";
                sortItemsAsc("itemIsCompleted", allListItems);
            } else if (sortFlag === "itemIsCompletedAsc") {
                sortItemsDesc("itemIsCompleted", allListItems);
                sortFlag = "itemIsCompletedDesc";
            }
            itemContainerContainer.innerHTML = "";
            loopThruItems();
        });
        listItemSortBtnDiv.append(sortByItemIsCompletedBtn);
    };

    createNewItemBtn();
    createSortByDateBtn();
    createSortByPriorityBtn();
    createSortByItemIsCompletedBtn();
    listItemBtnDivContainer.append(listItemSortBtnDiv);
    listItemsContainer.append(listItemBtnDivContainer);

    // Loop through list to dynamically generate title and id fields, or no tasks message
    if (allListItems.length === 0) {
        noTasksMessage.classList.add("itemContainerNoTasks");
        noTasksMessage.innerText = "There are currently no tasks in this project.";
        listItemsContainer.append(noTasksMessage);
    } else if (allListItems.length > 0) {
        displayTitle = `All Tasks`;
        displayListId = "";
        listTitleH1.innerText = displayTitle;
        listIdH1.innerText = displayListId;
    }
    sortItemsAsc(); // default ascending data sort on component load
    loopThruItems(); // initial load of listItems for display

    // Append itemContainerContainer to listItemsContainer after the loop
    listItemsContainer.append(itemContainerContainer);
};

export { displayAllTasks2 };