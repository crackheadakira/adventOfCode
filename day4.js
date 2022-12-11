// Advent of Code day 4 https://adventofcode.com/2022/day/4

const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8').split("\n")
    .map(value => value.split(",")
        .map(v => v.split('-')
            .map(intString => parseInt(intString))));

let ttlOverlap = 0;

for (let i = 0; i < input.length; i++) {
    let p1Rooms = input[i][0],
        p2Rooms = input[i][1];
    // Example: 2 <= 3 && 8 >= 7 [ [2-8], [3-7] ]
    // Example: 4 <= 6 && 6 >= 6 [ [6-6], [4-6] ]
    if (
        (p1Rooms[0] <= p2Rooms[0] && p1Rooms[1] >= p2Rooms[1])
        || (p2Rooms[0] <= p1Rooms[0] && p2Rooms[1] >= p1Rooms[1])
    ) ttlOverlap++;
}
console.log(ttlOverlap);

// Part 2



let ttlHalfOverlap = 0;

for (let i = 0; i < input.length; i++) {
    input[i] = makeArrayRange(input[i]);
    ttlHalfOverlap += input[i][1].some(v => input[i][0].includes(v)) ? 1 : 0;
}

console.log(ttlHalfOverlap);

function makeArrayRange(arr) {
    let arrCopy = [...arr];
    for (let i = arrCopy[0][0] + 1; i < arrCopy[0][1]; i++) arrCopy[0] = arrCopy[0].concat([i]);
    for (let i = arrCopy[1][0] + 1; i < arrCopy[1][1]; i++) arrCopy[1] = arrCopy[1].concat([i]);
    return arrCopy;
}