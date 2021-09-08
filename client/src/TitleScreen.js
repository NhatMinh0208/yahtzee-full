import React from 'react';
import './App.css';
import { update_screen } from './actions';
import { DB_pull } from './db_ops';
import { connect } from 'react-redux';
import * as myConsts from './constants';

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeScreen : (screen) => dispatch(update_screen(screen)),
        pullDB: () => dispatch(DB_pull()),
    }
}

class TitleScreen_P extends React.Component {
    render() {
        return <div>
            <div className="Title">
                Yahtzee
            </div>
            <div className="Title-screen-button-container">
                <button className="Button" onClick={() => this.props.changeScreen(myConsts.SCREEN_GAME)}>
                    Play
                </button>
                <button className="Button" onClick={() => {
                    this.props.changeScreen(myConsts.SCREEN_SCORES);
                    this.props.pullDB();
                    }}>
                    High Scores
                </button>
                <button className="Button" onClick={() => this.props.changeScreen(myConsts.SCREEN_HELP)}>
                    Help
                </button>
                <button className="Button" onClick={() => {
                    this.props.changeScreen(myConsts.SCREEN_CREDITS);
                }}>
                    Credits
                </button>
            </div>
        </div>
    }
}

export const TitleScreen = connect(mapStateToProps, mapDispatchToProps)(TitleScreen_P);
