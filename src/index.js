import List from './list.js';
import {addListItem} from './addListItem.js';
import {createListItem} from './createListItem.js';
import {displayAllLists, displayList, addNewList, deleteList, renameList, currentListIndex} from './modifyList.js';
import {deleteItem, setItemTitle, setItemDescription, setItemPriority, setItemNotes, setItemDueDate} from "./modifyItem.js";

let lists = [
    {
        listId: "L98",
        listTitle: "Test List A",
        listItems: [
            {
                "itemId": "I1",
                "itemTitle": "Item title for I1"
        },
        {
            "itemId": "I2",
            "itemTitle": "Item title for I2"
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

displayAllLists();

addNewList(List.createNewList("Test List C"));
addNewList(List.createNewList("Test List D"));

displayList("L10001");
console.log(currentListIndex);

addListItem(currentListIndex, createListItem("Do the dishes", "Wash and dry dishes before party", 1, "2024/03/01", "don't forget!"));
addListItem(currentListIndex, createListItem("2nd sample add", "asdf", 2, "2024/04/02", "no notes"));
addListItem(currentListIndex, createListItem("2nd sample add", "asdf", 2, "2024/04/02", "no notes"));

displayList("L98");
console.log(currentListIndex);

deleteList("L99");
deleteList("A");  // should return error message in console
console.log(currentListIndex);

renameList("X01", "John"); // should return error message in console
renameList("L98", "Pork Soda");

displayList("L10001");
deleteItem("234")  // should return error message in console
deleteItem("I100002");

setItemTitle("I100001", "New edited title"); // should return error message in console
setItemTitle("I100002", "New edited title"); // should return error message in console
setItemTitle("I100003"); // title will not change
setItemTitle("I100003", ""); // title will not change
setItemTitle("I100003", "Another new edited title"); // should return error message in console

setItemDescription("I100003")
setItemDescription("I100003", "new item description");

setItemNotes("Iasdf")
setItemNotes("I100002")
setItemDescription("I100003");
setItemDescription("I100003");

setItemNotes("Iasdf")
setItemNotes("I100002")
setItemNotes("I100003", "updated note");

setItemPriority("Iasdf")
setItemPriority("I100002", 2)
setItemPriority("I100003", "A");
setItemPriority("I100003", 0);
setItemPriority("I100003", 1);
setItemPriority("I100003", 2);
setItemPriority("I100003", 3);
setItemPriority("I100003", 2.0);
setItemPriority("I100003", 3.01);
setItemPriority("I100003", 3.000);
setItemPriority("I100003", 4);

setItemDueDate("asdfadsf")
setItemDueDate("I100002", 2)
setItemDueDate("I100003", "A");
setItemDueDate("I100003", 3.0);
setItemDueDate("I100003", 4);
setItemDueDate("I100003", 20240101);
setItemDueDate("I100003", 2025, "12", 13);
setItemDueDate("I100003", "2022", "1", "1");
setItemDueDate("I100003", 2024, 5, 2);
setItemDueDate("I100003", "-");

displayAllLists();

export {lists};

