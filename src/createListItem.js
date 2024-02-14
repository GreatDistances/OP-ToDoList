import ListItem from "./listItem.js";
//import {currentList} from "./modifyList.js";

const createListItem = (itemTitle, description, priority, dueDate, notes) => {
    return new ListItem(itemTitle, description, priority, dueDate, notes);
}

export {createListItem};