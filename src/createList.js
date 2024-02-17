import List from "./list.js";

const createList = (listTitle) => {
    return new List(listTitle);
}

export default createList;