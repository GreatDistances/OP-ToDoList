import {lists} from './lists.js';
import {displayList} from './displayList.js';
import {deleteList} from './lists.js'

const listContainer = document.querySelector("#listContainer");

const displayAllLists = () => {
    listContainer.replaceChildren(); // clears prior view of existing lists
    // const listsDisplay =
    //    lists.map(item => ({ listId: item.listId, listTitle: item.listTitle, listItems: item.listItems}));
    //console.log(listsDisplay);

    for (let i = 0; i < lists.length; i++) {
        let thisList = document.createElement("div");
        listContainer.append(thisList);
        thisList.classList.add("thisList");

            let viewListBtn = document.createElement("button");
            viewListBtn.innerText = "View";
            viewListBtn.classList.add("normal-button");
            viewListBtn.addEventListener("click", () => {
                displayList(lists[i].listId);
            })
            thisList.append(viewListBtn);

            let td1 = document.createElement("div");
            td1.textContent = lists[i].listTitle;
            td1.contentEditable="true";
            td1.onblur = () => {
                lists[i].listTitle = td2.innerText;
            }
            td1.addEventListener("keypress", function(e) {
                if (e.key === "Enter") {
                    lists[i].listTitle = td2.innerText;
                    td2.blur();
                }
            });

            let td2 = document.createElement("div");
            td2.textContent = lists[i].listId;

            let deleteListBtn = document.createElement("button");
            deleteListBtn.addEventListener("click", function() {
                deleteList(lists[i].listId)
            });
            deleteListBtn.classList.add("deleteBtn")
            deleteListBtn.innerText = "X";

            thisList.append(td1, td2, deleteListBtn);
    }
}

export default displayAllLists;