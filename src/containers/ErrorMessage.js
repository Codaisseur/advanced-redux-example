import React from 'react'
import { Paper } from '@material-ui/core'
import { connect } from 'react-redux'

class ErrorMessage extends React.PureComponent {
  render() {
    const { errorMessage } = this.props
    if (!errorMessage) return null
    return <Paper elevation={4} style={{ color: 'red', padding: 16, margin: 32 }}>
      <strong>Error:</strong> 
      <p>{errorMessage}</p>
    </Paper>
  }
}

const mapStateToProps = ({ errorMessage }) => ({ errorMessage })

export default connect(mapStateToProps)(ErrorMessage)