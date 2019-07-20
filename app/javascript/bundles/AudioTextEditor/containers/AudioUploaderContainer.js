// Simple example of a React "smart" component

import { connect } from 'react-redux';
import AudioUploader from '../components/AudioUploader';


// Which part of the Redux global state does our component want to receive as props?
const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

// Don't forget to actually use connect!
// Note that we don't export AudioUploader, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(mapStateToProps, mapDispatchToProps)(AudioUploader);
