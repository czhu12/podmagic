import React from 'react';
import Upload from "./uploading/Upload";
import Uploading from './uploading/Uploading';

class AudioUploader extends React.Component {
  constructor(props) {
    super(props);
    this.updateUploadingState = this.updateUploadingState.bind(this);
  }

  componentDidMount() {
    this.intervalID = setInterval(this.updateUploadingState, 2500);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  updateUploadingState() {
    this.props.updateUploadingState();
  }

  render() {
    let view = null;
    //if (this.props.state.needsToUpload) {
    if (false) {
      view = <Upload />;
    } else if (!this.props.state.mediaFile.uploaded || !this.props.state.mediaFile.transcribed) {
      view = <Uploading mediaFile={this.props.state.mediaFile} />;
    } else {
      location.reload();
    }

    return view;
  }
}
export default AudioUploader;
