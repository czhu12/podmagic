import { createStore, applyMiddleware, compose } from 'redux';
import audioUploaderReducer from '../reducers/audioUploaderReducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [
  thunk,
];

const configureStore = (railsProps) => {
  return createStore(
    audioUploaderReducer,
    railsProps,
    composeEnhancers(applyMiddleware(...middleware))
  )
};

export default configureStore;
