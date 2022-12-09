// Advent of Code day 3 https://adventofcode.com/2022/day/3

// Part 1
const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8').split('\n').map(value => searchComp(splitComp(value))).reduce((a, b) => a + b, 0);
console.log(input);

function splitComp(string) {
    let stringHalf = Math.round(string.length / 2);
    return [string.slice(0, stringHalf), string.slice(stringHalf)];
}

function getPrioritization(string) {
    let priorityList = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from(string).map(letter => priorityList.indexOf(letter) + 1)
}

function searchComp(compArray) {
    let duplicates = getPrioritization(compArray[0]).filter(value => getPrioritization(compArray[1]).indexOf(value) > -1);
    return duplicates[0];
}

// Part 2
const inputP2 = getGroups(fs.readFileSync('input.txt', 'utf-8').split('\n').map(value => getPrioritization(value))).map(value => searchGroupComp(value)).reduce((a, b) => a + b, 0);
console.log(inputP2);

function getGroups(groupArray) {
    let result = [];
    for (let i = 0; i < groupArray.length; i++) {
        result.push([groupArray[i], groupArray[i + 1], groupArray[i + 2]]);
        groupArray.splice(0, 2);
    }
    return result;
}

function searchGroupComp(compArray) {
    let longestIndex = compArray.indexOf(getLongestElement(compArray));
    let modifiedArray = compArray.filter((value, i) => i !== longestIndex);
    let results = compArray[longestIndex].filter(value => modifiedArray[0].indexOf(value) > -1 && modifiedArray[1].indexOf(value) > -1);
    return results[0];
}

function getLongestElement(array) {
    return array.reduce((a, b) => (b.length > a.length ? b : a), '',);
}