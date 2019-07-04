import { createStore, applyMiddleware, compose } from 'redux';
import audioTextEditorReducer from '../reducers/audioTextEditorReducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [
  thunk,
];

const configureStore = (railsProps) => {
  railsProps.audioPlayer.wordTimes = JSON.parse(railsProps.audioPlayer.wordTimes)
  railsProps.audioPlayer.sortedWordTimes = JSON.parse(
    railsProps.audioPlayer.sortedWordTimes)
  return createStore(
    audioTextEditorReducer,
    railsProps,
    composeEnhancers(applyMiddleware(...middleware))
  )
};

export default configureStore;
