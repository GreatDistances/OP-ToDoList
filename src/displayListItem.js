import { deleteItem } from "./addItem.js";

const listItemsContainer = document.querySelector("#listItemsContainer");

const displayListItems = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i].itemTitle);

        // parent of itemIsCompletedCheckBoxDiv and itemSubContainer
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("itemContainer");

        // child of itemContainer, sibling of itemSubSubContainer
        const itemIsCompletedCheckBoxDiv = document.createElement("div");
        itemIsCompletedCheckBoxDiv.classList.add("itemIsCompletedCheckBoxDiv");
        itemContainer.append(itemIsCompletedCheckBoxDiv);

        // child of itemContainer, parent of itemSubSubContainer and itemNotesContainer
        const itemSubContainer = document.createElement("div");
        itemSubContainer.classList.add("itemSubContainer");
        itemContainer.append(itemSubContainer);

        // child of itemContainer, sibling of itemNotesContainer
        const itemSubSubContainer = document.createElement("div");
        itemSubSubContainer.classList.add("itemSubSubContainer");
        itemSubContainer.append(itemSubSubContainer);

        // child of itemContainer, sibling of itemSubSubContainer
        const itemNotesContainer = document.createElement("div");
        itemNotesContainer.classList.add("itemNotesContainer");
        itemSubContainer.append(itemNotesContainer);

        const createTextField = (text, container) => {
            const value = arr[i][text];
            const cell = document.createElement("div");
            cell.innerText = value ? value : cell.placeholder = text.slice(4);
            container.append(cell);
            cell.contentEditable="true";
            cell.onblur = () => {
                arr[i][text] = cell.innerText;
            }
            cell.addEventListener("keypress", function(e) {
                if (e.key === "Enter") {
                    arr[i][text] = cell.innerText;
                    cell.blur();
                }
            });
            container.append(cell);
        }
        
        const createDateField = (text, container) => {
            const value = arr[i][text];
            const cell = document.createElement("INPUT");
            cell.setAttribute("type", "date");
            cell.innerText = value;
            container.append(cell);
        }

        const createSelectField = (text, container) => {
            const value = arr[i][text];
            const cell = document.createElement("select");

            const optArr = ["", "!", "!!", "!!!"];
            for (let i = 0; i < optArr.length; i++) {
                const opt = document.createElement("option");
                opt.value = optArr[i];
                opt.text = optArr[i];
                cell.appendChild(opt);
            }
            cell.value = value;
            cell.onblur = () => {
                arr[i][text] = cell.value;
            }
            container.append(cell);
        }

        listItemsContainer.append(itemContainer);

        const itemIsCompletedCheckbox = document.createElement("INPUT");
        itemIsCompletedCheckbox.setAttribute("type", "checkbox");
        itemIsCompletedCheckbox.checked = arr[i].itemIsCompleted;
        itemIsCompletedCheckbox.addEventListener("click", () => {
            arr[i].itemIsCompleted = !arr[i].itemIsCompleted;
        })
        itemIsCompletedCheckBoxDiv.append(itemIsCompletedCheckbox);

/*         const itemTextFields = ["itemTitle", "itemDescription", "itemPriority"];
        for (let field of itemTextFields) {
            createTextField(field, itemSubSubContainer);
        } */
        createTextField("itemTitle", itemSubSubContainer);
        createTextField("itemDescription", itemSubSubContainer);
        createDateField("itemDate", itemSubSubContainer);
        createSelectField("itemPriority", itemSubSubContainer);
        createTextField("itemNotes", itemNotesContainer);




        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", () => {
            deleteItem(arr[i].itemId);
        })
    }
}

export default displayListItems;