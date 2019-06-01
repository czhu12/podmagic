import { createStore } from 'redux';
import helloWorldReducer from '../reducers/helloWorldReducer';

const configureStore = (railsProps) => {
  railsProps.audioPlayer.wordTimes = JSON.parse(railsProps.audioPlayer.wordTimes)
  return createStore(
    helloWorldReducer,
    railsProps,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
};

export default configureStore;
