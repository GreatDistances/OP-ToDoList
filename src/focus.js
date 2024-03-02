const focusListTitle = (id) => {
    const listTitleField = document.querySelector(`[data-list-title-id=${id}]`);
    listTitleField.focus();
}

const focusItemTitle = (id) => {
    // console.log(`ID in focusItemTitle: ${id}`)
    const listItemTitleField = document.querySelector(`[data-itemtitle=${id}]`);
    listItemTitleField.focus();
}

export { focusListTitle, focusItemTitle }