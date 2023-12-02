// https://adventofcode.com/2023/day/1
import path from 'path';
import fs from 'fs';

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim().split('\n');
//const input = ["oooneeone"]
const filterToNumbers = (input: string) => input.split('').filter(letter => !Number.isNaN(+letter));

// Part 1
let P1calibrationSum = 0;
for(const line of input) {
    const calibrationValues = filterToNumbers(line);
    P1calibrationSum += Number(calibrationValues[0] + calibrationValues[calibrationValues.length - 1]);
}

// Part 2
let P2calibrationSum = 0;
const validDigits = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
for(let line of input) {
    for(const digit of validDigits) {
        const digitIndex = line.indexOf(digit);
        const digitExists = line[digitIndex];
        if(digitExists) line = stringToDigit(line, digit, digitIndex);
    }
    const calibrationValues = filterToNumbers(line);
    const resultingNumber = Number(calibrationValues[0] + calibrationValues[calibrationValues.length - 1])
    console.log(line);
    P2calibrationSum += resultingNumber;
}
console.log(`Part 1: ${P1calibrationSum}`);
console.log(`Part 2: ${P2calibrationSum}`);

function stringToDigit(string: string, digit: string, digitIndex: number) {
    const doAgain = digitIndex !== string.lastIndexOf(digit);
    let newString = string.slice(0, digitIndex + 1) + (validDigits.indexOf(digit) + 1) + string.slice(digitIndex + 2);
    if(doAgain) newString = stringToDigit(newString, digit, string.lastIndexOf(digit));
    return newString;
}