import React from 'react';
import ReactDOM from 'react-dom';

/*
- CommentBox
  - CommentList
    - Comment
  - CommentForm
*/

let CommentList = React.createClass({
    render: () => (
        <div className="commentList">
            I am the comment list.
        </div>  
    ),
});

let CommentForm = React.createClass({
    render: () => (
        <div className="commentForm">
            Hello! CommentForm here.
        </div>  
    ),
});

let CommentBox = React.createClass({
    render: () => (
        <div className="commentBox">
            <h1>Comments</h1>
            <CommentList />
            <CommentForm />
        </div>
    ),
});

export default function(el) {
    ReactDOM.render(<CommentBox />, el);
}