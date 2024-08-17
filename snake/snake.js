let M = 9;
let view_size = 32;
let tick = 500;
let view = document.getElementById("view")
let point, faster = false
let isover = false
let S = [];
class Snakepos{
    constructor(pos) {
        this.pos = pos;
    }
}


function showsnake(Ss){
    for(let i = 0; i < Ss.length; i++){
        console.log(S[i].pos + "->");
    }
}

function newpoint(){
    let keep
    do{
        keep = false
        point = parseInt(Math.random()*(M*M))
        for(let i = 0; i < S.length; i++){
            if(point == S[i].pos){
                keep = true;
            }
        }
    }while(keep)
    block = document.getElementsByClassName("block")
    block[point].id = "point"
}

function initsnake(){
    t = 0;
    tick = 500;
    S = [];
    for(let i = 0; i < 4; i++){
        if(i == 0){
            S.push(new Snakepos(M*parseInt(M/2)+parseInt(M/2)))
        }else{
            S.push(new Snakepos(M*parseInt(M/2)+parseInt(M/2)-i*M))
        }
    }
}

function initblock(){
    let block = document.getElementsByClassName("block");
    for(let i = 0; i < M*M; i++){
        block[i].style.border = ''
        block[i].id = '';
        block[i].style.borderRadius = ""
        block[i].style.backgroundColor = ''
    }
}

let loop, fast;
function loopfun(){
    console.log("in loopfun()")
    loop = setInterval(gameloop, tick)
    
    setInterval(()=>{
        if(faster){
            if(loop){
                if(tick > 100){
                    tick = parseInt(tick - 3)
                }
                clearInterval(loop);
                console.log("clear")
                loop = setInterval(gameloop, tick)
                console.log("set")
                console.log("faster", tick)    
                
            }
            faster = false
        }
    }, 1)
}

document.addEventListener("DOMContentLoaded", ()=> {
    let block;
    initsnake()
    for(let i = 0; i < M*M; i++){
        block = document.createElement('div');
        block.classList.add('block')
        view.appendChild(block);
    }
    block = document.getElementsByClassName("block")
    for(let i = 0; i < S.length; i++){
        if(i == 0){
            block[S[i].pos].id = "head"
        }else{
             block[S[i].pos].id = "tail"
        }
    }
    newpoint()
    
    view.style.display = "grid"
    view.style.gridTemplateColumns = `repeat(${M}, 1fr)`
    view.style.gridTemplateRows = `repeat(${M}, 1fr)`
    view.style.gap = "0.2rem"
    // loop = setInterval(gameloop, tick)
    loopfun()
});




let dir = M;  // 上下左右 -M, M, -1, 1
let pastdir = dir
document.addEventListener('keydown', (event)=>{
    const key = event.key;
    if(key == 'w' && pastdir != M){
        dir = -M;
    }else if(key == 's' && pastdir != -M){
        dir = M;
    }else if(key == 'a' && pastdir != 1){
        dir = -1;
    }else if(key == 'd' && pastdir != -1){
        dir = 1;
    }
})

let block = document.getElementsByClassName("block")
let t = 0
function gameloop(){
    console.log("pos", S[0].pos, "tick", t, "faster", faster, "isover", isover, "point", point)
    if(!isover){
        if( 
            S[0].pos+dir >= 0 && 
            S[0].pos+dir < M*M && 
            Math.abs((S[0].pos+dir)%M - (S[0].pos)%M) < M-1 &&
            (block[S[0].pos+dir].id != "tail" || S[0].pos+dir == S[S.length-1].pos)){
                pastdir = dir
        
                if(S[0].pos+dir != point){
                    block[S[S.length-1].pos].id = "";
                    block[S[S.length-1].pos].style.border = ''
                    block[S[S.length-1].pos].style.borderRadius = ""
                    block[S[S.length-1].pos].style.backgroundColor = ''
                }else{
                    document.getElementById("score").innerText = "score: " + (parseInt(document.getElementById("score").innerHTML.split(' ')[1])+1)
                    S.push(new Snakepos(S[S.length-1].pos))
                    newpoint()
                }
                for(let i = S.length-1; i > 0; i--){
                    S[i].pos = S[i-1].pos;
                    block[S[i].pos].id = "tail"
                    block[S[i].pos].style.border = `${0.4*i}px solid rgb(72, 35, 35)`
                    block[S[i].pos].style.backgroundColor = `rgba(${153+i}, 255, 0, 0.84)`
                    if(i > 20){
                        block[S[i].pos].style.borderRadius = "40%"
                        
                    }
                }
                S[0].pos += dir 
                block[S[0].pos].id = "head"
            }else{
                let end = document.getElementById('end')
                end.style.display = "block"
                end.innerHTML = document.getElementById("score").innerText                
                initsnake()
                initblock()
                newpoint()
                document.getElementById("score").innerText = "score: 0"
                isover = true

                end.addEventListener('click', ()=>{
                    isover = false
                    end.style.display = 'none'

                })
            }
        
        if(t++ % 5 == 0){
            faster = true
        }
    }
    
    
}