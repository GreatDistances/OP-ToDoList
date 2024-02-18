export default class ListItem {
    static newItemId = 100000;

    constructor(itemTitle, itemDescription, itemPriority, itemDueDate, itemNotes) {
        this.itemId = `I${++ListItem.newItemId}`; // adds I prefix to each item
        this.itemTitle = itemTitle;
        this.itemDescription = itemDescription;
        this.itemPriority = itemPriority;
        this.itemDueDate = itemDueDate;
        this.itemNotes = itemNotes;
    }
}