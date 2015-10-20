var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');
var Tabs = require('material-ui/lib/tabs/tabs');
var Tab = require('material-ui/lib/tabs/tab');




var Router = Backbone.Router.extend({
  routes: {
    'setup': 'setup',
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

  	var Something = React.createClass({
			render: function() {
				return <div><NavBar /><h1>Hello</h1></div>
			}
  	});
  	ReactDOM.render(
			<Something />,
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

var NavBar = React.createClass({
  // constructor: function () {
  //   super();
  //   this._handleRoute = this._handleRoute.bind(this);
  // },
  // _handleRoute: function (e) {
  //   e.preventDefault();
  //   console.log('route handled');
  //   Router.routes['setup']();
  // },
  render: function () {
      // onActive={Router.routes['home']()}
    return (
      <Tabs>
        <Tab label="Home"></Tab>
        <Tab label="Database" ></Tab>
        <Tab label="System" ></Tab>
        <Tab label="Settings" ></Tab>
      </Tabs>
    )
  }
});

    
new Router();
Backbone.history.start();
    
