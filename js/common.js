const note_form = document.getElementById('note_form');
const imgs = document.getElementsByTagName('img');


let dark_theme = localStorage.getItem('dark_theme');
if(dark_theme == null){
    localStorage.setItem('dark_theme', false);
}
else{
    dark_theme = JSON.parse(dark_theme);
    if(dark_theme){
        document.body.classList.toggle('dark-mode');
        for(let i=0 ; i<imgs.length ; i++){
            imgs[i].src = imgs[i].src.replace('light', 'dark');
            if(note_form !== null){
                note_form.style.borderColor = 'white';
            }
        }
    }
}


const switch_mode = () => {
    document.body.classList.toggle('dark-mode');

    let dark_theme = JSON.parse(localStorage.getItem('dark_theme'));
    dark_theme = !dark_theme
    localStorage.setItem('dark_theme', dark_theme);

    for(let i=0 ; i<imgs.length ; i++){
        if(dark_theme){
            imgs[i].src = imgs[i].src.replace('light', 'dark');
        }
        else{
            imgs[i].src = imgs[i].src.replace('dark', 'light');
        }
    }

    if(note_form !== null){
        if(dark_theme){
            note_form.style.borderColor = 'white';
        }
        else{
            note_form.style.borderColor = 'black';
        }
    }
}