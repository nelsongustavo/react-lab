import React from "react";
class Comment extends React.Component {
	constructor() {
    super();
    this.state = {
      isAbusive: false
    };
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
          <a href="#" onClick={this._handleDelete.bind(this)}>
          	Delete comment
          </a>
          <a href="#" onClick={this._toggleAbuse.bind(this)}>Report as Abuse</a>
        </div>
			</div>
		);
	}

	_toggleAbuse(event) {
		event.preventDefault();
		let comment = this.props.comment;
		comment.isAbusive = !this.props.isAbusive;
		this.props.updateComment(comment,
			this.setState({
				isAbusive: !this.props.isAbusive
			})
		);
	}

	_handleDelete(event) {
		event.preventDefault();
		if (confirm('Are you sure?')) {	
			this.props.onDelete(this.props.comment);
		}
	}
}

export default Comment;