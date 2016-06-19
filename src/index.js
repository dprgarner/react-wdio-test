import $ from 'jquery';
import reactApp from './react.jsx';

$(function () {
    window.$ = $;
    reactApp($('main')[0]);
});