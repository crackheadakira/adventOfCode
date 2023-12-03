// https://adventofcode.com/2023/day/2
import path from 'path';
import fs from 'fs';

type cubeGameSet = Partial<{
    red: number
    green: number
    blue: number
}>

type cubeGame = {
    ID: number
    sets: cubeGameSet[]
}

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim().split('\n');
const maximumCubes: cubeGameSet = {
    red: 12,
    green: 13,
    blue: 14,
}

const remainingGames = input.filter((game) => {
    const results = getCubeValues(game);
    return results.sets.every(c => compareSetToMax(c, maximumCubes));
}).map(game => getCubeValues(game).ID)
const idSum = remainingGames.reduce((a, b) => a + b);

const maximumGames = input.map((game) => {
    const results = getCubeValues(game);
    return getMaximumSet(results.sets);
}).map((a) => {
    const valueArr: number[] = [];
    Object.values(a).forEach((v) => valueArr.push(v))
    return valueArr.reduce((a,b) => a * b);
}).reduce((a,b) => a + b);

console.log(`Part 1: ${idSum}`);
console.log(`Part 2: ${maximumGames}`);

function getCubeValues(input: string): cubeGame {
    const gameID = +input.split(':')[0].split(' ')[1];
    const gameSets = input.slice(input.indexOf(':') + 1).split(';').map(s => s.trim().split(', ')).map((set) => {
        let gameObject: cubeGameSet = {};
        for(const move of set) {
            const splitMove = move.split(' ');
            gameObject[splitMove[1]] = Number(splitMove[0]);
        }
        return gameObject;
    });
    
    return {
        ID: gameID,
        sets: gameSets
    }
}

function compareSetToMax(set: cubeGameSet, maxValues: cubeGameSet): boolean {
    return Object.keys(set).every((setKey) => set[setKey] <= maxValues[setKey]);
}

function getMaximumSet(sets: cubeGameSet[]): cubeGameSet {
    let maximumValues: cubeGameSet = {};
    for(const set of sets) {
        Object.keys(set).forEach((setKey) => {
            if(!maximumValues[setKey]) maximumValues[setKey] = set[setKey];
            else if(maximumValues[setKey] < set[setKey]) maximumValues[setKey] = set[setKey];
        })
    }

    return maximumValues;
}