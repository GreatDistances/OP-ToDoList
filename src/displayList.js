import {lists, getCurrentListIndex, setCurrentListIndex, getListsLength } from './lists.js';
import displayListItems from './displayListItem.js';

const displayList = (id) => {
    
    listItemsContainer.replaceChildren(); // TODO:  update later to show multiple lists at a time.
    if (!id || id === -1) {
        listItemsContainer.innerText = "No List Selected";
        return;
    }

    setCurrentListIndex(id);
    
    const titleTd = document.createElement("h2");
    let displayTitle;
    const addListItemBtn = document.createElement("button");
    listItemsContainer.append(titleTd);

    addListItemBtn.innerText = "Add new item";
    listItemsContainer.append(addListItemBtn);

    for (let i = 0; i < lists.length; i++) {
        if (getListsLength === 0) {
            console.log("no lists");
            return;
        }
        if (lists[i].listId === id) {
            displayTitle = lists[i].listTitle
            titleTd.innerText = displayTitle;
            if (lists[i].listItems.length > 0) {
                displayListItems(lists[i].listItems);
                console.log(lists[i].listItems);
            } else {
                const noItems = document.createElement("div").innerText = "No List Items";
                listItemsContainer.append(noItems);
            }
        }
    }
}

export {displayList}