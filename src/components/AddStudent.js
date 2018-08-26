import React from 'react'

export default class AddStudent extends React.PureComponent {

  onSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.state)
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (<form onSubmit={this.onSubmit}>
      Name: <input type="text" name="name" onChange={this.onChange} />
      <button type="submit">Add</button>
    </form>)
  }
}