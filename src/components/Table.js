import React from 'react';
import { connect } from 'react-redux';
import * as actionTable from '../actions/actionsTable.js';
import Cell from './Cell.js';


export class Table extends React.Component{
    constructor(props) {
        super(props);
    }
    addOpenCell(){
        let newCountOpen = ++this.props.main.openCell;
        if( newCountOpen == (this.props.main.level.cols * this.props.main.level.rows) - this.props.main.level.mines) {
            this.endGame('win');
        }   
        else{

            this.props.addOpenCell(newCountOpen);
        } 
        
    }
    openCell(el){
        let _table = this.props.main.table;
        let countMineArround = this.mine_round_counter(_table, el.x, el.y);
        let cell = _table[el.x][el.y];

        if(!this.props.main.drawBomb ){
            _table[el.x][el.y].isFirst = true;
            let table = this.drawBomb(_table);
            let cell = table[el.x][el.y];
            let countMineArround = this.mine_round_counter(table, cell.x, cell.y);   
            cell.mineRound = countMineArround;

            if(cell.mineRound == 0){
                let newTable = this.openZeroFirstCell({table:table,cell:cell});
                this.props.drawBomb(newTable); 
            }
            else{ 

                cell.isOpened = true;
                let countMineArround = this.mine_round_counter(table, el.x, el.y);   
                cell.mineRound = countMineArround;
                cell.showCount = true; 
                this.props.drawBomb(table);
                this.addOpenCell();
            }     
        }

        else if(!cell.isOpened && countMineArround==0 && !cell.hasFlag && !cell.hasMine){
            cell.isOpened = true;     
            this.recurseOpenZeroCell(el.x,el.y);
            this.addOpenCell();
        }
        else if(cell.hasFlag == true || cell.isOpened) {
            return;
        }
        else if(cell.hasMine == true){
            this.endGame('loose');
        }
        else {
            cell.isOpened = true;
            cell.mineRound = countMineArround;
            cell.showCount = true;
            this.props.openCell(_table);
            this.addOpenCell();
        }
        
        
    }
    recurseOpenZeroCell(x,y){
        let field = this.props.main.level;
        let x_start = x > 0? x-1: x;
        let y_start = y > 0? y-1: y;
        let x_end = x < field.rows-1? x+1: x;
        let y_end = y < field.cols-1? y+1: y;

        for (let i = x_start; i <= x_end; i++) {
                for (let j = y_start; j <= y_end; j++) {
                    this.openCell({x:i,y:j});
                }
            }
    }

    openZeroFirstCell(el){
        let table = el.table;
        let cell = table[el.cell.x][el.cell.y];
        let countMineArround = this.mine_round_counter(table, cell.x, cell.y); 
        if( !cell.isOpened && countMineArround==0){
            cell.isOpened = true;
            cell.mineRound = countMineArround; 
            cell.showCount = false;  
            this.recurseOpenZeroCellFirst(el.table,cell);
            this.addOpenCell();
        }
        else if(cell.hasFlag == true || cell.isOpened == true) {
            return;
        }
        else{
            cell.showCount = true;
            cell.isOpened = true;
            cell.mineRound = countMineArround;
            this.addOpenCell(); 
        }
        return table;
    }
    
    recurseOpenZeroCellFirst(table,cell){
        let field = this.props.main.level;
        let x_start = cell.x > 0? cell.x-1: cell.x;
        let y_start = cell.y > 0? cell.y-1: cell.y;
        let x_end = cell.x < field.rows-1? cell.x+1: cell.x;
        let y_end = cell.y < field.cols-1? cell.y+1: cell.y;

        for (let i = x_start; i <= x_end; i++) {
                for (let j = y_start; j <= y_end; j++) {
                    this.openZeroFirstCell({table:table,cell:table[i][j]});
                }
            }
    }


    
    mine_round_counter(table, x,y){
        let field = this.props.main.level;
        let x_start = x > 0? x-1: x;
        let y_start = y > 0? y-1: y;
        let x_end = x < field.rows-1? x+1: x;
        let y_end = y < field.cols-1? y+1: y;
        let count = 0;

        for (let i = x_start; i <= x_end; i++) {
            for (let j = y_start; j <= y_end; j++) {
                if(table[i][j].hasMine && !(x==i && y==j)){
                    count++;
                }
            }
        }
        return count;
        
    }
    flagSet(cell){
        let main = this.props.main;
        let cellSet = main.table[cell.x][cell.y];
        let flagCell = main.flagCell;
        let remainedBomb = this.props.main.remainedBomb;
        
        if(cellSet.isOpened || (flagCell == 0 && !cellSet.hasFlag) || !this.props.main.drawBomb){
            return;
        }
        else{
            if(cellSet.hasFlag) {
                cellSet.hasFlag = false;
                ++flagCell;
                if(cellSet.hasMine){
                    ++remainedBomb;
                }
            }else{
                cellSet.hasFlag = true;
                --flagCell;
                if(cellSet.hasMine){
                    --remainedBomb;
                } 
            }
        }
        
        this.props.flagSet(main.table,remainedBomb,flagCell);
        if( remainedBomb == 0 ) {
            this.endGame('win');
        } 
    }
    drawBomb(_table) {
        let field = this.props.main.level;
        for(let i = 0; i < field.mines;){
            let x = Math.floor(Math.random()*field.rows);
            let y = Math.floor(Math.random()*field.cols)
            if(!_table[x][y].hasMine && !_table[x][y].isFirst){
                _table[x][y].hasMine = true;
                i++
            }
        }
        return _table;
    }
    endGame(status){
        let main = this.props.main;
        for (let i = 0; i < main.level.rows; i++) {
            for (let j = 0; j < main.level.cols; j++) {
                if( main.table[i][j].hasMine){
                    main.table[i][j].show_mine = true;
                }
            }
        }
        this.props.endGame(main.table,status);
    }
    render() {
        return (
                <div className="wrap-table">               
                    <table>
                        <tbody>
                            {
                                this.props.main.table.map((row,index) => {
                                    return(
                                        <tr key={index}>
                                            {
                                                row.map((col,index) => {
                                                    return(    
                                                        <Cell 
                                                            key={index} 
                                                            cell={col}
                                                            openCell={this.openCell.bind(this)}
                                                            flagSet={this.flagSet.bind(this,col)}

                                                        />
                                                     )   
                                                })
                                            }
                                        </tr>

                                    );
                                })
                            }
                        </tbody>
                    </table>
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
        openCell:(table) => {
            dispatch(actionTable.openCell(table));
        },
        drawBomb:(table) => {
            dispatch(actionTable.drawBomb(table));
        },
        addOpenCell: (newCountOpen) => {
            dispatch(actionTable.addOpenCell(newCountOpen));
        },
        flagSet: (table,remainedBomb, flagCell) => {
            dispatch(actionTable.flagSet(table,remainedBomb,flagCell));
        },
        endGame: (table,status) => {
            dispatch(actionTable.endGame(table, status));
        }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)


