export default class ListItem {
    static newItemId = 100000;

    constructor(itemTitle, description, priority, dueDate, notes) {
        this.itemId = `I${++ListItem.newItemId}`; // adds I prefix to each item
        this.itemTitle = itemTitle;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.notes = notes;
    }
}