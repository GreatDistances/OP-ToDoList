import displayAllLists from './displayAllLists.js'
import {displayList} from './displayList.js';

const lists = [
    {
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
];

let currentListIndex = lists[0].listId;

function setCurrentListIndex(num) {
    currentListIndex = num;
    return currentListIndex;
}

function getCurrentListIndex() {
    return currentListIndex;
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
    setCurrentListIndex((lists[lists.length - 1].listId));
    displayList(getCurrentListIndex());
}

const deleteList = (id) => {
    const index = lists.findIndex(list => list.listId === id);
    index !== -1 ? (lists.splice(index, 1), sendMsg(`List ID# ${id} deleted`)) : sendMsg(`List ID # ${id} not found for delete`);
    displayAllLists();
    if (getListsLength() === 0) {
        displayList(-1);
    } else {
        displayList(setCurrentListIndex(lists[0].listId));
    }
}

export {lists, addNewList, deleteList, setCurrentListIndex, getCurrentListIndex, getListsLength}