// Advent of Code day 2 https://adventofcode.com/2022/day/2

const fs = require("fs");
const input = fs.readFileSync('input.txt', 'utf-8');

/*// Part 1
const rounds = input.split('\n').map(round => {
    round = round.split(' ').map(play => calculatePos(play));
    return calculateScore(round);
}).filter(round => round);
console.log(rounds.reduce((score1, score2) => score1 + score2, 0));

// Part 2
const roundsP2 = input.split('\n').map(round => {
    round = round.split(' ');
    return calculateScore([calculatePos(round[0]), calculatePosP2(round)]);
}).filter(round => round);
console.log(roundsP2.reduce((score1, score2) => score1 + score2, 0));

function calculateScore(input) {
    if (input[0] === input[1]) return 3 + input[1];
    if (input[0] === 1 && input[1] !== 2) return 0 + input[1];
    if (input[0] === 2 && input[1] !== 3) return 0 + input[1];
    if (input[0] === 3 && input[1] !== 1) return 0 + input[1];
    return 6 + input[1];
}

function calculatePos(input) {
    if (input === "A" || input === "X") return 1;
    if (input === "B" || input === "Y") return 2;
    if (input === "C" || input === "Z") return 3;
}

function calculatePosP2(input) {
    if (input[1] === "X") return getOpposite(input[0], false);
    if (input[1] === "Y") return calculatePos(input[0]);
    if (input[1] === "Z") return getOpposite(input[0], true);
}

function getOpposite(input, win) {
    if (input === "A" && !win) return 3;
    if (input === "B" && !win) return 1;
    if (input === "C" && !win) return 2;

    if (input === "A" && win) return 2;
    if (input === "B" && win) return 3;
    if (input === "C" && win) return 1;
}*/

// ALTERNATIVE CODE
const convertMoves = (input) => [["A", "B", "C"].indexOf(input[0]) + 1, ["X", "Y", "Z"].indexOf(input[1]) + 1];
const arraySum = (input) => input.reduce((score1, score2) => score1 + score2, 0);

// Part 1 - Assuming X Y Z to mean Rock Paper Scissors
let rounds = input.split('\n').map(round => getScore(convertMoves(round.split(' '))));
console.log(arraySum(rounds));

// Part 2 - X Y Z means Lose Tie Win
let roundsP2 = input.split('\n').map(round => {
    round = convertMoves(round.split(' '));
    if (round[1] === 2) round[1] = round[0];
    else (round[1] = clampMove(round[0] + round[1] % 3 + 1));
    return getScore(round);
});
console.log(arraySum(roundsP2));

function getScore(input) {
    if (input[0] === input[1]) return 3 + input[1];
    if (clampMove(input[0] + 1) !== input[1]) return 0 + input[1];
    return 6 + input[1];
}

function clampMove(input) {
    if (input > 3) return input % 3;
    return input;
}