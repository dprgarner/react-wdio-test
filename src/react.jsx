import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';

class BaseComponent extends React.Component {
    _bind(...methods) {
        methods.forEach(
            (method) => this[method] = this[method].bind(this)
        );
    }
}

class Comment extends BaseComponent {
    constructor() {
        super();
        this._bind('rawMarkup', 'render');
    }

    rawMarkup() {
        let md = new Remarkable();
        let rawMarkup = md.render(this.props.children.toString());
        return {__html: rawMarkup};
    }

    render() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
}

class CommentList extends BaseComponent {
    constructor() {
        super();
        this._bind('render');
    }

    render() {
        let commentNodes = this.props.data.map((comment) => (
            <Comment key={comment.id} author={comment.author}>
                {comment.text}
            </Comment>
        ));
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
}

class CommentForm extends BaseComponent {
    constructor() {
        super();
        this._bind(
            'handleAuthorChange',
            'handleTextChange',
            'handleSubmit',
            'render'
        );
        this.state = {author: '', text: ''};
    }

    handleAuthorChange(e) {
        this.setState({author: e.target.value});
    }

    handleTextChange(e) {
        this.setState({text: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text || !author) return;

        this.props.onCommentSubmit({author, text});
        this.setState({author: '', text: ''});
    }

    render() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Your name..."
                    value={this.state.author}
                    onChange={this.handleAuthorChange}
                />
                <input
                    type="text"
                    placeholder="Say something..."
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <input type="submit" value="Post"/>
            </form>
        );
    }
}

class CommentBox extends BaseComponent {
    constructor() {
        super();
        this._bind(
            'componentDidMount',
            'loadCommentsFromServer',
            'handleCommentSubmit',
            'render'
        );
        this.state = {data: []};
    }

    componentDidMount() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    }

    loadCommentsFromServer() {
        $.get({
            url: this.props.url,
            cache: false,
            success: function (data) {
                this.setState({data});
            }.bind(this),
            error: function (_xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this),
        });
    }

    handleCommentSubmit(comment) {
        let comments = this.state.data;
        comment.id = null // Fake id
        let newComments = comments.concat([comment]);
        this.setState({data: newComments});
        $.post({
            url: this.props.url,
            data: comment,
            success: function (data) {
                this.setState({data});
            }.bind(this),
            error: function (_xhr, status, err) {
                this.setState({data: comments});
                console.error(this.props.url, status, err.toString());
            }.bind(this),
        });
    }

    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
}

export default function(el) {
    ReactDOM.render(
        <CommentBox url='/api/comments' pollInterval={2000}/>, el
    );
}