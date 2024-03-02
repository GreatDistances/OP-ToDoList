import List from "./list.js";
import ListItem from "./ListItem.js";
import displaySideBarLists from "./displaySideBarLists.js";
import { displayList } from "./displayList.js";
import { focusListTitle } from "./focus.js";

class ListManager {
  constructor() {
    this.listRepository = [
      new List("Unassigned Tasks", []),
      new List("Demo List Personal", [
        new ListItem(
          "File 2023 personal taxes",
          "Complete and file federal taxes for 2023 tax year",
          "!!",
          "2024-04-15",
          "Download and reconcile all statements",
          false
        ),
        new ListItem(
          "Pick up Amazon packages",
          "Location: Amazon locker on Main St",
          "!",
          "2024-02-21",
          "New running shoes & phone charging cable",
          true
        ),
        new ListItem(
          "Shred old tax files",
          "All files > 7 years old",
          "",
          "2025-01-01",
          "",
          false
        ),
        new ListItem(
          "Oil change for SUV",
          "Between 3000-5000 miles",
          "!!",
          "2024-03-01",
          "",
          true
        ),
      ]),
    ];
    this.currentListId = 0;
  }

  saveToLocalStorage() {
    const listManagerStringified = JSON.stringify(this);
    localStorage.setItem("ListManager", listManagerStringified);
  }

  loadFromLocalStorage() {
    const listManagerFromStorage = localStorage.getItem("ListManager");
    const listManagerData = JSON.parse(listManagerFromStorage);
    this.listManager = new ListManager();
    Object.assign(this.listManager, listManagerData);
    console.log("ListManager loaded from localStorage:", this.listManager);
  }

  getAllLists() {
    return this.listRepository;
  }

  getAllListIds() {
    return this.listRepository.map((element) => element.listId);
  }

  getAllListTitles() {
    return this.listRepository.map((element) => element.listTitle);
  }

  // TODO to prevent programs on program load:  setCurrentListId(-1);
  setCurrentListId(num) {
    this.currentListId = num;
    this.saveToLocalStorage();
    return this.currentListId;
  }

  getCurrentListId() {
    return this.currentListId;
  }

  getCurrentListIndex() {
    const listId = this.getCurrentListId();
    if (listId === -1) {
      console.log(`No current list index found`);
      return -1;
    }
    const index = this.listRepository.map((e) => e.listId).indexOf(listId);
    return index;
  }

  findListIndex(listId) {
    const index = this.listRepository.map((e) => e.listId).indexOf(listId);
    if (index === -1) {
      console.log(`List ID# ${listId} not found, no list index available`);
    }
    return index;
  }

  addNewList(listObj) {
    this.listRepository.unshift(listObj); // add new listObj to front of array
    displaySideBarLists(); // re-render sidebar lists after new list is added
    this.setCurrentListId(listObj.listId); // set currentListId to the new list's id
    this.saveToLocalStorage();
    displayList(this.getCurrentListId()); // display the new list as current list
    focusListTitle(listObj.listId); // focus the new list's title input
    localStorage.setItem("newListId", List.newListId); // update localStorage with incremented newListId
  }

  deleteList(id) {
    if (id === "L10000") {
      console.log("Unassigned Tasks list cannot be deleted by user.");
      return;
    }
    const index = this.findListIndex(id);
    if (index === -1) {
      console.log(`List ID # ${id} not found for delete`);
      return;
    } else {
      this.listRepository.splice(index, 1);
      console.log(`List ID# ${id} deleted`)
      displaySideBarLists(); // re-render sidebar lists after list is deleted;
    }
    this.saveToLocalStorage();
  }

  addListItem(itemObj, listId) {
    for (let i = 0; i < this.listRepository.length; i++) {
      if (this.listRepository[i].listId === listId) {
        this.listRepository[i].listItems.unshift(itemObj);
      }
    }
    localStorage.setItem("newItemId", ListItem.newItemId);
    this.saveToLocalStorage();
  }

  deleteItem(itemId, listId) {
    const itemIndex = this.getListItemIndex(itemId);
    const listIndex = this.findListIndex(listId);
    itemIndex !== -1
      ? (this.listRepository[listIndex].listItems.splice(itemIndex, 1),
        console.log(`Item ID# ${itemId} deleted`))
      : console.log(`Item ID # ${itemId} not found for delete`);
    this.saveToLocalStorage();
  }

  getListTitle(listId) {
    const index = this.findListIndex(listId);
    const title = this.listRepository[index].listTitle;
    return title;
  }

  setListTitle(listId, newTitle) {
    const index = this.findListIndex(listId);
    if (index === -1) {
      return;
    }
    if (this.listRepository[index].listTitle === newTitle) {
      // if no change in title, return
      return;
    }
    this.listRepository[index].listTitle = newTitle;
    console.log(`List ID# ${listId} listTitle updated to ${newTitle}`);
    displaySideBarLists();
    this.saveToLocalStorage();
  }

  getListItemIndex(currentItemId) {
    const listIndex = this.getCurrentListIndex();
    if (listIndex === -1) {
      return -1;
    }
    const list = this.listRepository[listIndex].listItems;
    if (!list) {
      return -1;
    }
    const itemIndex = list.findIndex((item) => item.itemId === currentItemId);
    return itemIndex;
  }

  // this getter adds a listId property to each listItem, for use in "All Tasks" view
  getAllListItemsAllLists() {
    let allListItems = [];
    this.listRepository.forEach(list => {
        list.listItems.forEach(item => {
            // Add listId property to each item
            const listItemWithListId = { ...item, listId: list.listId }; // destructure object, add new listId property
            allListItems.push(listItemWithListId); // push new objects into allListItems array
        });
    });
    return allListItems;
}

  getAllListItems(listId) {
    const index = this.findListIndex(listId);
    const listItemsArr = this.listRepository[index].listItems;
    if (listItemsArr.length < 1) {
      return -1;
    }
    return listItemsArr;
  }

  getListItem(listId, itemId) {
    const allListItems = this.getAllListItems(listId);
    const listItem = allListItems.find((element) => element.itemId === itemId);
    return(listItem);
  }

  setItemTitle(itemId, newTitle) {
    const listIndex = this.getCurrentListIndex();
    const itemIndex = this.getListItemIndex(itemId);
    if (listIndex !== -1 && itemIndex !== -1) {
      this.listRepository[listIndex].listItems[itemIndex].itemTitle = newTitle;
    }
    this.saveToLocalStorage();
  }

  setItemDescription(itemId, newDescription) {
    const listIndex = this.getCurrentListIndex();
    const itemIndex = this.getListItemIndex(itemId);
    if (listIndex !== -1 && itemIndex !== -1) {
      this.listRepository[listIndex].listItems[itemIndex].itemDescription =
        newDescription;
    }
    this.saveToLocalStorage();
  }

  setItemDueDate(itemId, newDueDate) {
    const listIndex = this.getCurrentListIndex();
    const itemIndex = this.getListItemIndex(itemId);
    if (listIndex !== -1 && itemIndex !== -1) {
      this.listRepository[listIndex].listItems[itemIndex].itemDueDate =
        newDueDate;
    }
    this.saveToLocalStorage();
  }

  setItemPriority(itemId, newPriority) {
    const listIndex = this.getCurrentListIndex();
    const itemIndex = this.getListItemIndex(itemId);
    if (listIndex !== -1 && itemIndex !== -1) {
      this.listRepository[listIndex].listItems[itemIndex].itemPriority =
        newPriority;
    }
    this.saveToLocalStorage();
  }

  setItemNotes(itemId, newNotes) {
    const listIndex = this.getCurrentListIndex();
    const itemIndex = this.getListItemIndex(itemId);
    if (listIndex !== -1 && itemIndex !== -1) {
      this.listRepository[listIndex].listItems[itemIndex].itemNotes = newNotes;
    }
    this.saveToLocalStorage();
  }

  setItemIsCompleted(itemId) {
    const listIndex = this.getCurrentListIndex();
    const itemIndex = this.getListItemIndex(itemId);
    if (listIndex !== -1 && itemIndex !== -1) {
      if (this.listRepository[listIndex].listItems[itemIndex].itemIsCompleted === false) {
        this.listRepository[listIndex].listItems[itemIndex].itemIsCompleted = true;
      } else {
        this.listRepository[listIndex].listItems[itemIndex].itemIsCompleted = false;
    }
    this.saveToLocalStorage();
  }
  }

  setItemToDifferentList(itemId, currentListId, newListId) {
    if (currentListId === newListId) {
      return;
    }
    const listItem = this.getListItem(currentListId, itemId);
    this.addListItem(listItem, newListId)
    this.deleteItem(listItem.itemId, currentListId);
    this.saveToLocalStorage();
  }
}

export default ListManager;
