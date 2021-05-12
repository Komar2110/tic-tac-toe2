'use strict';

const buttonPlayerX = document.querySelector('.playerX'),
      buttonPlayer0 = document.querySelector('.player0'),
      field = document.querySelector('.field'),
      score = document.querySelector('.score'),
      modal = document.querySelector('.modal'),
      modalContent = document.querySelector('.modalContent'),
      modalBtn = document.querySelector('.modalBtn'),
      result = [
          [0,1,2],
          [3,4,5],
          [6,7,8],
          [0,3,6],
          [1,4,7],
          [2,5,8],
          [0,4,8],
          [2,4,6]
      ],
      image0 = 'background-image: url("0.png");',
      imageX = 'background-image: url("x.png");';
let winner0 = 0, winnerX = 0;

buttonPlayerX.addEventListener('click', () => buttonClick(buttonPlayer0, imageX, image0)); 

buttonPlayer0.addEventListener('click', () => buttonClick(buttonPlayerX, image0, imageX));

function buttonClick (button1, img1, img2) {
    field.style.opacity = '1';
    button1.setAttribute('disabled', 'disabled');
    field.addEventListener('click', (event) => { 
        if (event.target.classList.contains('stop') == false) {
            event.target.style.cssText = img1;
            event.target.classList.add('stop'); 
        }
        setTimeout(proverka(img2), 1000);
    });
}

function win(img2) {
    let fch = field.children;
    for (let i = 0; i < result.length; i++) {
        if (fch[result[i][0]].style.cssText == img2 && 
            fch[result[i][1]].style.cssText == img2 && 
            fch[result[i][2]].style.cssText == img2) {
            if (img2 == imageX) {
                modalContent.innerHTML = 'Победили крестики';
            } else if (img2 == image0) {
                modalContent.innerHTML = 'Победили нолики';
            }            
            modal.style.display = 'block';
            modalBtn.addEventListener('click', () => {
                modal.style.display = 'none';
                for (let j = 0; j < 9; j++) {
                    field.children[j].classList.remove('stop');
                    field.children[j].style.backgroundImage = 'none';
                    score.innerHTML = `Крестики: ${winnerX}   Нолики: ${winner0}`;
                }
            });
        }
    }
}

function proverka(img2) {
    let x = rand();
    if (field.children[x+1].classList.contains('stop') == false) {
        field.children[x+1].style.cssText = img2;
        field.children[x+1].classList.add('stop');
    } else {
        proverka(img2);
    }
    win('background-image: url("x.png");');
    win('background-image: url("0.png");');
}

function rand() {
    return Math.floor(Math.random()*8);
}