//get the span in the starting div
let startGame = document.querySelector('.starting span');

startGame.onclick = function(){
    let yourName = prompt("What's your name ?");

    setInterval(updateCountDown , 1000);

   
    if(yourName == null || yourName == ""){
        document.querySelector('.name span').innerHTML ='unkown';
    }else{

        document.querySelector('.name span').innerHTML =yourName;
    }

    document.querySelector('.starting').remove();
    document.getElementById('chill').play();
};


let duration = 1000;
//get main-container
let mainContainer = document.querySelector('.main-container');
//get childern of main-container (img-block) and set it in array
let imgBlock = Array.from(mainContainer.children);
//get range of key from 1 to 19 and set it in array
let orderRange = Array.from(Array(imgBlock.length).keys());
//(OR) let orderRange = [...Array(imgBlock.length).keys()];                   //to get it as indexes 0:19 not numbers 1:20

console.log(orderRange);
suffling(orderRange);
console.log(orderRange);

//add order to img-block
imgBlock.forEach( (block , index) => {

    block.style.order = orderRange[index];

    block.addEventListener('click' , function(){
        rotation(block);
    })

});

//shuffle fun
function suffling(array){

    let current = array.length ,temp , random;
    while(current > 0){
        random = Math.floor(Math.random() * current);
        current--;

        temp = array[current];
        array[current] = array[random];
        array[random] = temp;

    }
    return array;
};

//rotation fun
function rotation(selectedBlock){
    //add roteted class to selected block
    selectedBlock.classList.add('rotated');
    //collect the same blocks
    let allRotatedBlocks = imgBlock.filter(RotatedBlock => RotatedBlock.classList.contains('rotated'));
    if(allRotatedBlocks.length === 2){
        // console.log("rotated block");

        stopClicking();
        checkMatching(allRotatedBlocks[0] , allRotatedBlocks[1]);
    }

};
 //stop clicking fun
 function stopClicking(){
    mainContainer.classList.add('no-clicking');

    setTimeout(() => {

        mainContainer.classList.remove('no-clicking');
    } , duration);

};
//check matching fun
function checkMatching(block1 , block2){
    let tries = document.querySelector('.try span');

    if(block1.dataset.art === block2.dataset.art){

        block1.classList.remove('rotated');
        block2.classList.remove('rotated');

        block1.classList.add('matched');
        block2.classList.add('matched');

        document.getElementById('success').play();
    }else{
        tries.innerHTML = parseInt(tries.innerHTML) + 1;

        setTimeout(() => {
            block1.classList.remove('rotated');
            block2.classList.remove('rotated');
        } , duration);
        
        document.getElementById('failed').play();
    }

};

// count down timer:
let startingMinute = 2;
let time = startingMinute * 60;
let countDown = document.querySelector('.count-down');



function updateCountDown(){
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if(time >=0 ){
        countDown.innerHTML = `${minutes} : ${seconds}`
        time--;
    }else{
        endTime();
    }
};

function endTime(){
    countDown.innerHTML = 'TIME OUT';
   // document.querySelector('.starting').append();
}