import React from 'react';

export default class Cell extends React.Component {
    constructor(props) {
        super(props);
    }
    flagTo(e) {
    	 e.preventDefault();
    	 this.props.flagSet(e.target)
    }
           
    render() {
    	let customClass;
    	if(this.props.cell.isOpened){
    		customClass = 'open';   	 
    	}
        else if(this.props.cell.hasFlag && this.props.cell.show_mine){
            customClass = 'opened_mine';
        }
        else if(this.props.cell.hasFlag){
    		customClass = 'flag';
    	}else if(this.props.cell.show_mine){
    		customClass = 'mine';
    	}
    	else{
    		customClass = 'cell';
    	}	
        return (
                <td 
                    onClick={this.props.openCell.bind(this,this.props.cell)}
                    onContextMenu={this.flagTo.bind(this)}
                    className={customClass}
                >
                    <div className={(this.props.cell.showCount)? ('cell-num-' + this.props.cell.mineRound) : 'cell-num'}>
                        {(this.props.cell.showCount)? this.props.cell.mineRound: ''}</div>
                </td>
        );
    }
};
                    /*onClick={this.props.open.bind(this)}
                    onContextMenu={this.flagTo.bind(this)}*/