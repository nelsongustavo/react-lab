import React from 'react';
import ReactDOM from 'react-dom';

import {Router, Route} from 'react-router';

import Layout from './layout/layout';
import BlogPage from './pages/blog';
import PicturePage from './pages/picture';
import VideoPage from './pages/video';

const app = (
  <Router>
    <Route path="/" component={Layout} >
      <Route path="blog" component={BlogPage} />
      <Route path="picture" component={PicturePage} />
      <Route path="video" component={VideoPage} />
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(
    app,
    document.getElementById("comment-box"),
    function() {
      console.timeEnd('react-app')
    }
  );
});
