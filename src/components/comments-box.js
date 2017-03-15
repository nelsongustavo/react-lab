import React from "react";
import 'whatwg-fetch'
import Comment from "./comment";
import CommentForm from "./comment-form";
import CommentAvatarList from './comment-avatar-list';

export default class CommentBox extends React.Component {
	constructor(){
		super();

		this.state = {
			showComments: false,
			comments: []
		};

    this._deleteComment = this._deleteComment.bind(this);
    this._addComment = this._addComment.bind(this);
    this._handleClick = this._handleClick.bind(this);
	}
  
  componentWillMount() {
    this._fetchComments();
  }

	render() {
		const comments = this._getComments();
		let commentNodes;
		let buttonText = 'Show comments';
		if (this.state.showComments) {
			buttonText = 'Hide comments'
			commentNodes = <div className="comment-list"> {comments} </div>
		}
		return(
      <div className="row comments-container">
        <div className="cell">
          <h2>Join The Discussion</h2>
    			<div className="comment-box">
    				<CommentForm addComment={this._addComment} />
    				<CommentAvatarList avatars={this._getAvatars()} />
    				<button onClick={this._handleClick}>{buttonText}</button>
    				{this._getPopularMessage(comments.length)}
    				<h4 className="comment-count">{this._getCommentsTitle(comments.length)}</h4>
    				  {commentNodes}
    			</div>
        </div>
      </div>
		);
	}

  _getAvatars() {
    return this.state.comments.map(comment => comment.avatarUrl);
  }

  componentDidMount(){
    this._timer = setInterval(() => this._fetchComments(), 5000);
  }

  componentWillUnmount() {
      clearInterval(this._timer);
  }

  _updateComment(comment, callback) {
    fetch(`http://localhost:3000/comments/${comment.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    })
    .then((response) => {
      return response
    }).then(() => {
      callback();
    });
  }

  _addComment(author, body) {
    const comment = {id: this.state.comments.length + 1, author, body, avatarUrl: 'assets/images/default-avatar.png'};

    fetch('http://localhost:3000/comments/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    })
    .then((response) => {
      return response
    }).then((comment) => {
      this.setState({comments: this.state.comments.concat([comment]) });
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    });
  }

  _deleteComment(comment) {
    fetch(`http://localhost:3000/comments/${comment.id}/`, {
      method: 'DELETE'
    })
    .then((response) => {
      return response
    });
    
    const comments = [...this.state.comments];
    const commentIndex = comments.indexOf(comment);
    comments.splice(commentIndex, 1);

    this.setState({ comments });
  }

  _fetchComments() {
    fetch('http://localhost:3000/comments', {
      method: 'GET'
    })
    .then((response) => {
      return response.json()
    }).then((comments) => {
        this.setState({
          comments: comments
        });
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    });
  }

	_handleClick() {
		this.setState({
			showComments: !this.state.showComments
		});
	}

	_getPopularMessage(commentCount) {
		const POPULAR_COUNT = 10;
		if (commentCount > POPULAR_COUNT) {
			return(<div> This post is getting really popular, don't miss out! </div>);
		}
	}

	_getComments() {
    return this.state.comments.map((comment) => {
    	return (<Comment 
                  {...comment}
                  onDelete={this._deleteComment}
                  updateComment={this._updateComment}
              />);
    });
  }

  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet';
    } else if (commentCount === 1) {
      return '1 comment';
    } else {
      return `${commentCount} comments`;
    }
  }
}