
import {lists, getCurrentListId, getListsLength, getCurrentListIndex, getItemIndex } from './lists.js';
import { displayList } from './displayList.js';

const sendMsg = (msg) => {
    console.log(msg);
}

const addItem = (Item) => {
    if (getCurrentListId() === -1) {
        return;
    }
    for (let i = 0; i < getListsLength(); i++) {
        if (lists[i].listId === getCurrentListId()) {
            lists[i].listItems.push(Item);
        }
    }
}

const deleteItem = (id) => {
    const index = getItemIndex(id);
    const listIndex = getCurrentListIndex();
    index !== -1 ?
        (lists[listIndex].listItems.splice(index, 1), sendMsg(`Item ID# ${id} deleted`)) : 
            (sendMsg(`Item ID # ${id} not found for delete`));
            displayList(lists[listIndex].listId)
}

export {addItem, deleteItem};