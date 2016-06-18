var $ = require('jquery');

$(function () {
    $('main').html('Hi!');

    $.post('/api', {'username':'world'});
});