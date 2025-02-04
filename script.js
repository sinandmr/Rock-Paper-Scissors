'use strict';
// ------------------------------------- initialization -------------------------------------
const button = document.querySelector('.btn1');
const button2 = document.querySelector('.btn2');
const gameLevelBtn = document.querySelector('.btn3');
const startText = document.querySelector('.start-text');
const buttonContainer = document.querySelector('.buttons-container');
const leftChoose = document.querySelector('.choose1');
const rightChoose = document.querySelector('.choose2');
const tas = document.querySelector('.tas');
const kagit = document.querySelector('.kagit');
const makas = document.querySelector('.makas');
const score1 = document.querySelector('.score1');
const score2 = document.querySelector('.score2');

const elements = ['tas', 'kagit', 'makas'];
let randomChoose = Math.floor(Math.random() * 3);
let choose = 1;
let scores = [0, 0];
let gameLevel = 'easy';
const winners = [
  ['tas', 'makas'],
  ['makas', 'kagit'],
  ['kagit', 'tas'],
];
const equal = [
  ['tas', 'tas'],
  ['makas', 'makas'],
  ['kagit', 'kagit'],
];

// ------------------------------------- functions -------------------------------------

function result(val1, val2) {
  let arr = [elements[val1], elements[val2]];

  if (
    arrEqual(winners[0], arr) ||
    arrEqual(winners[1], arr) ||
    arrEqual(winners[2], arr)
  ) {
    scores[0]++;
    score1.textContent = scores[0];
  } else if (
    arrEqual(equal[0], arr) ||
    arrEqual(equal[1], arr) ||
    arrEqual(equal[2], arr)
  ) {
  } else if (
    arrEqual(winners[0], arr, 'notequal') ||
    arrEqual(winners[1], arr, 'notequal') ||
    arrEqual(winners[2], arr, 'notequal')
  ) {
    scores[1]++;
    score2.textContent = scores[1];
  }
}

function levelControl(choose) {
  if (gameLevel === 'easy') {
    console.log('Kolay Mod');
    return (randomChoose = Math.floor(Math.random() * 3));
  } else if (gameLevel === 'hard') {
    randomChoose = Math.floor(Math.random() * 100);
    console.log('Zor Mod');
    console.log(randomChoose);

    if (randomChoose <= 50) {
      if (choose === 0) {
        return (randomChoose = 1);
      } else if (choose === 1) {
        return (randomChoose = 2);
      } else if (choose === 2) {
        return (randomChoose = 0);
      }
    } else if (randomChoose > 50 && randomChoose <= 80) {
      if (choose === 0) {
        return (randomChoose = 0);
      } else if (choose === 1) {
        return (randomChoose = 1);
      } else if (choose === 2) {
        return (randomChoose = 2);
      }
    } else if (randomChoose > 80) {
      if (choose === 0) {
        return (randomChoose = 2);
      } else if (choose === 1) {
        return (randomChoose = 0);
      } else if (choose === 2) {
        return (randomChoose = 1);
      }
    }
  }
}

function arrEqual(param1, param2, islem = 'equal') {
  if (islem === 'equal') {
    return JSON.stringify(param1) === JSON.stringify(param2);
  } else if (islem === 'notequal') {
    return JSON.stringify(param1) !== JSON.stringify(param2);
  }
}

function gameOver() {
  if (scores[0] === 3) {
    startText.textContent = 'Oyunu sen kazandın.';
  } else if (scores[1] === 3) {
    startText.textContent = 'Oyunu bilgisayar kazandı.';
  }

  if (scores[0] === 3 || scores[1] === 3) {
    choose = 1;
    scores = [0, 0];
    buttonContainer.classList.add('hidden');
    button.classList.add('hidden');
    button2.classList.remove('hidden');
  }
}

function selectImage() {
  leftChoose.src = `img/sol-${elements[choose]}.png`;
  rightChoose.src = `img/sag-${elements[randomChoose]}.png`;
}

function newGame() {
  button.classList.add('hidden');
  startText.classList.remove('hidden');
  buttonContainer.classList.remove('hidden');
  button2.classList.add('hidden');
  startText.textContent = 'Seçim Yap!';
  score1.textContent = 0;
  score2.textContent = 0;
}

// ------------------------------------- events -------------------------------------

button.addEventListener('click', () => {
  newGame();
});

button2.addEventListener('click', () => {
  newGame();
});

gameLevelBtn.addEventListener('click', () => {
  if (gameLevelBtn.textContent === 'Mod : Kolay') {
    gameLevelBtn.textContent = 'Mod : Zor';
    gameLevel = 'hard';
  } else if (gameLevelBtn.textContent === 'Mod : Zor') {
    gameLevelBtn.textContent = 'Mod : Kolay';
    gameLevel = 'easy';
  }
});

tas.addEventListener('click', () => {
  choose = 0;
  levelControl(choose);
  console.log(randomChoose);
  selectImage(choose);
  result(choose, randomChoose);
  gameOver();
});

kagit.addEventListener('click', () => {
  choose = 1;
  levelControl(choose);
  console.log(randomChoose);
  selectImage(choose);
  result(choose, randomChoose);
  gameOver();
});

makas.addEventListener('click', () => {
  choose = 2;
  levelControl(choose);
  console.log(randomChoose);
  selectImage(choose);
  result(choose, randomChoose);
  gameOver();
});
