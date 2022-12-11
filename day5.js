// Advent of Code day 5 https://adventofcode.com/2022/day/5

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8').split('\n\n');
input[1] = input[1].split('\n');

let cratesInfo = input[0].split('\n');
let stacks = Math.max(...cratesInfo[cratesInfo.length - 1].split('   ').map(v => parseInt(v)));

let moves = interpretMoves(input[1]);
let crates = [];

for (let i = 1; i <= stacks; i++) {
    crates.push(readStacks(cratesInfo, stacks, i));
}

let part1 = false;
let changedCrates = useMoves(crates, moves, part1);
let topCrates = "";

for (let i = 0; i < changedCrates.length; i++) {
    topCrates += changedCrates[i][0];
}
console.log(topCrates);

function interpretMoves(input) {
    let moves = [];
    for (let i = 0; i < input.length; i++) {
        let splitMove = input[i].split(' ');
        moves.push({
            move: +splitMove[1],
            from: +splitMove[3] - 1,
            to: +splitMove[5] - 1,
        })
    }
    return moves;
}

function useMoves(arr, moves, part1) {
    for (let i = 0; i < moves.length; i++) {
        let movedCrates = [];
        for (let j = 0; j < moves[i].move; j++) {
            let movCrate = arr[moves[i].from].shift();
            if (moves[i].move === 1 || part1) {
                movedCrates.unshift(movCrate)
            } else {
                movedCrates.push(movCrate);
            }
        }
        arr[moves[i].to].unshift(...movedCrates);
    }
    return arr;
}

/**
 * @param {Array<String>} arr The array with all the crates
 * @param {Number} stackLength How many stacks of crates there are
 * @param {Number} column Which column of crates to read
 * @returns {Array<String>} The letter of the crates
 */
function readStacks(arr, stackLength, column) {
    column = (column - 1) * 4
    let allCrates = [];
    for (let i = 0; i < stackLength; i++) {
        if (!arr[i][1 + column].includes(' ')) {
            allCrates.push(arr[i][1 + column]);
        }
    }
    return allCrates;
}