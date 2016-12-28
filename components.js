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

class CommentForm extends React.Component {
	constructor() {
    super();
    this.state = {
      characters: 0
    };
  }
  render() {
    return (
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <label>New comment</label>
        <div className="comment-form-fields">
          <input placeholder="Name:" ref={(input) => this._author = input} />
          <textarea 
          	placeholder="Comment:"
          	ref={(textarea) => this._body = textarea}
          	onKeyUp={this._getCharacterCount.bind(this)}>
          </textarea>
        </div>
        <div className="comment-form-actions">
          <button type="submit">
            Post comment
          </button>
        </div>
      </form>
    );
  }
  
  _handleSubmit(event) {
    event.preventDefault();

    if (!this._author.value || !this._body.value) {
    	alert("Please enter your name and comment");
    	return
    }

    this.props.addComment(this._author.value, this._body.value);
    
    this._author.value = '';
    this._body.value = '';
    this.setState({ characters: 0 });
  }

  _getCharacterCount() {
    this.setState({ characters: this._body.value.length});
  }
 }

class CommentBox extends React.Component {
	constructor(){
		super();

		this.state = {
			showComments: false,
			comments: [
        { id: 1, author: 'Morgan McCircuit', body: 'Great picture!', avatarUrl: 'images/default-avatar.png' },
        { id: 2, author: 'Bending Bender', body: 'Excellent stuff', avatarUrl: 'images/default-avatar.png' }
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