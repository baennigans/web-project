function mousebt(id1,id2,id3) {
    let div = document.getElementById(id1);
    div.style.color = 'black';
    div.style.backgroundColor = 'white'
    resetbt(id2);
    resetbt(id3);
}

function resetbt(id) {
    let div = document.getElementById(id);
    div.style.color = 'white';
    div.style.backgroundColor = 'gray';
}