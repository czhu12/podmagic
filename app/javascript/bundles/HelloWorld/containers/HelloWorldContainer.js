// Simple example of a React "smart" component

import { connect } from 'react-redux';
import HelloWorld from '../components/HelloWorld';
import * as actions from '../actions/helloWorldActionCreators';

// Which part of the Redux global state does our component want to receive as props?
const mapStateToProps = (state) => ({
  audioPlayer: state.audioPlayer,
});

const mapDispatchToProps = (dispatch) => ({
  onCutEditableHtml: (e) => {
    console.log('on cut');
    dispatch(actions.onCutEditableHtml(e.target.value))
  },
  onCopyEditableHtml: (e) => {
    console.log('on copy');
    dispatch(actions.onCopyEditableHtml(e.target.value))
  },
  onPasteEditableHtml: (e) => {
    console.log('on paste');
    dispatch(actions.onPasteEditableHtml(e.target.value))
  },
  onDeleteEditableHtml: (e) => {
    if (e.keyCode === 8 || e.keyCode === 46) { // if backspace or delete is clicked
      e.preventDefault();
      e.stopPropagation();
      const selection = window.getSelection();
      const baseIndex = $(window.getSelection().anchorNode.parentNode).index();
      const focusIndex = $(window.getSelection().focusNode.parentNode).index();;
      const startIndex = Math.min(baseIndex, focusIndex);
      const endIndex = Math.max(baseIndex, focusIndex);
      dispatch(actions.onDeleteEditableHtml(startIndex, endIndex))
    }
  }
});

// Don't forget to actually use connect!
// Note that we don't export HelloWorld, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(mapStateToProps, mapDispatchToProps)(HelloWorld);
