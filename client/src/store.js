import { combineReducers, configureStore } from '@reduxjs/toolkit';
import * as myConsts from './constants';
import { defaultScoreboard } from './constants';
import { calculateScore, clone, isGameOver } from './utils';

function screenReducer(
    state = myConsts.SCREEN_TITLE,
    action
    )  {
    switch(action.type) {
        case myConsts.ACTION_UPDSCREEN:
            return action.screen;
        default: return state;
    }
}

const defaultGameState = {
    round: 0,
    roundLimit: 3,
    phase: myConsts.PHASE_IDLE,
    dice: [0,0,0,0,0],
    keep: [0,0,0,0,0],
    scoreboard: defaultScoreboard,
    error: null,
    errorCnt: 0,
}

function dbReducer (
    state = {
        status: myConsts.DB_NOT_CONNECTED,
        curOperation: null,
        scores: null, 
        error: null,
    }, action 
) { 
    switch (action.type) {
        case myConsts.ACTION_DB_UPDATE: {
            let newState = clone(state);
            newState.status = myConsts.DB_OPERATING;
            newState.curOperation = action.operation;
            return newState;
        }
        case myConsts.ACTION_DB_SUCCESS: {
            let newState = clone(state);
            newState.status = myConsts.DB_OK;
            if (newState.curOperation === myConsts.OPERATION_PULL) {
                // console.log(action.data);
                newState.scores = action.data;
                newState.scores.sort((scoreA, scoreB) => {return scoreB.score - scoreA.score;});
            }
            return newState;
        }
        case myConsts.ACTION_DB_FAILURE: {
            let newState = clone(state);
            newState.status = myConsts.DB_FAIL;
            newState.error = action.err;
            return newState;
        }
        default: return state;
    }
}

function gameStateReducer(
    state = {
        round: 0,
        score: 0,

    },
    action) {
    switch (action.type) {
        case myConsts.ACTION_UPDSCREEN:
            if (action.screen === myConsts.SCREEN_GAME)
                return defaultGameState;
            else
                return state;
        case myConsts.ACTION_SCORE: {
            let newState = clone(state);
            newState.error = null;
            if ((state.phase === myConsts.PHASE_IDLE || state.phase === myConsts.PHASE_PICK_JOKER) 
                && (action.scoreType !== myConsts.SCORE_TOTAL)
                && (newState.round > 0)) {
                    if (state.phase === myConsts.PHASE_IDLE) {
                        let i = myConsts.SCORE_POSITION[action.scoreType];

                        if (action.scoreType !== myConsts.SCORE_YAHTZEE) {
                            if (newState.scoreboard[i].score.length >= newState.scoreboard[i].maxApplications) {
                                newState.error = 'This score type cannot be used anymore!';
                            }
                            else {
                                newState.scoreboard[i].score.push(calculateScore(clone(newState.dice), action.scoreType));
                            }
                        }
                        else {
                            let a = calculateScore(clone(newState.dice), action.scoreType);
                            if (newState.scoreboard[i].score.length >= newState.scoreboard[i].maxApplications && newState.scoreboard[i].score[0] === 0) {   
                                newState.error = 'This score type cannot be used anymore!';
                            }
                            else if (newState.scoreboard[i].score.length < newState.scoreboard[i].maxApplications) {
                                newState.scoreboard[i].score.push(a);
                            }
                            else if (a === 0){
                                newState.error = 'You cannot use a Yahtzee bonus right now!';
                            }
                            else {
                                newState.scoreboard[i].score.push(a*2);
                                if (newState.scoreboard[newState.dice[0]-1].score.length < newState.scoreboard[newState.dice[0]-1].maxApplications) {
                                    newState.scoreboard[newState.dice[0]-1].score.push(newState.dice[0]*5);
                                }
                                else {
                                    newState.phase = myConsts.PHASE_PICK_JOKER;
                                }
                            }
                        }
                    }
                    else {
                        let i = myConsts.SCORE_POSITION[action.scoreType];
                        if (newState.scoreboard[i].score.length >= newState.scoreboard[i].maxApplications) {
                            newState.error = 'This score type cannot be used anymore!';
                        }
                        else {
                            newState.scoreboard[i].score.push(calculateScore(clone(newState.dice), action.scoreType, true));
                            newState.phase = myConsts.PHASE_IDLE;
                        }
                    }
                    newState.scoreboard[newState.scoreboard.length-1].score = 0;
                    for (let g in newState.scoreboard) if (newState.scoreboard[g].type !== myConsts.SCORE_TOTAL)
                    for (let gg in newState.scoreboard[g].score) {                
                        newState.scoreboard[newState.scoreboard.length-1].score += newState.scoreboard[g].score[gg];
                    }
                }
            else if (newState.round === 0) {
                newState.error = 'You need to roll the dice first!';
                newState.errorCnt++;
            }
            if (newState.error === null && newState.phase !== myConsts.PHASE_PICK_JOKER) {
                newState.round = 0;
                newState.dice = [0,0,0,0,0];
                newState.keep = [0,0,0,0,0];
                if (isGameOver(newState.scoreboard)) newState.phase = myConsts.PHASE_END_OF_GAME;
            }
            return newState;
        }
        case myConsts.ACTION_TOGGLE_DICE: {
            let newState = clone(state);
            newState.error = null;
            if (newState.round > 0) {
                if (newState.phase === myConsts.PHASE_IDLE)
                newState.keep[action.index] = 1 - newState.keep[action.index];
            }
            else {
                newState.error = 'You need to roll the dice first!';
                newState.errorCnt++;
            }
            return newState;
        }
        case myConsts.ACTION_ROLL_DICE: {
            let newState = clone(state);
            newState.error = null;
            if (newState.phase === myConsts.PHASE_IDLE) {
            if (newState.round < newState.roundLimit) {
                for (let i = 0; i < myConsts.DICECOUNT; i++) {
                    if (newState.keep[i] === 0) newState.dice[i] = 1 + Math.floor(6*Math.random());
                }
                newState.round++;
            }
            else {
                newState.error = 'You cannot roll the dice anymore!';
                newState.errorCnt++;
            }
        }
            return newState;
        }
        case myConsts.ACTION_DEBUG_YAHTZEE: {
            let newState = clone(state);
            newState.dice = [6,6,6,6,6];
            return newState;
        }
        default:
            return state;
    }
}

const mainReducer = combineReducers({
    screen: screenReducer,
    gameState: gameStateReducer,
    scoreDB: dbReducer,
});

export const store = configureStore({
    reducer: mainReducer
});
