export function timerStarted() {
  return dispatch => {
    const interval = setInterval(() => {
      dispatch({
        type: 'TICK',
        time: Date.now()
      });
	  }, 1000);
    
    dispatch({
      type: 'START_TIMER',
      offset: Date.now(),
      interval
    });
  }
}

export function timerStopped(interval) {
  clearInterval(interval);
  return {
    type: 'STOP_TIMER'
  }
}

