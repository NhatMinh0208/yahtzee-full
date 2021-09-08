import * as myConsts from './constants.js';

export function update_screen(screen_no) {
    return {
        type: myConsts.ACTION_UPDSCREEN,
        screen: screen_no,
    }
}

export function score(score_type) {
    return {
        type: myConsts.ACTION_SCORE,
        scoreType: score_type,
    }
}

export function toggle_dice(index) {
    return {
        type: myConsts.ACTION_TOGGLE_DICE,
        index: index,
    }
}

export function roll_dice() {
    return {
        type: myConsts.ACTION_ROLL_DICE,
    }
}

export function start_DB_push() {
    return {
        type: myConsts.ACTION_DB_UPDATE,
        operation: myConsts.OPERATION_PUSH,
    }
}

export function start_DB_pull() {
    return {
        type: myConsts.ACTION_DB_UPDATE,
        operation: myConsts.OPERATION_PULL,
    }
}

export function end_DB_operation(data) {
    return {
        type: myConsts.ACTION_DB_SUCCESS,
        data: data,
    }
}

export function call_DB_failure(err) {
    return {
        type: myConsts.ACTION_DB_FAILURE,
        err: err,
    }
}