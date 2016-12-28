import React from "react";
import ReactDOM from "react-dom";
import Comment from "./comment";
import CommentForm from "./comment-form"

class CommentBox extends React.Component {
	constructor(){
		super();

		this.state = {
			showComments: false,
			comments: [
        { id: 1, author: 'Morgan McCircuit', body: 'Great picture!', avatarUrl: 'assets/images/default-avatar.png' },
        { id: 2, author: 'Bending Bender', body: 'Excellent stuff', avatarUrl: 'assets/images/default-avatar.png' }
      ]
		};
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
			<div className="comment-box">
				<CommentForm addComment={this._addComment.bind(this)} />
				<h3>Comments</h3>
				<button onClick={this._handleClick.bind(this)}>{buttonText}</button>
				{this._getPopularMessage(comments.length)}
				<h4 className="comment-count">{this._getCommentsTitle(comments.length)}</h4>
				{commentNodes}
			</div>
		);
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
    	return (<Comment author={comment.author} body={comment.body} avatarUrl={comment.avatarUrl} key={comment.id} />);
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

  _addComment(commentAuthor, commentBody) {
    let comment = {
      id: Math.floor(Math.random() * (9999 - this.state.comments.length + 1)) + this.state.comments.length,
      author: commentAuthor,
      body: commentBody
    };

    this.setState({
      comments: this.state.comments.concat([comment])
    });
  }
}

ReactDOM.render(<CommentBox />, document.getElementById("story-app"));