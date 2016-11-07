var React = require('react')

/** ReactCreateClassComponent description */
exports.ReactCreateClassComponent = React.createClass({
  displayName: 'ReactCreateClassComponent',

  propTypes: {
    /** name description */
    name: React.PropTypes.string
  },

  render: function() {
    return(<span>{'ReactCreateClassComponent'}</span>)
  },
})
