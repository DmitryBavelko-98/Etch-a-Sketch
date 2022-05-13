'use strict';

const board = document.querySelector('.board'),
    select = document.querySelector('.select'),
    range = document.querySelector('#range'),
    label = document.querySelector('#label'),
    red = document.querySelector('#red'),
    black = document.querySelector('#black'),
    randomColor = document.querySelector('#random'),
    eraser = document.querySelector('#eraser'),
    clear = document.querySelector("#clear"),
    tabletScreen = window.matchMedia('(max-width: 528px)'),
    mobileScreen = window.matchMedia('(max-width: 425px)');

let width = 0,
    height  = 0,
    rgba = 0,
    count = 16,
    boardWidth,
    boardHeight,
    blocks;

    
function handleTabletChange(e) {
  if (e.matches) {
    let count = range.value;
    boardWidth = parseFloat(window.getComputedStyle(board).width);
    boardHeight = parseFloat(window.getComputedStyle(board).height);
    setBlocksSize(count);
  } else {
    let count = range.value;
    boardWidth = 500;
    boardHeight = 500; 
    setBlocksSize(count);
  }
}

function handleMobileChange(e) {
  if (e.matches) {
    let count = range.value;
    boardWidth = parseFloat(window.getComputedStyle(board).width);
    boardHeight = parseFloat(window.getComputedStyle(board).height);
    setBlocksSize(count);
  } else {
    let count = range.value;
    handleTabletChange(tabletScreen);
    setBlocksSize(count);
  }
}

function setCount (count = 16) {
    for (let i = 0; i < count**2; i++) {
        let div = document.createElement('div');
        div.classList.add('block');
        board.appendChild(div);
    }
    blocks = document.querySelectorAll('.block');
    setBlocksSize(count);
    draw();
}

function draw() {
    blocks.forEach(block => {  
        block.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor =  'rgba(0, 0, 0, 0.1)';
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
        clear.addEventListener('click', (e) => {
            blocks.forEach(block => {
                block.style.backgroundColor = '#fff';
            });
        });
        clear.onfocus = () => {
            clear.blur();
        }
        clear.onblur = (e) => {
            draw();
        }
    });
}

function setBlocksSize (count) {
    let blocks = document.querySelectorAll('.block');
    width = boardWidth / count;
    height = boardHeight / count;
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

setCount();

range.addEventListener('change', () => {
    label.replaceChildren();
    let value = range.value;
    clearBoard();
    setCount(value);
    setBlocksSize(value);
    label.insertAdjacentHTML('afterbegin', `${value} x ${value}`);
});

tabletScreen.addListener(handleTabletChange);
handleTabletChange(tabletScreen);

mobileScreen.addListener(handleMobileChange)
handleMobileChange(mobileScreen);






