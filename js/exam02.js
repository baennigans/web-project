function start() {
    let num = prompt('숫자를 입력하세요.');
    checkNum(num);
}

function checkNum(num) {
    if(isNaN(num) || num===''){
        alert('숫자를 입력해주세요!!')
    }else{
        if(num>=1 && num<=100){
            for(let i=1; i<=100; i++){
                console.log(i);
            }
            alert('완료되었습니다.')
        } else{
            alert('1~100이 아닙니다.')
        }
    }
}