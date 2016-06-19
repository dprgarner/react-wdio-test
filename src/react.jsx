import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import $ from 'jquery';

let Comment = React.createClass({
    rawMarkup() {
        let md = new Remarkable();
        let rawMarkup = md.render(this.props.children.toString());
        return {__html: rawMarkup};
    },

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
});

let CommentList = React.createClass({
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
});

let CommentForm = React.createClass({
    render() {
        return (
            <div className="commentForm">
                Hello! CommentForm here.
            </div>  
        );
    }
});

let CommentBox = React.createClass({
    getInitialState() {
        return {data: []};
    },

    loadCommentsFromServer() {
        $.get({
            url: this.props.url,
            cache: false,
            success: function (data) {
                this.setState({data});
            }.bind(this),
            error: function (_xhr, status, err) {
                console.err(this.props.url, status, err.toString());
            }.bind(this),
        });
    },

    componentDidMount() {
        this.loadCommentsFromServer();
        this.interval = setInterval(
            this.loadCommentsFromServer, this.props.pollInterval
        )
    },

    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm />
            </div>
        );
    }
});

export default function(el) {
    ReactDOM.render(
        <CommentBox url='/api/comments' pollInterval={2000}/>, el
    );
}