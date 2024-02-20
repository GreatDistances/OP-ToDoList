import { listManager } from './index.js';
import {displayList} from './displayList.js';

const listContainer = document.querySelector("#listContainer");

const displayAllLists = () => {
    listContainer.replaceChildren(); // clears prior view of existing lists

    const lists = listManager.getAllLists();

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

            let listTitleField = document.createElement("div");
            listTitleField.innerText = lists[i].listTitle;
            console.log(lists);
            // td1.textContent = lists[i].listTitle; // TODO: editing to getListTitle call
            
            listTitleField.contentEditable="true";
            listTitleField.onblur = () => {
                // lists[i].listTitle = td2.innerText; // TODO: editing to setListTitle() call
                listManager.setListTitle(listTitleField.innerText);
            }
            listTitleField.addEventListener("keypress", function(e) {
                if (e.key === "Enter") {
                    // lists[i].listTitle = td2.innerText; // TODO: editing to setListTitle() call
                    listManager.setListTitle(listTitleField.innerText);
                    listTitleField.blur();
                }
            });

            let deleteListBtn = document.createElement("button");
            deleteListBtn.addEventListener("click", function() {
                listManager.deleteList(lists[i].listId)
            });
            deleteListBtn.classList.add("deleteBtn")
            deleteListBtn.innerText = "X";

            thisList.append(listTitleField, deleteListBtn);
    }
}

export default displayAllLists;