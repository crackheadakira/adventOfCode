// https://adventofcode.com/2023/day/3
import path from 'path';
import fs from 'fs';

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim().split('\n');

const filterToNumbers = (input: string) => input.replace(/\D/g, ' ').trim().split(' ').filter(c => c);
const makeValueRange = (input: number[]) => {
    const range = Array.from({ length: Math.max(...input) + 2 }, (_, k) => k);
    return range.slice(range.indexOf(Math.max(0, Math.min(...input) - 1)))
}
const firstAndLastIndex = (input: string, search: string) => {
    const newInput = input.replace(/(?<!\d)(?=\d)/g, ' ');
    const resultingIndex = newInput.indexOf(` ${search}`);
    return [resultingIndex, resultingIndex + search.length - 1]
};

const partList: number[] = [];
for(const line of input) {
    const filtered = filterToNumbers(line);
    const validParts: boolean[] = [];
    for(let i = 0; i < filtered.length; i++) {
        const number = filtered[i];
        const indexes = firstAndLastIndex(line, number)
        const hasSymbol = checkForAdjacentSymbol(input, makeValueRange(indexes), input.indexOf(line));
        validParts.push(hasSymbol);
    }
    partList.push(...filtered.filter((c, idx) => validParts[idx]).map(a => Number(a)));
}

console.log(partList.reduce((a, b) => a + b, 0));

function checkForAdjacentSymbol(input: string[], range: number[], line: number) {
    const lineWidth = input[0].length - 1;
    const symbols = "↵-*/#&+@=$%+-".split('');
    const adjSquares: string[] = [];
    for(let i = 0; i < range.length; i++) {
        const rangeNumber = Math.min(range[i], lineWidth);
        const minLine = Math.max(0, line - 1);
        const maxLine = Math.min(input.length - 1, line + 1);

        const selectedSquare = input[line][rangeNumber];
        const aboveSquare = input[minLine][rangeNumber];
        const belowSquare = input[maxLine][rangeNumber];
        adjSquares.push(selectedSquare, aboveSquare, belowSquare);
    }
    return symbols.some((c) => adjSquares.includes(c))
}