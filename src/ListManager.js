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

    findListIndex(listId) {
      const index = this.listRepository.map((e) => e.listId).indexOf(listId);
      if (index === -1) {
        console.log(`List ID# ${listId} not found, no list index available`);
      }
      return index;
    }

    addNewList(listObj) {
      this.listRepository.push(listObj);
      displayAllLists();
      this.setCurrentListId(this.listRepository[this.listRepository.length -1].listId);
      displayList(this.getCurrentListId());
    };

    deleteList(id) {
      const index = this.findListIndex(id);
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
    const index = this.findListIndex(listId);
    const title = this.listRepository[index].listTitle;
    return title;
  };

    setListTitle(listId, newTitle) {
      const index = this.findListIndex(listId);
      if (index === -1) {
        return;
      }
      if (this.listRepository[index].listTitle === newTitle) { // if no change in title, return
        return;
      }
      this.listRepository[index].listTitle = newTitle;
      console.log(`List ID# ${listId} listTitle updated to ${newTitle}`);
      console.log(this.listRepository);
    };

    getListItemIndex(currentItemId) {
      const listIndex = this.getCurrentListIndex();
      if (listIndex === -1) {
          return -1;
      }
      const list = this.listRepository[listIndex].listItems;
      if (!list) {
          return -1;
      }
      const itemIndex = list.findIndex(
          (item) => item.itemId === currentItemId
      );
      return itemIndex;
  }




    getListItems(listId) {
      const index = this.findListIndex(listId);
      const listItemsArr = this.listRepository[index].listItems;
      if (listItemsArr.length < 1) {
        return -1;
      }
      return listItemsArr;
    };

    setItemTitle(itemId, newTitle) {
      const listIndex = this.getCurrentListIndex(); // TODO - change to reference current view?
      const itemIndex = this.getListItemIndex(itemId);
      if (listIndex !== -1 && itemIndex !== -1) {
        this.listRepository[listIndex].listItems[itemIndex].itemTitle = newTitle;
      }
    }
  
    setItemDescription(itemId, newDescription) {
      const listIndex = this.getCurrentListIndex(); // TODO - change to reference current view?
      const itemIndex = this.getListItemIndex(itemId);
      if (listIndex !== -1 && itemIndex !== -1) {
        this.listRepository[listIndex].listItems[itemIndex].itemDescription = newDescription;
      }
    }
  
    setItemDueDate(itemId, newDueDate) {
      const listIndex = this.getCurrentListIndex(); // TODO - change to reference current view?
      const itemIndex = this.getListItemIndex(itemId);
      if (listIndex !== -1 && itemIndex !== -1) {
        this.listRepository[listIndex].listItems[itemIndex].itemDueDate = newDueDate;
      }
    }
  
    setItemPriority(itemId, newPriority) {
      const listIndex = this.getCurrentListIndex(); // TODO - change to reference current view?
      const itemIndex = this.getListItemIndex(itemId);
      if (listIndex !== -1 && itemIndex !== -1) {
        this.listRepository[listIndex].listItems[itemIndex].itemPriority = newPriority;
      }
    }
  
    setItemNotes(itemId, newNotes) {
      const listIndex = this.getCurrentListIndex(); // TODO - change to reference current view?
      const itemIndex = this.getListItemIndex(itemId);
      if (listIndex !== -1 && itemIndex !== -1) {
        this.listRepository[listIndex].listItems[itemIndex].itemNotes = newNotes;
      }
    }
}

export default ListManager;