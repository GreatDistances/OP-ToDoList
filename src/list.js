import ListItem from './listItem.js';

export default class List {
    static newListId = 10000;

    constructor (listTitle) {
        this.listId = `L${++List.newListId}`; // adds L prefix to each list
        this.listTitle = listTitle;
        this.listItems = [];
    }

    // static method for creating new lists, not necessary on instances of class
    static createNewList(listTitle) {
        return new List(listTitle);
    }

   createListItem(itemTitle, description, priority, dueDate, notes) {
        return new ListItem(this.listId, itemTitle, description, priority, dueDate, notes);
    }
}