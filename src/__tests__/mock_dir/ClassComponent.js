import React, { Component, PropTypes } from 'react'

/** ClassComponent description */
class ClassComponent extends Component {
  static propTypes = {
    /** name description */
    name: PropTypes.string
  }

  render() {
    return (
      <span>{this.props.name}</span>
    )
  }
}

export default ClassComponent
