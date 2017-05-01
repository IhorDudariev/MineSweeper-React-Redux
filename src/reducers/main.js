const initialState = {
	level: { "mines":40, "cols": 16, "rows": 16},
	table:[],
	startPlay: false,
	statusPlay: 'stop',
	drawBomb:false,
	remainedBomb:0,
	openCell: 0,
    flagCell: 40,
    timeStart:false,
    timeEnd:0,
};

export default function main (state = initialState, action) {
	if(action.type === 'SET_DIFICALTY') {
		return  {...state, level:action.payload};
	}
	else if(action.type === 'START_GAME') {
		return  {...state, table:action.payload, startPlay: true,drawBomb:false, openCell:0, statusPlay: 'playing', flagCell:state.level.mines, remainedBomb:state.level.mines,timeStart:false};
	}
	else if(action.type === 'OPEN_CELL') {
		return  {...state, table:action.payload};
	}
	else if(action.type === 'DRAW_BOMB') {
		return  {...state, table:action.payload, drawBomb:true, timeStart:true};
	}
	else if(action.type === 'ADD_OPEN_CELL') {
		return  {...state, openCell:action.payload};
	}
	else if(action.type === 'END_GAME') {
		return  {...state, table:action.payload.table, statusPlay:action.payload.status, timeStart:false};
	}
	else if(action.type === 'CELL_FLAG_SET') {
		return  {...state, table:action.payload.table, remainedBomb:action.payload.remainedBomb, flagCell:action.payload.flagCell };
	}
	else if(action.type === 'SHOW_END_TIME') {
		return  {...state, timeEnd:action.payload};
	}
	return state;
}
