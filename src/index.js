import $ from 'jquery';

$(function () {
    $('main').html('Hi!');

    $.post('/api', {'username': 'world'});
});