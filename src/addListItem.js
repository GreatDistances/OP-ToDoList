import {lists} from './index.js';

const sendMsg = (msg) => {
    console.log(msg);
}

const addListItem = (currentListIndex, listItem) => {
    if (currentListIndex === -1) {
        return;
    }
    for (let i = 0; i < lists.length; i++) {
        if (i === currentListIndex) {
            lists[i].listItems.push(listItem);
            sendMsg(`New item added to list`)
        }
    }
}

export {addListItem}