import { connect } from 'react-redux';
import React from 'react';
import { update_screen, score, toggle_dice, roll_dice } from './actions';
import * as myConsts from './constants';

import d1 from './die1.png';
import d2 from './die2.png';
import d3 from './die3.png';
import d4 from './die4.png';
import d5 from './die5.png';
import d6 from './die6.png';

let dice = [
<div></div>,
<img src={d1} alt='1' className='Dice-img'></img>,
<img src={d2} alt='2' className='Dice-img'></img>,
<img src={d3} alt='3' className='Dice-img'></img>,
<img src={d4} alt='4' className='Dice-img'></img>,
<img src={d5} alt='5' className='Dice-img'></img>,
<img src={d6} alt='6' className='Dice-img'></img>,
]


function mapStateToProps(state) {
    return {
        gameState: state.gameState,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeScreen : (screen) => dispatch(update_screen(screen)),
        doScore: (score_type) => dispatch(score(score_type)),
        toggleDice: (idx) => dispatch(toggle_dice(idx)),
        rollDice: () => dispatch(roll_dice()),
    }
}

function createScoreboardTile(obj, scoreHandler) {
    return <div className='Scoreboard-tile'>
        <button className='Scoreboard-tile-name' onClick={() => {scoreHandler(obj.type)}}>
            {myConsts.SCORE_LABELS[obj.type]}
        </button>
        <div className='Scoreboard-tile-scores'>
            {
                (obj.type === myConsts.SCORE_TOTAL) 
                ? <div className='Scoreboard-tile-scoretile'>
                    {obj.score}
                </div>
                :
                obj.score.map((num) => {
                    return <div className='Scoreboard-tile-scoretile'>
                        {num}
                    </div>
                })
            }
        </div>
    </div>
}

class GameScreen_P extends React.Component {
    render() { 


    const scoreboardUpper = this.props.gameState.scoreboard.map((obj) => {
        if (myConsts.SCORE_COLUMN[obj.type] === 0) 
        return createScoreboardTile(obj, this.props.doScore);
        else return null;
    });
    const scoreboardLower = this.props.gameState.scoreboard.map((obj) => {
        if (myConsts.SCORE_COLUMN[obj.type] === 1) 
        return createScoreboardTile(obj, this.props.doScore);
        else return null;
    });
    const diceTiles = this.props.gameState.dice.map((num, idx) => {
        return <button className= {(this.props.gameState.keep[idx])?'Dice-tile-keep':'Dice-tile'} onClick={() => this.props.toggleDice(idx)}>
            {dice[num]}
        </button>
    });


    return <div>
        <button className='Button' onClick={() => this.props.changeScreen(myConsts.SCREEN_TITLE)} style={{
            position: 'relative',
            width: '400px',
            height: '56px',
            top: '0px',
            left: '-600px',
            fontSize: '45px',
        }}>
            Quit to Title Screen
        </button>
        <div className='Scoreboard'>
            {scoreboardUpper}
        </div>
        <div className='Scoreboard' style={{
            top: '-642px',
            left: '390px',
        }}>
            {scoreboardLower}
        </div>
        
        <div className='Dice-box'>
            {diceTiles}
        </div>

        <div className='Normal-text' style={{
            top: '-1050px',
            left: '400px',
        }}>
            Rolls left: {this.props.gameState.roundLimit - this.props.gameState.round}
        </div>

        {
            (this.props.gameState.phase === myConsts.PHASE_END_OF_GAME)?
        (
            <button className="Button" onClick={() => this.props.changeScreen(myConsts.SCREEN_END)} style={{
                width: '300px',
                height: '50px',
                fontSize: '40px',
                position: 'relative',
                top: '-900px',
                left: '400px',
            }}>
                End Game
            </button>
        ):
        (
        <button className="Button" onClick={this.props.rollDice} style={{
            width: '300px',
            height: '50px',
            fontSize: '40px',
            position: 'relative',
            top: '-900px',
            left: '400px',
        }}>
            Roll!
        </button>
        )
        }
        <div className='Normal-text' style={{
            bottom: '800px',
        }}
        id={this.props.gameState.errorCnt - 1}>
            {this.props.gameState.error}
        </div>

        {(this.props.gameState.phase === myConsts.PHASE_PICK_JOKER)
        ?<div className='Normal-text' style={{
            top: '-1400px',
            left: '950px',
            width: '500px',
        }}>Choose a score type to score your Joker in!</div>
        :<div></div>}
    </div>
    }
}

export const GameScreen = connect(mapStateToProps, mapDispatchToProps)(GameScreen_P);