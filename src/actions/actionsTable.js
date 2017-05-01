
export function addOpenCell(newCountOpen) {
    return {
        type: 'ADD_OPEN_CELL',
        payload: newCountOpen
    };
}

export function flagSet(table,remainedBomb,flagCell) {
    return {
        type: 'CELL_FLAG_SET',
        payload: {table:table,remainedBomb:remainedBomb, flagCell:flagCell}
    };
}

export function openCell(table) {
    return {
        type: 'OPEN_CELL',
        payload: table
    };
}

export function drawBomb(table) {
    return {
        type: 'DRAW_BOMB',
        payload: table
    };
}
export function endGame(table, status) {
    return {
        type: 'END_GAME',
        payload: {table:table,status:status}
    };
}

