'use strict';

const board = document.querySelector('.board');
const select = document.querySelector('.select');
const range = document.querySelector('#range');
const label = document.querySelector('#label');
const red = document.querySelector('#red');
const black = document.querySelector('#black');
const randomColor = document.querySelector('#random');
const eraser = document.querySelector('#eraser');
const clear = document.querySelector("#clear");

let width = 0;
let height  = 0;
let rgba = 0;
let count = range.value;

let boardWidth;
let boardHeight;

const tabletScreen = window.matchMedia('(max-width: 528px)');
function handleTabletChange(e) {
  if (e.matches) {
    boardWidth = parseFloat(window.getComputedStyle(board).width);
    boardHeight = parseFloat(window.getComputedStyle(board).height);
    setBlocksSize(count);
  } else {
    boardWidth = 500;
    boardHeight = 500; 
    setBlocksSize(count);
  }
}

tabletScreen.addListener(handleTabletChange);
handleTabletChange(tabletScreen);

const mobileScreen = window.matchMedia('(max-width: 425px)')
function handleMobileChange(e) {
  if (e.matches) {
    boardWidth = parseFloat(window.getComputedStyle(board).width);
    boardHeight = parseFloat(window.getComputedStyle(board).height);
    setBlocksSize(count);
  } else {
    handleTabletChange(tabletScreen);
    setBlocksSize(count);
  }
}

mobileScreen.addListener(handleMobileChange)
handleMobileChange(mobileScreen);


let blocks;

function setCount (count = 16) {
    for (let i = 0; i < count**2; i++) {
        let div = document.createElement('div');
        div.classList.add('block');
        board.appendChild(div);
    }
    blocks = document.querySelectorAll('.block');
    setBlocksSize(count);
    blocks.forEach(block => {  
        block.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor =  'red';
        });    
        red.addEventListener('click', () => {
            block.addEventListener('mouseover', (e) => {
                e.target.style.backgroundColor = 'red';
            });
        });
        black.addEventListener('click', () => {
            block.addEventListener('mouseover', (e) => {
                e.target.style.backgroundColor = `rgba(0, 0, 0, ${rgba})`;
                rgba += 0.1;
            });
        });
        randomColor.addEventListener('click', () => {
            block.addEventListener('mouseover', (e) => {
                e.target.style.backgroundColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
            });
        });
        eraser.addEventListener('click', () => {
            block.addEventListener('mouseover', (e) => {
                e.target.style.backgroundColor = '#fff';
            });
        });
        clear.addEventListener('click', () => {
            blocks.forEach(block => {
                block.style.backgroundColor = '#fff';
            });
        });
    });
}

setCount();

function setBlocksSize (count) {
    let blocks = document.querySelectorAll('.block');
    width = boardWidth / count;
    height = boardHeight / count;
    console.log(boardWidth);
    console.log(width);
    blocks.forEach(block => {
        block.style.width = `${width}px`;
        block.style.height = `${height}px`;
    });
}

function clearBoard () {
    let blocks = document.querySelectorAll('.block');
    blocks.forEach(block => {        
        board.removeChild(block);
    }) 
}

range.addEventListener('change', () => {
    label.replaceChildren();
    let value = range.value;
    clearBoard();
    setCount(value);
    setBlocksSize(value);
    label.insertAdjacentHTML('afterbegin', `${value} x ${value}`);
});






