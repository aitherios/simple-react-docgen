var React = require('react');

/** ComponentA description */
exports.ComponentA = React.createClass({
  displayName: 'ComponentA',
  render: function() {
    return(<span>{'ComponentA'}</span>);
  },
});

/** ComponentB descripton */
exports.ComponentB = React.createClass({
  displayName: 'ComponentB',
  render: function() {
    return(<span>{'ComponentB'}</span>);
  },
});
