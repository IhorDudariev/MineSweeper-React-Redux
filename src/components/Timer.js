import React from 'react';
import { connect } from 'react-redux';
import * as actionTimer from '../actions/actionsTimer.js';

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startIn :false,
    }
  }
  componentWillReceiveProps(nextProps) {
      
      if(nextProps.start && !this.state.startIn){
        this.setState({
          startIn: true,
        })
         this.start();
      }
      else if(!nextProps.start && this.state.startIn){
        let timeEnd = this.formatTime(this.props.timer.time, 'sec');
        this.stop();
        this.setState({
          startIn: false,
        })
        this.props.endTime(timeEnd);
      }      

  }
 
  start() {
    this.props.timerStarted()
  }
  
  stop() {
    this.props.timerStopped(this.props.timer.interval)
  }
  formatTime(time,sec) {
    const pad = (time, length) => {
      while (time.length < length) {
        time = '0' + time;
      }
      return time;
    }
    
    time = new Date(time);
    let m = pad(time.getMinutes().toString(), 2);
    let s = pad(time.getSeconds().toString(), 2); 
    if(sec) {
        return `${m} : ${s} sec`;
    } else {   
        return `${m} : ${s}`;
    }    
  }

  render() {
    return (
      <div className="time-block">
        <span className="icon-info time-icon"></span>
        {this.formatTime(this.props.timer.time)}
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    timer: state.timer
  }
}

function mapDispatchToProps(dispatch) {
  return {
        timerStarted:() => {
            dispatch(actionTimer.timerStarted());
        },
        timerStopped:(interval) => {
            dispatch(actionTimer.timerStopped(interval));
        }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer)