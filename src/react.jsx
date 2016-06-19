import React from 'react';
import ReactDOM from 'react-dom';

export default function(el) {
    // console.log($elt)
    // $elt.html('Hello!');

    let CommentBox = React.createClass({
        render: () => (
            <div className="commentBox">
                Hello, world! I am a comment box.
            </div>
        )
    });

    ReactDOM.render(<CommentBox />, el);
}