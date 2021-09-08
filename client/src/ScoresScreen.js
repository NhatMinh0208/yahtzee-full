import { connect } from 'react-redux';
import React from 'react';
import { update_screen } from './actions';
import { DB_pull } from './db_ops';
import * as myConsts from './constants';

function mapStateToProps(state) {
    return {
        scores: state.scoreDB.scores,
        status: state.scoreDB.status,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeScreen : (screen) => dispatch(update_screen(screen)),
        updateScores : () => dispatch(DB_pull()),
    }
}

class ScoresScreen_P extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
        }
    }
    render() {
        let data = (this.props.scores !== null) ? this.props.scores : [];
        let scoreShower = data
            .filter((obj, idx) => {
                return (idx>=(this.state.page)*10 && idx<(this.state.page)*10+10);
            })
            .map((obj, idx) => {
            return <div key={idx} style={{
                display: 'flex', 
                width: '700px', 
                height: '40px', 
                fontSize: '30px', 
                flexDirection: 'row', 
                border: '2px solid black',
                }}>
                <div style={{width: '600px', backgroundColor: 'hsl(240deg, 90%, 75%)', }}>{obj.name}</div>
                <div style={{width: '100px', backgroundColor: 'hsl(300deg, 90%, 75%)', }}>{obj.score}</div>
            </div>
        });
        return <div>
            <div className='Title' style={{top: '20px',}}>High Scores</div>

            <button className='Button' onClick={() => this.props.changeScreen(myConsts.SCREEN_TITLE)} style={{
                position: 'relative',
                width: '450px',
                height: '56px',
                top: '690px',
                left: '00px',
                fontSize: '45px',
            }}>
                Return to Title Screen
            </button>

            <button className='Button' onClick={this.props.updateScores} style={{
                position: 'relative',
                width: '450px',
                height: '56px',
                top: '690px',
                left: '10px',
                fontSize: '45px',
            }}>
                Refresh High Scores
            </button>

            <div className='Normal-text' style={{
                position: 'relative',
                top: '-70px',
            }}>
            {
                (this.props.status === myConsts.DB_OPERATING)
                ?'Connecting to score database...'
                :(this.props.status === myConsts.DB_FAIL)
                ?'Failed to connect to the database.'
                :'Connected to score server!'
            }
            </div>
            <div className='Title-screen-button-container' style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative', 
                top: '-50px',
                left: '450px',
                justifyContent: 'flex-start',
            }}>
                {scoreShower}
            </div>
            <div style={{
                // border: '1px solid black',
                width: '1000px', 
                height: '100px',
                position: 'relative',
                left: '300px',
                top: '-30px',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                fontSize: '70px',
            }}>
                <button className='Button' style={{
                    width: '100px',
                }} onClick={() => this.setState((state, props) => {return {page: Math.max(state.page-1,0)};}) }>{'<'}</button>
                {`Page ${this.state.page+1}`}
                <button className='Button' style={{
                    width: '100px',
                }} onClick={() => this.setState((state, props) => {return {page: Math.min(state.page+1,Math.ceil(props.scores.length/10)-1)};}) }>{'>'}</button>
            </div>
        </div>
    }
}


export const ScoresScreen = connect(mapStateToProps, mapDispatchToProps)(ScoresScreen_P);