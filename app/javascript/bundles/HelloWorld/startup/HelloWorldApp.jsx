import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../store/helloWorldStore';
import HelloWorldContainer from '../containers/HelloWorldContainer';
export const updateAudioTime = (audioTime) => ({
  type: 'AUDIO_TIME_UPDATE',
  audioTime,
});

// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
const HelloWorldApp = (props) => {
  const store = configureStore(props);
  let audioTime = 0;
  setInterval(() => {
    audioTime += .1;
    store.dispatch(updateAudioTime(audioTime));
  }, 100)
  return (
    <Provider store={store}>
      <HelloWorldContainer />
    </Provider>
  );
};

export default HelloWorldApp;
