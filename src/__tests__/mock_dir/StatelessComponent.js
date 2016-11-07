import React, { PropTypes } from 'react'

/** StatelessComponent description */
const StatelessComponent = ({
  name
}) => (<span>{name}</span>)

StatelessComponent.propTypes = {
  /** name description */
  name: PropTypes.string
}

export default StatelessComponent
