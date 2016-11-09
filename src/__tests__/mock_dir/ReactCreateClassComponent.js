var React = require('react')

/** ReactCreateClassComponent description */
exports.ReactCreateClassComponent = React.createClass({
  displayName: 'ReactCreateClassComponent',

  propTypes: {
    /** name description */
    name: React.PropTypes.string.isRequired,
    /** age description */
    age: React.PropTypes.number
  },

  render: function() {
    return(<span>{name}-{age}</span>)
  },
})
