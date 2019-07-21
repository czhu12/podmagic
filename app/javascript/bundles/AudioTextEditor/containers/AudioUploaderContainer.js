// Simple example of a React "smart" component

import { connect } from 'react-redux';
import AudioUploader from '../components/AudioUploader';
import * as actions from '../actions/audioUploaderActionCreators';


// Which part of the Redux global state does our component want to receive as props?
const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => ({
  updateUploadingState: (e) => {
    dispatch(actions.updateUploadingState());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AudioUploader);
