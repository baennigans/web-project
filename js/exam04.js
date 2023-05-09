function clickbt(id1 , id2 , id3) {
    let div = document.getElementById(id1);
    div.style.backgroundColor = 'white';
    div.style.color = 'black';
    resetbt(id2);
    resetbt(id3);
}

function resetbt(id){
    let div = document.getElementById(id);
    div.style.backgroundColor = 'gray';
    div.style.color = 'white';
}
