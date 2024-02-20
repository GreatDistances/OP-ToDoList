import displayAllLists from "./displayAllLists.js";
import { displayList } from "./displayList.js";

const lists = [
  {
    listId: "L98",
    listTitle: "Demo List Personal",
    listItems: [
      {
        itemId: "I1",
        itemTitle: "File 2023 personal taxes",
        itemDescription: "Complete and file federal taxes for 2023 tax year",
        itemDueDate: "2024-04-15",
        itemPriority: "!!",
        itemNotes: "Download and reconcile all statements",
        itemIsCompleted: false,
      },
      {
        itemId: "I2",
        itemTitle: "Pick up Amazon packages",
        itemDescription: "Location: Amazon locker on Main St",
        itemDueDate: "2024-02-21",
        itemPriority: "!",
        itemNotes: "New running shoes & phone charging cable",
        itemIsCompleted: true,
      },
      {
        itemId: "I3",
        itemTitle: "Shred old tax files",
        itemDescription: "All files > 7 years old",
        itemDueDate: "2025-01-01",
        itemPriority: "",
        itemNotes: "notes here",
        itemIsCompleted: false,
      },
      {
        itemId: "I2A",
        itemTitle: "Oil change for SUV",
        itemDescription: "Between 3000-5000 miles",
        itemDueDate: "2024-03-01",
        itemPriority: "!!",
        itemNotes: "",
        itemIsCompleted: true,
      },
    ],
  },
  {
    listId: "L99",
    listTitle: "Demo List B",
    listItems: [
      {
        itemId: "I3",
        itemTitle: "Item title for I3",
      },
      {
        itemId: "I4",
        itemTitle: "Item title for I4",
      },
      {
        itemId: "I5",
        itemTitle: "Item title for I5",
      },
    ],
  },
];

let currentListId = -1;

const sendMsg = (msg) => {
  console.log(msg);
};

function getLists() {
  return lists;
}

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
  const index = lists.map((e) => e.listId).indexOf(listId);
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
  const itemIndex = list.listItems.findIndex(
    (item) => item.itemId === currentItemId
  );
  return itemIndex;
}

function getListsLength() {
  return lists.length;
}

const addNewList = (list) => {
  lists.push(list);
  displayAllLists();
  setCurrentListId(lists[getListsLength() - 1].listId);
  displayList(getCurrentListId());
};

const deleteList = (id) => {
  const index = lists.findIndex((list) => list.listId === id);
  index !== -1
    ? (lists.splice(index, 1), sendMsg(`List ID# ${id} deleted`))
    : sendMsg(`List ID # ${id} not found for delete`);
  displayAllLists();
  if (getListsLength() === 0) {
    displayList(-1);
  } else {
    displayList(setCurrentListId(lists[0].listId));
  }
};

export {
  lists,
  getLists,
  addNewList,
  deleteList,
  setCurrentListId,
  getCurrentListId,
  getCurrentListIndex,
  getItemIndex,
  getListsLength,
};
