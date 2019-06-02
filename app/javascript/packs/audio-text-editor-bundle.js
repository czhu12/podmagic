import ReactOnRails from 'react-on-rails';

import AudioTextEditorApp from '../bundles/AudioTextEditor/startup/AudioTextEditorApp';

// This is how react_on_rails can see the AudioTextEditor in the browser.
ReactOnRails.register({
  AudioTextEditorApp,
});
