import * as myConsts from './constants';

export function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

export function calculateScore (dice, type, isJoker = false) {
    let score = 0;
    dice.sort((a,b) => a - b);
    let sum = dice.reduce((a,b) => (a+b));
    switch (type) {
        case myConsts.SCORE_1:
            for (let g in dice) if (dice[g] === 1) score+=1;
            break;
        
        case myConsts.SCORE_2:
            for (let g in dice) if (dice[g] === 2) score+=2;
            break;

        case myConsts.SCORE_3:
            for (let g in dice) if (dice[g] === 3) score+=3;
            break;

        case myConsts.SCORE_4:
            for (let g in dice) if (dice[g] === 4) score+=4;
            break;

        case myConsts.SCORE_5:
            for (let g in dice) if (dice[g] === 5) score+=5;
            break;

        case myConsts.SCORE_6:
            for (let g in dice) if (dice[g] === 6) score+=6;
            break;
        
        case myConsts.SCORE_3_OF_A_KIND:
            {
                if ((dice[0] === dice[1] && dice[1] === dice[2]) 
                || (dice[1] === dice[2] && dice[2] === dice[3])
                || (dice[2] === dice[3] && dice[3] === dice[4])
                || isJoker)
                score = sum;
                break;
            }
        
        case myConsts.SCORE_4_OF_A_KIND:
            {
                if ((dice[0] === dice[1] && dice[1] === dice[2] && dice[2] === dice[3]) 
                || (dice[1] === dice[2] && dice[2] === dice[3] && dice[3] === dice[4])
                || isJoker)
                score = sum;
                break;
            }
            
        
        case myConsts.SCORE_FULL_HOUSE:
            {
                if ((dice[0] === dice[1] && dice[1] === dice[2] && dice[3] === dice[4])
                || (dice[0] === dice[1] && dice[2] === dice[3] && dice[3] === dice[4])
                || isJoker)
                score = 25;
                break;
            }

        case myConsts.SCORE_CHANCE:
            {
                score = sum;
                break;
            }

        case myConsts.SCORE_SMALL_STRAIGHT:
            {
                if ((dice.indexOf(1) !== -1 && dice.indexOf(2) !== -1 && dice.indexOf(3) !== -1 && dice.indexOf(4) !== -1) 
                || (dice.indexOf(5) !== -1 && dice.indexOf(2) !== -1 && dice.indexOf(3) !== -1 && dice.indexOf(4) !== -1) 
                || (dice.indexOf(5) !== -1 && dice.indexOf(6) !== -1 && dice.indexOf(3) !== -1 && dice.indexOf(4) !== -1) 
                || isJoker)
                score = 30;
                break;
            }

        case myConsts.SCORE_LARGE_STRAIGHT:
            {
                if ((dice.indexOf(1) !== -1 && dice.indexOf(2) !== -1 && dice.indexOf(3) !== -1 && dice.indexOf(4) !== -1 && dice.indexOf(5) !== -1) 
                || (dice.indexOf(6) !== -1 && dice.indexOf(2) !== -1 && dice.indexOf(3) !== -1 && dice.indexOf(4) !== -1 && dice.indexOf(5) !== -1) 
                || isJoker)
                score = 40;
                break;
            }

        case myConsts.SCORE_YAHTZEE:
            {
                if ((dice[0] === dice[1] && dice[1] === dice[2] && dice[2] === dice[3] && dice[3] === dice[4]))
                score = 50;
                break;
            }
        default: score = 0;   
    }
    return score;
}

export function isGameOver(scoreboard) {
    // console.log(scoreboard);
    for (let g in scoreboard) if (scoreboard[g].score instanceof Array && scoreboard[g].score.length < scoreboard[g].maxApplications) return false;
    return true;
}