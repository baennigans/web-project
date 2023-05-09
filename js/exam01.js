function start() {
    let name = prompt("이름을 입력하세요")
    checkName(name);
}

function checkName(name) {
    if(name===null || name===""){
        name = prompt("입력해주세요!!!")
    } 
    
    if (name===null || name===""){
        alert("입력하지 않았습니다.")
    } else {
        alert(name+"님 안녕하세요.")
    }
}

