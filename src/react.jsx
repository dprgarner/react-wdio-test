import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';

let data = [
    {id: 1, author: "Becky", text: "This is a comment"},
    {id: 2, author: "David", text: "This is *another* comment"},
]

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
    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.props.data} />
                <CommentForm />
            </div>
        );
    }
});

export default function(el) {
    ReactDOM.render(<CommentBox data={data} />, el);
}