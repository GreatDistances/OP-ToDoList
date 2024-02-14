import {lists} from './index.js';

let currentListIndex = -1;

const sendMsg = (msg) => {
    console.log(msg);
}

function setCurrentListIndex(num) {
    currentListIndex = num;
}

function displayAllLists() {
    const listsDisplay =
        lists.map(item => ({ listId: item.listId, listTitle: item.listTitle, listItems: item.listItems}));
    console.log(listsDisplay);
    setCurrentListIndex(-1);
}

const displayList = (id) => {
    const index = lists.findIndex(list => list.listId === id);
    index !== -1 ? (setCurrentListIndex(index), sendMsg(`Displaying list ID # ${id}`)) : sendMsg(`List ID # ${id} not found for display`);
}

const addNewList = (list) => {
    lists.push(list)
    displayAllLists();
}

const deleteList = (id) => {
    const index = lists.findIndex(list => list.listId === id);
    index !== -1 ? (lists.splice(index, 1), sendMsg(`List ID# ${id} deleted`)) : sendMsg(`List ID # ${id} not found for delete`);
    displayAllLists();
}

const renameList = (id, newListTitle) => {
    const index = lists.findIndex(list => list.listId === id);
    index !== -1 ? (lists[index].listTitle = newListTitle, sendMsg(`List ID# ${id} renamed "${newListTitle}"`)) : sendMsg(`List ID# ${id} not found for rename`);
    displayAllLists();
}

export {displayAllLists, displayList, addNewList, deleteList, renameList, currentListIndex};