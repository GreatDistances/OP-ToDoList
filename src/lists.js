import displayAllLists from './displayAllLists.js'
import {displayList} from './displayList.js';

const lists = [];
/*     {
        listId: "L98",
        listTitle: "Test List A",
        listItems: [
            {
                "itemId": "I1",
                "itemTitle": "Item title for I1 asdf",
                "description": "this description",
                "dueDate": "a due date",
                "priority": 3,
                "notes": "some notes here",
        },
        {
            "itemId": "I2",
            "itemTitle": "Item title for I2 wert"
        }
        ]
    },
    {
        listId: "L99",
        listTitle: "Test List B",
        listItems: [
        {
            "itemId": "I3",
            "itemTitle": "Item title for I3"
        },
        {
        "itemId": "I4",
        "itemTitle": "Item title for I4"
    },
        {
        "itemId": "I5",
        "itemTitle": "Item title for I5"
    }]
    }
]; */

let currentListId = -1;

function setCurrentListId(num) {
    currentListId = num;
    return currentListId;
}

function getCurrentListId() {
    return currentListId;
}

function getCurrentListIndex() {
    const listId = getCurrentListId();
    if (listId === -1) {
        return;
    }
    const index = lists.map(e => e.listId).indexOf(listId);
    return index;
}

function getItemIndex(currentItemId) {
    const listIndex = getCurrentListIndex();
    if (listIndex === -1) {
        return -1;
    }
    const list = lists[listIndex];
    if (!list.listItems) {
        return -1;
    }
    const itemIndex = list.listItems.findIndex(item => item.itemId === currentItemId);
    return itemIndex;
}

function getListsLength() {
    return lists.length;
}

const sendMsg = (msg) => {
    console.log(msg);
}

const addNewList = (list) => {
    lists.push(list)
    displayAllLists();
    setCurrentListId((lists[getListsLength() -1].listId));
    displayList(getCurrentListId());
}

const deleteList = (id) => {
    const index = lists.findIndex(list => list.listId === id);
    index !== -1 ? (lists.splice(index, 1), sendMsg(`List ID# ${id} deleted`)) : sendMsg(`List ID # ${id} not found for delete`);
    displayAllLists();
    if (getListsLength() === 0) {
        displayList(-1);
    } else {
        displayList(setCurrentListId(lists[0].listId));
    }
}

export {lists, addNewList, deleteList, setCurrentListId, getCurrentListId, getCurrentListIndex, getItemIndex, getListsLength}