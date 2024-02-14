import {lists} from './index.js';

let currentList = -1;

const sendMsg = (msg) => {
    console.log(msg);
}

function setCurrentList(num) {
    currentList = num;
}

function displayAllLists() {
    const listsDisplay =
        lists.map(item => ({ listId: item.listId, listTitle: item.listTitle, listItems: item.listItems}));
    console.log(listsDisplay);
    setCurrentList(-1);
}

const displayList = (id) => {
    const index = lists.findIndex(list => list.listId === id);
    index !== -1 ? (console.log(lists[index]), setCurrentList(index)) : console.log("index not found");
}

const addNewList = (list) => {
    lists.push(list)
    displayAllLists();
}

const deleteList = (id) => {
    const index = lists.findIndex(list => list.listId === id);
    index !== -1 ? lists.splice(index, 1) : sendMsg("list index not found for delete");
    displayAllLists();
}

const renameList = (id, newListTitle) => {
    const index = lists.findIndex(list => list.listId === id);
    index !== -1 ? lists[index].listTitle = newListTitle : sendMsg("list index not found for rename");
    displayAllLists();
}

export {displayAllLists, displayList, addNewList, deleteList, renameList, currentList};