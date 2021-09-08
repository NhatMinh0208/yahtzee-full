export const ACTION_UPDSCREEN = '1';
export const ACTION_SCORE = '2';
export const ACTION_TOGGLE_DICE = '3';
export const ACTION_ROLL_DICE = '4';
export const ACTION_DEBUG_YAHTZEE = '5';
export const ACTION_DB_UPDATE = '6';
export const ACTION_DB_SUCCESS = '7';
export const ACTION_DB_FAILURE = '8';

export const SCREEN_TITLE = '1001';
export const SCREEN_GAME = '1002';
export const SCREEN_HELP = '1003';
export const SCREEN_CREDITS = '1004';
export const SCREEN_END = '1005';
export const SCREEN_SCORES = '1006';

export const PHASE_START_OF_GAME = '2000';
export const PHASE_IDLE = '2001';
export const PHASE_ROLLING = '2002';
export const PHASE_END_OF_GAME = '2003';
export const PHASE_PICK_JOKER = '2004';

export const DB_NOT_CONNECTED = '4001';
export const DB_OPERATING = '4002';
export const DB_OK = '4003';
export const DB_FAIL = '4004';

export const OPERATION_PUSH = '5001';
export const OPERATION_PULL = '5002';


export const SCORE_1 = '3001';
export const SCORE_2 = '3002';
export const SCORE_3 = '3003';
export const SCORE_4 = '3004';
export const SCORE_5 = '3005';
export const SCORE_6 = '3006';
export const SCORE_3_OF_A_KIND = '3007';
export const SCORE_4_OF_A_KIND = '3008';
export const SCORE_FULL_HOUSE = '3009';
export const SCORE_SMALL_STRAIGHT = '3010';
export const SCORE_LARGE_STRAIGHT = '3011';
export const SCORE_YAHTZEE = '3012';
export const SCORE_CHANCE = '3013';
export const SCORE_TOTAL = '3014';

export const defaultScoreboard = [
    {
        type: SCORE_1,
        score: [],
        maxApplications: 1,
    },
    {
        type: SCORE_2,
        score: [],
        maxApplications: 1,
    },
    {
        type: SCORE_3,
        score: [],
        maxApplications: 1,
    },
    {
        type: SCORE_4,
        score: [],
        maxApplications: 1,
    },
    {
        type: SCORE_5,
        score: [],
        maxApplications: 1,
    },
    {
        type: SCORE_6,
        score: [],
        maxApplications: 1,
    },
    {
        type: SCORE_3_OF_A_KIND,
        score: [],
        maxApplications: 1,
    },
    {
        type: SCORE_4_OF_A_KIND,
        score: [],
        maxApplications: 1,
    },
    {
        type: SCORE_FULL_HOUSE,
        score: [],
        maxApplications: 1,
    },
    {
        type: SCORE_SMALL_STRAIGHT,
        score: [],
        maxApplications: 1,
    },
    {
        type: SCORE_LARGE_STRAIGHT,
        score: [],
        maxApplications: 1,
    },
    {
        type: SCORE_YAHTZEE,
        score: [],
        maxApplications: 1,
    },
    {
        type: SCORE_CHANCE,
        score: [],
        maxApplications: 1,
    },
    {
        type: SCORE_TOTAL,
        score: 0,
    },
]

export const SCORE_LABELS = {
    '3001': 'Aces',
    '3002': 'Twos',
    '3003': 'Threes',
    '3004': 'Fours',
    '3005': 'Fives',
    '3006': 'Sixes',
    '3007': 'Three of a Kind',
    '3008': 'Four of a Kind',
    '3009': 'Full House',
    '3010': 'Small Straight',
    '3011': 'Large Straight',
    '3012': 'Yahtzee',
    '3013': 'Chance',
    '3014': 'Total',
}

export const SCORE_COLUMN = {
    '3001': 0,
    '3002': 0,
    '3003': 0,
    '3004': 0,
    '3005': 0,
    '3006': 0,
    '3007': 1,
    '3008': 1,
    '3009': 1,
    '3010': 1,
    '3011': 1,
    '3012': 1,
    '3013': 1,
    '3014': 0,
}

export const SCORE_POSITION = {
    '3001': 0,
    '3002': 1,
    '3003': 2,
    '3004': 3,
    '3005': 4,
    '3006': 5,
    '3007': 6,
    '3008': 7,
    '3009': 8,
    '3010': 9,
    '3011': 10,
    '3012': 11,
    '3013': 12,
    '3014': 13,
}

export const DICECOUNT = 5;