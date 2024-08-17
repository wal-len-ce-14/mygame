let M = 5;
let view_size = 32;

let view = document.getElementById("view")
let B = new Array(M * M).fill(false);



document.addEventListener("DOMContentLoaded", ()=> {
    let block;
    for(let i = 0; i < M*M; i++){
        block = document.createElement('div');
        block.classList.add('block')
        if(B[i] == true){
            block.id = "light";
        }
        block.addEventListener("click", ()=> change(i))
        view.appendChild(block);
    }
    
    view.style.gridTemplateColumns = `repeat(${M}, 1fr)`
    view.style.gridTemplateRows = `repeat(${M}, 1fr)`
    if(M < 10){
        view.style.gap = "0.7rem"
    }else{
        view.style.gap = "0.3rem"
    }
    console.log("DOM loaded");
});

function change(num){
    if(0 <= num && num < M*M)B[num] = !B[num]
    if(num+1 < M*M && (num)%M != M-1) B[num+1] = !B[num+1]
    if(num-1 >= 0 && (num)%M != 0) B[num-1] = !B[num-1]
    if(num+M < M*M) B[num+M] = !B[num+M]
    if(num-M >= 0) B[num-M] = !B[num-M]

    let check = true;
    for(let i = 0; i < M*M; i++){
        let ch = document.getElementsByClassName("block")[i];
        if(!B[i]){
            ch.id = "";
            check = false;
        }else{
            ch.id = "light";
        }
    }
    // console.log(check)
    if(check == true){
        winfun();
    }
}

function clickstart(){
    let r = Math.random()*0.4+0.3
    for(let i = 0; i < M*M; i++){
        if(Math.random() > r){
            B[i] = !B[i];
        }
    }
    change(1e6)
}

function winfun(){
    let win = document.getElementById("win");
    win.style.display = "block"
    win.addEventListener("click",  ()=> {
        win.style.display = "none"
    })
    console.log("You Win!!");
}

