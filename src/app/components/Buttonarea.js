import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeColor } from '../../reducers/action'
import './components.css'

class Buttonarea extends Component {
  handleSwitchColor (color) {
    if (this.props.onSwitchColor) {
        this.props.onSwitchColor(color)
    }
  }

  render () {
    return (
      <div>
        <button onClick={this.handleSwitchColor.bind(this,'blue')} className="buttonareaclass blue">蓝色</button>
        <button onClick={this.handleSwitchColor.bind(this,'red')} className="buttonareaclass red">红色</button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onSwitchColor: (color) => {
          dispatch(changeColor(color))
      }
  }
}

Buttonarea = connect(null,mapDispatchToProps)(Buttonarea)

export default Buttonarea