import React from "react";

import CommentConfirmation from './comment-confirmation';

export default class Comment extends React.Component {
	constructor() {
    super();
    this.state = {
      isAbusive: false
    };

    this._handleDelete = this._handleDelete.bind(this);
    this._toggleAbuse = this._toggleAbuse.bind(this);
  }

  componentWillMount() {
   	this.setState({
			isAbusive: this.props.isAbusive
		});
  }

	render() {
		let commentBody;
		if (!this.state.isAbusive) {
			commentBody = this.props.body;
		} else {
			commentBody = <em>Content Marked as Abusive</em>
		}
		return (
			<div className="comment">
				<img alt={`${this.props.author}'s picture`} src={this.props.avatarUrl}/>
				<p className="comment-header">{this.props.author}</p>
				<p className="comment-body">
					{commentBody}
				</p>
				<div className="comment-actions">
          <CommentConfirmation onConfirm={this._handleDelete}>
            Delete Comment?
          </CommentConfirmation>

          <CommentConfirmation onConfirm={this._toggleAbuse}>
            Report as Abuse
          </CommentConfirmation>
        </div>
			</div>
		);
	}

	_toggleAbuse() {
		const comment = this.props.comment;
		comment.isAbusive = !this.props.isAbusive;
		this.props.updateComment(comment,
			this.setState({
				isAbusive: !this.props.isAbusive
			})
		);
	}

	_handleDelete() {
		this.props.onDelete(this.props.comment);
	}
}