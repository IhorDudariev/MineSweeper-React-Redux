import React from 'react';
import { connect } from 'react-redux';
import Table from './components/Table.js';
import SetGameBlock from './components/SetGameBlock.js';
import * as setGame from './actions/setGame.js';
import Timer from './components/Timer.js';

export class App extends React.Component{
    constructor(props) {
        super(props);
    }
    endTime(endTime) {
        this.props.showEndTime(endTime);
    }
    render() {

        let main = this.props.main;

        return (
            <div className="wrap-game">
                <SetGameBlock/>
                {
                    (main.startPlay)?
                    <div className={(main.statusPlay == 'loose' || main.statusPlay == 'win')? 'table-field open-fix' : 'table-field '}>
                        <div className="header-table">
                            <div><span className="icon-info flag-icon"></span>{main.flagCell}</div>
                            <Timer 
                                start= {main.timeStart}
                                endTime ={this.endTime.bind(this)}
                            />
                            <div><span className="icon-info open-icon"></span>{main.openCell}</div>
                        </div>
                        <Table />
                    </div>
                    : ''
                } 
            </div>
        );
    }
};

function mapStateToProps (state) {
  return {
    main: state.main
  }
}

function mapDispatchToProps(dispatch) {
  return {
        showEndTime:(endTime) => {
            dispatch(setGame.showEndTime(endTime));
        },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

