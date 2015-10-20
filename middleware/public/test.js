var React = require('react');
var ReactDOM = require('react-dom');
var reactBone = require('react.backbone');
var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');



var Router = Backbone.Router.extend({
    routes: {
        'setup': 'index'
    },

    index: function () {

        var Thing = React.createClass({
            render: function () {
                return <div>This is the SETUP PAGE</div>
            }
        });

        ReactDOM.render(
            <Thing />,
            document.body
        );
        console.log('index');
    }
});


		var router = new Router();
		Backbone.history.start();
