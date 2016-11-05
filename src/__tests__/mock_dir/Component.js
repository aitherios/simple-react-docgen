var React = require('react');

exports.ComponentA = React.createClass({
  displayName: 'ComponentA',
  render: function() {
    return('ComponentA');
  },
});

exports.ComponentB = React.createClass({
  displayName: 'ComponentB',
  render: function() {
    return('ComponentB');
  },
});
