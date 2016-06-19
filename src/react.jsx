import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';

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
        return (
            <div className="commentList">
                <Comment author="David">This is a comment</Comment>
                <Comment author="Becky">This is aother comment</Comment>
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
    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList />
                <CommentForm />
            </div>
        );
    }
});

export default function(el) {
    ReactDOM.render(<CommentBox />, el);
}