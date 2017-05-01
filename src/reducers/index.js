import { combineReducers } from 'redux';
import main from './main.js';
import timer from './timer.js';

var reducers = combineReducers({
	main,
	timer,
});
export default reducers;