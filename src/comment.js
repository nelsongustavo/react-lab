import React from "react";
class Comment extends React.Component {
	constructor() {
    super();
    this.state = {
      isAbusive: false
    };
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
          <a href="#">Delete comment</a>
          <a href="#" onClick={this._toggleAbuse.bind(this)}>Report as Abuse</a>
        </div>
			</div>
		);
	}

	_toggleAbuse(event) {
		event.preventDefault();
		this.setState({
			isAbusive: !this.state.isAbusive
		});
	}
}

export default Comment;