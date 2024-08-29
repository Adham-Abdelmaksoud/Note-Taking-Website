const id = JSON.parse(localStorage.getItem('id_to_be_edited'));
const notes = JSON.parse(localStorage.getItem('notes'));

let note = notes[id];
console.log(note);

title_field.value = note.title;
note_field.value = note.note;
category_field.value = note.category;