let search_btn = document.getElementById('search_btn');
let search_bar = document.getElementById('search_bar');
let add_btn = document.getElementById('add_btn');
let notes_list = document.getElementById('notes_list');
let categories_dropdown = document.getElementById('categories');

let empty_notes_template = `
    <div class="empty-list-err">
        <h1> NOTES LIST EMPTY!! </h1>
    </div>
`

const remove_note = (id) => {
    let notes = JSON.parse(localStorage.getItem('notes'));
    delete notes[id];
    localStorage.setItem('notes', JSON.stringify(notes));
    location.reload();
}

const edit_note = (id) => {
    localStorage.setItem('id_to_be_edited', id);
    location.href = './edit_note.html';
}

const display_notes = (notes) => {
    if(Object.keys(notes).length === 0){
        notes_list.innerHTML = empty_notes_template;
    }
    else{
        notes_list.innerHTML = '';
        for(let [key, value] of Object.entries(notes)){
            let note_template = `
            <div class="note-item">
                <div class="category">
                    <h1> ${value.category} </h1>
                </div>
                <div class="note-header">
                    <h1> ${value.title} </h1>
                    <div class="list-icons">
                        <button onclick="edit_note(${Number(key)})">
                            <img src="./imgs/light_mode/edit.png" alt="edit">
                        </button>
                        <button onclick="remove_note(${Number(key)})">
                            <img src="./imgs/light_mode/delete.png" alt="delete">
                        </button>
                    </div>
                </div>
                <p> ${value.note} </p>
            </div>
            `
            notes_list.innerHTML += note_template;
        }
    }
}

const list_categories = (notes) => {
    const categories_list = document.getElementById('categories');
    categories_list.innerHTML = `
        <option value="All">
            All
        </option>
    `
    for(let key in notes){
        categories_list.innerHTML += `
            <option value="${notes[key].category}">
                ${notes[key].category}
            </option>
        `
    }
}

const filter_notes = () => {
    let notes = localStorage.getItem('notes');
    if(notes == null){
        notes_list.innerHTML = empty_notes_template;
    }
    else{
        notes_array = Object.entries(JSON.parse(notes));
        if(categories_dropdown.value == 'All'){
            notes_array = notes_array.filter(
                (element) => element[1]['title'].toLowerCase().startsWith(search_bar.value.toLowerCase())
            );
        }
        else{
            notes_array = notes_array.filter(
                (element) =>
                    (element[1]['title'].toLowerCase().startsWith(search_bar.value.toLowerCase()))
                    &&
                    (element[1]['category'] == categories_dropdown.value)
            );
        }
        notes = Object.fromEntries(notes_array);
        display_notes(notes);
    }
}




let notes = localStorage.getItem('notes');
if(notes == null){
    notes_list.innerHTML = empty_notes_template;
}
else{
    notes = JSON.parse(notes);
    display_notes(notes);
    list_categories(notes);
}



search_btn.addEventListener('click', () => {
    search_bar.style.display = 'inline';
    search_bar.focus();
});

search_bar.addEventListener('input', () => {
    filter_notes();
});

categories_dropdown.addEventListener('change', () => {
    filter_notes();
});