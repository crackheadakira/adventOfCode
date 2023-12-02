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
    set: cubeGameSet[]
}

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim().split('\n');
const maximumCubes: cubeGameSet = {
    red: 12,
    green: 13,
    blue: 14,
}

const remainingGames = input.filter((game) => {
    const results = getCubeValues(game);
    return results.set.every(c => compareSetToMax(c, maximumCubes));
}).map(game => getCubeValues(game))
const idSum = remainingGames.map(g => g.ID).reduce((a, b) => a + b);
console.log(idSum);

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
        set: gameSets
    }
}

function compareSetToMax(set: cubeGameSet, maxValues: cubeGameSet): boolean {
    return Object.keys(set).every((setKey) => set[setKey] <= maxValues[setKey]);
}