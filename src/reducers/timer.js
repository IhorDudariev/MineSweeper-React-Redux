const initialState = {
  time: 0,
  timeEnd:0, 
};

export default function (state = initialState, action){
  switch (action.type) {
    case 'START_TIMER':
      return {
        ...state,
        time: 0, // Begin time at 0 everytime we start the timer
        offset: action.offset,
        interval: action.interval
      };
    
    case 'STOP_TIMER':
      return {
        ...initialState,
        time: 0,
        timeEnd:state.time
      };
      
    case 'TICK':
      return {
        ...state,
        time: state.time + (action.time - state.offset),
        offset: action.time
      };

    default: 
      return state;
  }
}