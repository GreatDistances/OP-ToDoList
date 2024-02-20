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
            
            listTitleField.contentEditable="true";
            let enterKeyPressed = false; // flag to prevent both enter keydown + blur from firing setListTitle on enter keydown
            listTitleField.addEventListener("keydown", function(e) {
                if (e.key === "Enter") {
                    enterKeyPressed = true; // sets enterKeyPressed flag to true so onblur event does not fire setListTitle
                    listManager.setListTitle(lists[i].listId, listTitleField.innerText);
                    listManager.setListTitle(listTitleField.innerText);
                    listTitleField.blur();
                    e.preventDefault()
                }
            });
            listTitleField.onblur = () => {
                if (!enterKeyPressed) { // if enterKeyPressed, do not fire setListTitle
                    listManager.setListTitle(lists[i].listId, listTitleField.innerText);
                }
                enterKeyPressed = false; // reset enterKeyPressed flag
            }

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