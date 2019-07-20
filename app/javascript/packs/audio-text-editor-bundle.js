import ReactOnRails from 'react-on-rails';

import AudioTextEditorApp from '../bundles/AudioTextEditor/startup/AudioTextEditorApp';
import AudioUploaderApp from '../bundles/AudioTextEditor/startup/AudioUploaderApp';

// This is how react_on_rails can see the AudioTextEditor in the browser.
ReactOnRails.register({
  AudioTextEditorApp,
  AudioUploaderApp,
});
