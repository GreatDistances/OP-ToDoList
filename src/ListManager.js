import List from "./list.js";
import ListItem from "./ListItem.js";
import displayAllLists from "./displayAllLists.js";
import { displayList } from "./displayList.js";

class ListManager {
  constructor() {
    this.listRepository = [
      new List("Demo List Personal", [
        new ListItem(
          "File 2023 personal taxes",
          "Complete and file federal taxes for 2023 tax year",
          "2024-04-15",
          "!!",
          "Download and reconcile all statements",
          false
        ),
        new ListItem(
          "Pick up Amazon packages",
          "Location: Amazon locker on Main St",
          "2024-02-21",
          "!",
          "New running shoes & phone charging cable",
          true
        ),
        new ListItem(
          "Shred old tax files",
          "All files > 7 years old",
          "2025-01-01",
          "",
          "",
          false
        ),
        new ListItem(
          "Oil change for SUV",
          "Between 3000-5000 miles",
          "2024-03-01",
          "!!",
          "",
          true
        ),
      ]),
    ];
    this.currentListId = -1;
  }
    getAllLists() {
      return this.listRepository;
    }

    // TODO to prevent programs on program load:  setCurrentListId(-1);
    setCurrentListId(num) {
      this.currentListId = num;
      return this.currentListId;
    };

    getCurrentListId() {
      return this.currentListId;
    };

    getCurrentListIndex() {
      const listId = this.getCurrentListId();
      if (listId === -1) {
        return;
      }
      const index = this.listRepository.map((e) => e.listId).indexOf(listId);
      return index;
    };

    addNewList(listObj) {
      this.listRepository.push(listObj);
      displayAllLists();
      this.setCurrentListId(((this.listRepository).length - 1).listId);
      displayList(this.getCurrentListId());
    };

    deleteList(id) {
      const index = this.listRepository.findIndex(list => list.listId === id);
     index !== -1
        ? (this.listRepository.splice(index, 1),
          console.log(`List ID# ${id} deleted`))
        : console.log(`List ID # ${id} not found for delete`);
      displayAllLists();
      if (this.listRepository.length === 0) {
        displayList(-1);
      } else {
        displayList(this.setCurrentListId(this.listRepository[0].listId));
      }
    }

    addItem(Item) {
      if (this.getCurrentListId() === -1) {
          return;
      }
      for (let i = 0; i < this.listRepository.length; i++) {
          if (this.listRepository[i].listId === this.getCurrentListId()) {
              this.listRepository[i].listItems.push(Item);
          }
      }
  }
  
  deleteItem(id) {
      const index = this.getListItemIndex(id);
      const listIndex = this.getCurrentListIndex();
      index !== -1 ?
          (this.listRepository[listIndex].listItems.splice(index, 1), console.log(`Item ID# ${id} deleted`)) : 
              (console.log(`Item ID # ${id} not found for delete`));
              displayList(this.listRepository[listIndex].listId)
  }

  getListTitle(listId) {
    if (listId === -1) {
      return;
    }
    const index = this.listRepository.map((e) => e.listId).indexOf(listId);
    const title = this.listRepository[index].listTitle;
    return title;
  };

    setListTitle(listId, newTitle) {
      const index = this.listRepository.map((e) => e.listId).indexOf(listId);
      if (index === -1) {
        return;
      }
      if (this.listRepository[index].listTitle === newTitle) {
        console.log("New entered title same as prior, no changes");
        return;
      }
      this.listRepository[index].listTitle = newTitle;
      console.log(`List ID# ${listId} listTitle updated to ${newTitle}`);
      console.log(this.listRepository);
    };

    // TODO:  getters and setters for all listItem fields, and related code in DOM manipulation files.


    getListItemIndex(currentItemId) {
      const listIndex = this.getCurrentListIndex();
      if (listIndex === -1) {
        return -1;
      }
      const list = this.listRepository[listIndex];
      if (!list.listItems) {
        return -1;
      }
      const itemIndex = list.listItems.findIndex(
        (item) => item.itemId === currentItemId
      );
      return itemIndex;
    };
  
}

export default ListManager;
