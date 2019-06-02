import { createStore } from 'redux';
import audioTextEditorReducer from '../reducers/audioTextEditorReducer';

const configureStore = (railsProps) => {
  railsProps.audioPlayer.wordTimes = JSON.parse(railsProps.audioPlayer.wordTimes)
  return createStore(
    audioTextEditorReducer,
    railsProps,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
};

export default configureStore;
