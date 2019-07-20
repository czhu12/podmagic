import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../store/audioUploaderStore';
import AudioUploaderContainer from '../containers/AudioUploaderContainer';

// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
const AudioUploaderApp = (props) => {
  const store = configureStore(props);
  return (
    <Provider store={store}>
      <AudioUploaderContainer />
    </Provider>
  );
};

export default AudioUploaderApp;
