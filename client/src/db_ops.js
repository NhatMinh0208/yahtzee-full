import {start_DB_push, end_DB_operation, start_DB_pull, call_DB_failure} from './actions';
import axios from 'axios';
// axios.defaults.baseURL = process.env.REACT_APP_API_ADDRESS;

export function DB_pull() { 
    return function(dispatch) {
        dispatch(start_DB_pull());
        const timeOut = setTimeout(function() {
            dispatch(call_DB_failure('Operation timed out'));
        }, 10000);
        // console.log(process.env);
        axios.get('/api/score')
        .then(function(result) {
            // console.log(result);
            clearTimeout(timeOut);
            if (result.data.status !== 'SUCCESS') {
                dispatch(call_DB_failure(result.data.status));
            }
            else {
                // console.log(result.scores);
                dispatch(end_DB_operation(result.data.scores));
            }
        })
        .catch(function(err) {
            clearTimeout(timeOut);
            dispatch(call_DB_failure(err.message));
        });
    }
}

export function DB_push(scoreData) {
    return function(dispatch) {
        dispatch(start_DB_push());
        const timeOut = setTimeout(function() {
            dispatch(call_DB_failure('Operation timed out'));
        }, 10000);
        // console.log(process.env);
        axios.post('/api/score', scoreData)
        .then(function(result) {
            // console.log(result);
            clearTimeout(timeOut);
            if (result.data.status !== 'SUCCESS') {
                dispatch(call_DB_failure(result.data.status));
            }
            else {
                // console.log(result.scores);
                dispatch(end_DB_operation());
            }
        })
        .catch(function(err) {
            clearTimeout(timeOut);
            dispatch(call_DB_failure(err.message));
        });
    }
}