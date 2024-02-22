export default class List {
    static newListId = localStorage.getItem("newListId") || 10000;

    constructor (listTitle, listItems = []) {
        this.listId = `L${List.newListId++}`; // adds L prefix to each list and increments newListId
        this.listTitle = listTitle;
        this.listItems = listItems;
    }

    static createList = (listTitle) => {
        return new List(listTitle);
    }
}