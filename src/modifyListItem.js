import {lists} from './index.js';

const addNewListItem = (list, listItem) => {
    list.listItems.push(listItem);
}

export {addNewListItem}