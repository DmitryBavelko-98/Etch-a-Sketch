'use strict';

const container = document.querySelector('.container');
const select = document.querySelector('.select');
let width = 0;
let height  = 0;
const range = document.querySelector('#range');
const label = document.querySelector('#label');
const red = document.querySelector('#red');
const black = document.querySelector('#black');
const randomColor = document.querySelector('#random');
const eraser = document.querySelector('#eraser');


const containerWidth = 500;
const containerHeight = 500;

let blocks;

function setCount (count = 16) {
    for (let i = 0; i < count**2; i++) {
        let div = document.createElement('div');
        div.classList.add('block');
        container.appendChild(div);
    }
    blocks = document.querySelectorAll('.block');
    setBlocksSize(count);
    blocks.forEach(block => {
        block.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = 'black';
        });        
        red.addEventListener('click', () => {
            block.addEventListener('mouseover', (e) => {
                e.target.style.backgroundColor = 'red';
            });
        });
        black.addEventListener('click', () => {
            block.addEventListener('mouseover', (e) => {
                e.target.style.backgroundColor = 'black';
            });
        });
        randomColor.addEventListener('click', () => {
            block.addEventListener('mouseover', (e) => {
                e.target.style.backgroundColor = 'green';
            });
        });
        eraser.addEventListener('click', () => {
            block.addEventListener('mouseover', (e) => {
                e.target.style.backgroundColor = '#eee';
            });
        });
    });
}

setCount();

function setBlocksSize (count) {
    let blocks = document.querySelectorAll('.block');
    width = containerWidth / count;
    height = containerHeight / count;
    blocks.forEach(block => {
        block.style.width = `${width}px`;
        block.style.height = `${height}px`;
    });
}

function clearBoard () {
    let blocks = document.querySelectorAll('.block');
    blocks.forEach(block => {        
        container.removeChild(block);
    }) 
}

function draw (e) {
    e.target.style.backgroundColor = 'black';

}

range.addEventListener('change', () => {
    label.replaceChildren();
    let count = range.value;
    clearBoard();
    setCount(count);
    setBlocksSize(count);
    label.insertAdjacentHTML('afterbegin', `${count} x ${count}`);
});






