import {lists} from './index.js';
import {displayList} from './modifyList.js';
import { currentListIndex } from './modifyList.js';

const sendMsg = (msg) => {
    console.log(msg);
}

const checkIfListIndexExists = () => {
    if (currentListIndex === -1) {
        return false;
    }
}

const findItemIndexInList = (id) => {
    const index = lists[currentListIndex].listItems.findIndex(item => item.itemId === id);
    return index;
}

const deleteItem = (id) => {
    const key = "delete"
    // check if currentList exists.  If not, return.
    if (!checkIfListIndexExists) {
        sendMsg(`List not found for ${key} of item ${id}`);
        return;
    }
    // iterate through listItems in currentList to find matching itemId and reference by index.
    const index = findItemIndexInList(id);
    // if item index does not exist in array of objects, send message and return.
    if (index === -1) {
        sendMsg(`Item ID# ${id} not found for ${key}.`)
        return;
    }
    // else if item index does exist, delete item, send message.
    lists[currentListIndex].listItems.splice(index, 1);
    sendMsg(`Item ID# ${id} successful ${key}`);
}

const setItemTitle = (id, newData) => {
    const key = "title";
    // check if currentList exists.  If not, return.
    if (!checkIfListIndexExists) {
        sendMsg(`List not found for ${key} edit of item ${id}`);
        return;
    }
    // iterate through listItems in currentList to find matching itemId and reference by index.
    const index = findItemIndexInList(id);
    // if item index does not exist in array of objects, send message and return.
    if (index === -1) {
        sendMsg(`Item ID# ${id} not found for ${key} edit.`)
        return;
    }
    // 
    if (newData === undefined || newData.length < 1) {
        sendMsg(`Item ID# ${id} title not changed: title is required.`)
        return;
    }
    // else if item index does exist, delete item, send message.
    lists[currentListIndex].listItems[index].itemTitle = newData;
    sendMsg(`Item ID# ${id} title changed to "${newData}"`);
}

const setItemDescription = (id, newData = "") => {
    const key = "description";
    // check if currentList exists.  If not, return.
    if (!checkIfListIndexExists) {
        sendMsg(`List not found for ${key} edit of item ${id}`);
        return;
    }
    // iterate through listItems in currentList to find matching itemId and reference by index.
    const index = findItemIndexInList(id);
    // if item index does not exist in array of objects, send message and return.
    if (index === -1) {
        sendMsg(`Item ID# ${id} not found for ${key} edit.`)
        return;
    }
    // else if item index does exist, delete item, send message.
    lists[currentListIndex].listItems[index].description = newData;
    sendMsg(`Item ID# ${id} ${key} changed to "${newData}"`);
}

const setItemPriority = (id, newData = "0") => {
    const key = "priority";
    const regexp = /^[0-3]$/
    // check if currentList exists.  If not, return.
    if (!checkIfListIndexExists) {
        sendMsg(`List not found for ${key} edit of item ${id}`);
        return;
    }
    // iterate through listItems in currentList to find matching itemId and reference by index.
    const index = findItemIndexInList(id);
    // if item index does not exist in array of objects, send message and return.
    if (index === -1) {
        sendMsg(`Item ID# ${id} not found for ${key} edit.`)
        return;
    }
    if (!regexp.test(newData)) {
        sendMsg(`Item ID# ${id} ${key} not changed, enter a value of 0, 1, 2, or 3`);
        return;
    }
    let urgency = "";
    for (let i = 0; i < parseInt(newData); i++) {
        urgency += "!"
    }
    // else if item index does exist, delete item, send message.
    lists[currentListIndex].listItems[index].priority = urgency;
    sendMsg(`Item ID# ${id} ${key} changed to "${urgency}"`);
}

const setItemNotes = (id, newData = "") => {
    const key = "description";
    // check if currentList exists.  If not, return.
    if (!checkIfListIndexExists) {
        sendMsg(`List not found for ${key} edit of item ${id}`);
        return;
    }
    // iterate through listItems in currentList to find matching itemId and reference by index.
    const index = findItemIndexInList(id);
    // if item index does not exist in array of objects, send message and return.
    if (index === -1) {
        sendMsg(`Item ID# ${id} not found for ${key} edit.`)
        return;
    }
    // else if item index does exist, delete item, send message.
    lists[currentListIndex].listItems[index].notes = newData;
    sendMsg(`Item ID# ${id} ${key} changed to "${newData}"`);
}

const makeDate = (year, month, day) => {
    const d = new Date(year, month, day);
    const date = d.toLocaleDateString("en-CA");
    return date;
}

const setItemDueDate = (id, year, month, day = "") => {
    const key = "date";
    // get today's date for comparison later
    const d = new Date();
    let today = d.toLocaleDateString("en-CA");

    const dateEntry = makeDate(year, month -1, day);

    // check if currentList exists.  If not, return.
    if (!checkIfListIndexExists) {
        sendMsg(`List not found for ${key} edit of item ${id}`);
        return;
    }
    // iterate through listItems in currentList to find matching itemId and reference by index.
    const index = findItemIndexInList(id);
    // if item index does not exist in array of objects, send message and return.
    if (index === -1) {
        sendMsg(`Item ID# ${id} not found for ${key} edit.`)
        return;
    }
    if (dateEntry === "Invalid Date") {
        sendMsg(`Invalid ${key} entry, please try again.`);
        return;
    }
    if (dateEntry < today) {
        sendMsg(`Entry of ${dateEntry} ${key} is before today's date of ${today}.`);
    }
    // else if item index does exist, delete item, send message.
    lists[currentListIndex].listItems[index].dueDate = dateEntry;
    sendMsg(`Item ID# ${id} ${key} changed to "${dateEntry}"`);
}

export {deleteItem, setItemTitle, setItemDescription, setItemPriority, setItemNotes, setItemDueDate};