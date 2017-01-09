import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './components/comments-box'

document.addEventListener("DOMContentLoaded", function() { 
  ReactDOM.render(<CommentBox />, document.getElementById("comment-box"));
});