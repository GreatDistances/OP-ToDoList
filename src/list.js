export default class List {
    static newListId = 10000;

    constructor (listTitle, listItems = []) {
        this.listId = `L${++List.newListId}`; // adds L prefix to each list
        this.listTitle = listTitle;
        this.listItems = listItems;
    }

    static createList = (listTitle) => {
        return new List(listTitle);
    }
}