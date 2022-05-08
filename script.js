'use strict';

let CurrentPlayer = document
  .querySelector('.player--active')
  .querySelector('.current').textContent;

CurrentPlayer = Number(Boolean(CurrentPlayer[1])) - 1;

function ChangePlayer() {
  document
    .querySelector(`.player--${CurrentPlayer}`)
    .querySelector('.current-score').textContent = 0;

  document
    .querySelector(`.player--${CurrentPlayer}`)
    .classList.remove('player--active');

  CurrentPlayer ^= 1;

  document
    .querySelector(`.player--${Number(CurrentPlayer)}`)
    .classList.add('player--active');
}
function GetCurrentPlayerScore() {
  const score = Number(
    document
      .querySelector(`.player--${CurrentPlayer}`)
      .querySelector('.current-score').textContent
  );
  return score;
}

const RollDice = function () {
  const DiceNumber = Math.trunc(Math.random() * 6) + 1;
  document.querySelector('.dice').src = `dice-${DiceNumber}.png`;

  if (DiceNumber == 1) ChangePlayer();
  else {
    document
      .querySelector(`.player--${CurrentPlayer}`)
      .querySelector('.current-score').textContent =
      GetCurrentPlayerScore() + DiceNumber;
  }
};

const HoldScore = function () {
  document
    .querySelector(`.player--${CurrentPlayer}`)
    .querySelector('.score').textContent =
    GetCurrentPlayerScore() +
    Number(
      document
        .querySelector(`.player--${CurrentPlayer}`)
        .querySelector('.score').textContent
    );

  const score = document
    .querySelector(`.player--${CurrentPlayer}`)
    .querySelector('.score').textContent;

  console.log(score);

  if (Number(score) >= 100) {
    document
      .querySelector(`.player--${CurrentPlayer}`)
      .classList.add('player--winner');
  } else ChangePlayer();
};

const ResetGame = function () {
  for (let i = 0; i < 2; i++) {
    const Players = document.querySelector(`.player--${i}`);
    Players.querySelector('.score').textContent = 0;
    Players.querySelector('.current-score').textContent = 0;
  }

  document
    .querySelector(`.player--${CurrentPlayer}`)
    .classList.remove('player--winner');

  if (CurrentPlayer) ChangePlayer();

  CurrentPlayer = 0;
};

document.querySelector('.btn--roll').addEventListener('click', RollDice);
document.querySelector('.btn--hold').addEventListener('click', HoldScore);
document.querySelector('.btn--new').addEventListener('click', ResetGame);
