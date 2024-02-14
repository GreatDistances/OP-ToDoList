import List from './list.js';
import {addNewListItem} from './modifyListItem.js';
import {displayAllLists, displayList, addNewList, deleteList, renameList, currentList} from './modifyList.js';

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

const newList = List.createNewList("Test List C");
addNewList(newList);

// NEED TO REPLACE "newList" WITH REFERENCE TO CORRECT LIST FOR A GIVEN ITEM
const newItem = newList.createListItem("Do the dishes", "Wash and dry dishes before party", 1, "2024/03/01", "don't forget!");
console.log(newItem);
addNewListItem(newList, newItem);

displayList("L10001");
console.log(currentList);
displayList("L98");
console.log(currentList);

deleteList("L99");
deleteList("1");
console.log(currentList);

renameList("L01", "John");
renameList("L98", "Pork Soda");

export {lists}

