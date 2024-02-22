export default class ListItem {
    static newItemId = localStorage.getItem("newItemId") || 100000;

    constructor(itemTitle = "", itemDescription = "", itemPriority = "", itemDueDate = "", itemNotes = "", itemIsCompleted = false) {
        this.itemId = `I${++ListItem.newItemId}`; // adds I prefix to each item
        this.itemTitle = itemTitle;
        this.itemDescription = itemDescription;
        this.itemPriority = itemPriority;``
        this.itemDueDate = itemDueDate;
        this.itemNotes = itemNotes;
        this.itemIsCompleted = itemIsCompleted;
    }
}