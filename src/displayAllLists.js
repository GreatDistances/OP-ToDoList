import { listManager } from './index.js';
import {displayList} from './displayList.js';

const listContainer = document.querySelector("#listContainer");

const displayAllLists = () => {
    listContainer.replaceChildren(); // clears prior view of existing lists

    const lists = listManager.getAllLists();

    for (let i = 0; i < lists.length; i++) {

        const thisListId = lists[i].listId;

        const thisList = document.createElement("div");
        listContainer.append(thisList);
        thisList.classList.add("thisList");

            const viewListBtn = document.createElement("button");
            viewListBtn.innerText = "View";
            viewListBtn.classList.add("normal-button");
            viewListBtn.addEventListener("click", () => {
                displayList(thisListId);
            })
            thisList.append(viewListBtn);

            const listTitleField = document.createElement("input");
            listTitleField.value = lists[i].listTitle;
            listTitleField.classList.add("fields");
            listTitleField.setAttribute('data-list-title-id', thisListId);

            const listIdField = document.createElement("div");
            listIdField.innerText = lists[i].listId;
            listIdField.classList.add("listIdField");
            listIdField.setAttribute('data-list-title-id', thisListId);
    
            listTitleField.addEventListener("keydown", function(e) {
                if (e.key === "Enter") {
                    listTitleField.blur();
                    e.preventDefault();
                }
            });
    
            listTitleField.addEventListener("blur", function() {
                listManager.setListTitle(thisListId, listTitleField.value);
                displayList(thisListId);
            });

            const deleteListBtnDiv = document.createElement("div");
            deleteListBtnDiv.classList.add("deleteBtnDiv");
            const deleteListBtn = document.createElement("button");
            deleteListBtn.addEventListener("click", function() {
                listManager.deleteList(thisListId)
            });
            deleteListBtn.classList.add("deleteBtn")
            deleteListBtn.innerText = "X";
            deleteListBtnDiv.append(deleteListBtn);

            thisList.append(listTitleField, listIdField, deleteListBtnDiv);
    }
}

export default displayAllLists;