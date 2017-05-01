import React from 'react';
import { connect } from 'react-redux';
import * as setGame from '../actions/setGame.js';

export class SetGameBlock extends React.Component{
    constructor(props) {
        super(props);
    }
    setDifficulty(e){
        let level =  function() {
            switch (e.target.value) {

            case "easy":
                return { "mines":10, "cols": 9, "rows": 9}

            case "medium":
               return { "mines":40, "cols": 16, "rows": 16}

            case "expert":
               return { "mines":99, "cols": 30, "rows": 16}

            default:
                return { "mines":40, "cols": 16, "rows": 16}
            }
        }();

        this.props.setDificalty(level);
    }    
    startGame(){
        let table = this.createTable();
        this.props.startGame(table);
    }
    createTable() {
        let level = this.props.main.level;
        let Tabletmp = [];
        for(let i = 0; i < level.rows; i++){
            let tmp = [];
            for(let j = 0; j < level.cols; j++){
                let cell ={
                    x : i,
                    y : j,
                    count : 0,
                    isOpened : false,
                    hasMine : false,
                    hasFlag : false,
                    isFirst:false,
                    show_mine:false,
                    mineRound:0,
                    showCount:false
                }
                tmp.push(cell);
            }
            Tabletmp.push(tmp);
        }        
        return Tabletmp;
    }   

    render() {

        let main = this.props.main;

        return (                    
                <div className={(main.statusPlay == 'loose' || main.statusPlay == 'win')? "dificalty-block fix-open": "dificalty-block"}>
                    <div className="set-dificalty-block">
                        <div className="radio-block">  
                            <input type="radio" id="task_all" name="dificalty" value="easy" onChange={this.setDifficulty.bind(this)}/>
                            <label htmlFor="task_all">
                                <span className="text-label">Easy</span>
                            </label>
                        </div>
                        <div className="radio-block">  
                            <input type="radio" id="task_not_done" name="dificalty" value="medium" defaultChecked={true} onChange={this.setDifficulty.bind(this)}/>
                            <label htmlFor="task_not_done">
                                <span className="text-label">Medium</span>
                            </label>
                        </div>
                        <div className="radio-block">  
                            <input type="radio" id="task_done" name="dificalty" value="expert" onChange={this.setDifficulty.bind(this)}/>
                            <label htmlFor="task_done">
                                <span className="text-label">Hard</span>
                            </label>
                        </div>
                    </div>
                    <div className="btn-start-block">
                        <div className="info-text">
                            {
                                (main.statusPlay == 'loose')? 
                                    <div>
                                        <p className="loose-text">You Loose!!!</p>
                                        <p className="small-info"> Remained bombs: {main.remainedBomb}</p> 
                                        <p className="small-info"> Your time - {main.timeEnd}</p>
                                    </div>
                                :
                                    <div> 
                                        <p className="win-text">You Win!!!</p>
                                        <p className="small-info"> Your time - {main.timeEnd}</p> 
                                    </div>
                            }

                        </div>
                        <input type="button" className="my_btn" value={(main.startPlay)? 'New Game': 'Start'} onClick={this.startGame.bind(this)}/>
                    </div>   
                </div>
        );
    }
};

function mapStateToProps (state) {
  return {
    main: state.main,
  }
}

function mapDispatchToProps(dispatch) {
  return {
        setDificalty: (level) => {
            dispatch(setGame.setDificalty(level));
        },
        startGame: (table) => {
            dispatch(setGame.startGame(table));
        }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetGameBlock)

