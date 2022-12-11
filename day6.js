// Advent of Code day 6 https://adventofcode.com/2022/day/6

const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');
console.log(findMarker(input, 4))
console.log(findMarker(input, 14))

function findMarker(string, pos) {
    let chars = string.split("");
    for (let i = 0; i < chars.length; i++) {
        let firstChars = [];
        for (let j = 0; j < pos; j++) firstChars.push(chars[j + i]);
        if (firstChars.every((v, i, arr) => arr.indexOf(v) === i)) return pos + i;
    }
}