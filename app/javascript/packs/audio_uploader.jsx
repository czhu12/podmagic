import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import FileUploadProgress  from 'react-fileupload-progress';


class AudioUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      progress: 0,
    };
  }

  uploadFile() {

  }

  render() {
    return (
      <div>
        <h3>Default style</h3>
        <FileUploadProgress key='ex1' url='http://localhost:3000/api/upload'
          onProgress={(e, request, progress) => {console.log('progress', e, request, progress);}}
          onLoad={ (e, request) => {console.log('load', e, request);}}
          onError={ (e, request) => {console.log('error', e, request);}}
          onAbort={ (e, request) => {console.log('abort', e, request);}}
          method='post'
          />
      </div>
    );
  }

  onClick() {
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <AudioUploader />,
    document.getElementById('audio-uploader'),
  )
})
