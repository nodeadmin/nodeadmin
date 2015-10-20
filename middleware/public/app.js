var React = require('react');
var ReactDOM = require('react-dom');
var reactBone = require('react.backbone');
var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');

var AdminRouter = Backbone.Router.extend({
    routes: {
        "/": "setup",
        "login": "login",
        "home": "home",
        "settings/profile": "profile",
        "settings/users": "users",
        "settings/notifications": "notifications",
        "settings/advanced": "advanced",
        "system/modules": "modules",
        "system/logs": "logs",
        "system/file_system": "fileSystem",
        "db": "database",
        "db/tables": "tables",
        "db/create_table": "createTable",
        "db/records": "records"
    },

    setup: function() {
        var something = React.createClass({
            render: function() {
                return <div>eeeyyyyyyy</div>
            }
        });
        ReactDOM.render(
            <something />,
            document.body
        );
    },

    login: function() {

    },

    home: function() {

    },

    profile: function() {

    },

    users: function() {
        
    },

    notifications: function() {

    },
    advanced: function() {

    },
    modules: function() {
        
    },
    logs: function() {
        
    },
    fileSystem: function() {
        
    },
    database: function () {
        
    },
    tables: function() {
        
    },
    createTable: function() {

    },
    records: function() {
        
    }
});

new AdminRouter();
Backbone.history.start({pushState: true});
