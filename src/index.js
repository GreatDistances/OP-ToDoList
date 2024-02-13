import List from './list.js';
//import modifyListItem from './modifyListItem.js';
//import modifyList from './modifyList.js';

const lists = [
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

function viewAllLists() {
    const listsDisplay =
        lists.map(item => ({ listId: item.listId, listTitle: item.listTitle, listItems: item.listItems}));
    console.log(listsDisplay);
}

viewAllLists();

const testListCreate = List.createNewList("Test List C");
console.log(testListCreate);

const testItemCreate = testListCreate.createListItem("Do the dishes", "Wash and dry dishes before party", 1, "2024/03/01", "don't forget!");
console.log(testItemCreate);

// move this to another module ?
const addNewListItem = (list, listItem) => {
    list.listItems.push(listItem);
}
addNewListItem(testListCreate, testItemCreate);

// move this to another module ?
const addNewList = (list) => {
    lists.push(list)
}
addNewList(testListCreate);

viewAllLists(); // remove this when ready



