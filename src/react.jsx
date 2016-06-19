import React from 'react';
import ReactDOM from 'react-dom';

/*
- CommentBox
  - CommentList
    - Comment
  - CommentForm
*/

let Comment = React.createClass({
    render() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                {this.props.children}
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