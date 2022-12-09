// Advent of Code day 1 https://adventofcode.com/2022/day/1

const fs = require("fs");
const input = fs.readFileSync('input.txt', 'utf-8');

// Split them when ever there's a gap between the integers, then map them into an array and flatten them to prevent them from being nested
let splitInput = input.split('\n\n').map(calories => [calories.split('\n')].flat());
// Get the sum of each array and return those in an array
let totalCalories = splitInput.map(calorie => calorie.reduce((firstCalories, nextCalories) => +firstCalories + +nextCalories, 0));
let top3Calories = 0;

// Find the 3 biggest calorie counts then add them to a total
for (let i = 0; i < 3; i++) {
    let biggestCalorieCount = Math.max(...totalCalories);
    top3Calories += biggestCalorieCount;
    totalCalories.splice(totalCalories.indexOf(biggestCalorieCount), 1)
}
console.log(top3Calories);