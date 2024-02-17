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
        let tr = document.createElement("tr");
        listContainer.append(tr);

            let viewListBtn = document.createElement("button");
            viewListBtn.innerText = "View";
            viewListBtn.addEventListener("click", () => {
                displayList(lists[i].listId);
            })
            tr.append(viewListBtn);

            let td1 = document.createElement("td");
            td1.textContent = lists[i].listId;

            let td2 = document.createElement("td");
            td2.textContent = lists[i].listTitle;
            td2.contentEditable="true";
            td2.onblur = () => {
                lists[i].listTitle = td2.innerText;
            }
            td2.addEventListener("keypress", function(e) {
                if (e.key === "Enter") {
                    lists[i].listTitle = td2.innerText;
                    td2.blur();
                }
            });

            let deleteListBtn = document.createElement("button");
            deleteListBtn.addEventListener("click", function() {
                deleteList(lists[i].listId)
            });
            deleteListBtn.innerText = "Delete";

            tr.append(td1, td2, deleteListBtn);
    }
}

export default displayAllLists;