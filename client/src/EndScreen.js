import { connect } from 'react-redux';
import React from 'react';
import { update_screen } from './actions';
import { DB_push } from './db_ops';
import * as myConsts from './constants';

function mapStateToProps(state) {
    return {
        score: state.gameState.scoreboard[myConsts.SCORE_POSITION[myConsts.SCORE_TOTAL]].score,
        DB_status: state.scoreDB.status,
    }
}


function mapDispatchToProps(dispatch) {
    return {
        changeScreen : (screen) => dispatch(update_screen(screen)),
        submit : (name, score) => dispatch(DB_push({
            name: name,
            score: score
        })) 
    }
}


class EndScreen_P extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            submitted: false,
            error: null,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({name: event.target.value});
    }
    render() {
        return <div>
            <div className='Title'>Game Over</div>

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

            <button className='Button' onClick={() => this.props.changeScreen(myConsts.SCREEN_SCORES)} style={{
                position: 'relative',
                width: '450px',
                height: '56px',
                top: '690px',
                left: '00px',
                fontSize: '45px',
            }}>
                Go to High Scores
            </button>
            <div className='Normal-text' style={{
                top: '50px',
                left: '150px',
                width: '1300px',
            }}>
                Final score: {this.props.score}
            </div>
            <div style={{
                position: 'relative', 
                border: '1px solid #ccc',
                fontSize: '40px',
                top: '100px',
            }}>
                Enter your name below to submit your score:
                <br></br> 
                <input type='text' placeholder='Name' value={this.state.name} name='name' onChange={this.handleChange} style={{
                    width: '400px',
                    height: '50px',
                    fontSize: '40px',
                    backgroundColor: 'hsl(230deg, 100%, 90%)',
                }} />
                <button class='Button' style={{fontSize: '100%', height: '58px',}} onClick={() => {
                    if (this.state.submitted) {
                        this.setState( {error : 'You have already submitted your score!'});
                        return;
                    }
                    this.props.submit(this.state.name, this.props.score);
                    this.setState({
                        name: '',
                        submitted: 'true',
                    });
                }}> Submit! </button>
            </div> 
            <div style={{
                fontSize: '40px',
                border: '1px solid black',
                height: '100px',
                position: 'relative',
                top: '100px', 
            }}>
            {(this.state.error !== null)
             ?this.state.error
             :(this.state.submitted === false)
             ?null
             :(this.props.DB_status === myConsts.DB_OPERATING)
             ?'Submitting score to server...'
             :(this.props.DB_status === myConsts.DB_OK)
             ?'Score submitted to server!'
             :'Cannot connect to score server'
             }
            </div>
        </div>
    }
}


export const EndScreen = connect(mapStateToProps, mapDispatchToProps)(EndScreen_P);