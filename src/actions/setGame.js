
export function setDificalty(level) {
    return {
        type: 'SET_DIFICALTY',
        payload: level
    };
}

export function startGame(table) {
    return {
        type: 'START_GAME',
        payload: table
    };
}

export function showEndTime(endTime) {
	return {
        type: 'SHOW_END_TIME',
        payload: endTime
    };
}