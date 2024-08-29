let save_note_btn = document.getElementById('save_note_btn');
let title_field = document.getElementById('title');
let note_field = document.getElementById('note');
let category_field = document.getElementById('category');

category_field.addEventListener('click', () => {
    category_field.value = '';
});

save_note_btn.addEventListener('click', () => {
    let notes = localStorage.getItem('notes');
    if(category_field.value.trim() == ''){
        category_field.value = 'Uncategorized';
    }
    let new_note = {
        title: title_field.value,
        note: note_field.value,
        category: category_field.value
    }
    if(notes == null){
        notes = {
            0: new_note
        }
    }
    else{
        notes = JSON.parse(notes);
        const id = JSON.parse(localStorage.getItem('id_to_be_edited'));
        if(id == null){
            let max_id = 0;
            for(let key in notes){
                max_id = Math.max(max_id, Number(key));
            }
            notes[max_id+1] = new_note;
        }
        else{
            notes[id] = new_note;
        }
    }

    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('id_to_be_edited', null);
});